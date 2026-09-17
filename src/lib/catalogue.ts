import { queryOptions, useSuspenseQuery, type QueryClient } from "@tanstack/react-query";

import { applyLiveCamps } from "./camps";
import { loadCatalogue, type LiveCatalogue } from "./catalogue.functions";
import { setCatalogue } from "./programmes";

/** Hydrate every synchronous catalogue reader from one fetch. */
const hydrate = (data: LiveCatalogue) => {
  if (data.programmes.length) setCatalogue(data.programmes);
  applyLiveCamps(data.camps);
  return data;
};

export const catalogueQuery = queryOptions({
  queryKey: ["catalogue", "live"],
  queryFn: async () => hydrate(await loadCatalogue()),
  staleTime: 15 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});


/**
 * Every route loader awaits this so the catalogue is in place before any
 * component renders, on the server and in the browser alike.
 */
export const ensureCatalogue = async (queryClient: QueryClient) =>
  hydrate(await queryClient.ensureQueryData(catalogueQuery));

/**
 * Route loaders do NOT re-run when the browser hydrates the server-rendered
 * markup, so the synchronous stores (PROGRAMMES, camps) would stay empty on the
 * client and every derived count would render as 0. Reading the dehydrated
 * query here and hydrating during render keeps client and server identical.
 */
export const useHydratedCatalogue = () => {
  const { data } = useSuspenseQuery(catalogueQuery);
  hydrate(data);
  return data;
};

