import { queryOptions, type QueryClient } from "@tanstack/react-query";

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
  staleTime: 5 * 60 * 1000,
});

/**
 * Every route loader awaits this so the catalogue is in place before any
 * component renders, on the server and in the browser alike.
 */
export const ensureCatalogue = async (queryClient: QueryClient) =>
  hydrate(await queryClient.ensureQueryData(catalogueQuery));
