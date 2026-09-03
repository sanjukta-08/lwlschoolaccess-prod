import { QueryClient, dehydrate, hydrate } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadDelay: 40,
    defaultPreloadStaleTime: 0,
    // Ship the server's query cache to the browser so suspense queries resolve
    // from cache on hydration instead of re-fetching and blanking the page.
    dehydrate: () => ({
      queryState: JSON.parse(
        JSON.stringify(dehydrate(queryClient, { shouldDehydrateMutation: () => false })),
      ) as unknown as Record<string, never>,
    }),
    hydrate: (dehydrated: { queryState?: unknown }) => {
      if (dehydrated?.queryState) {
        hydrate(queryClient, dehydrated.queryState);
      }
    },
  });

  return router;
};
