import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { PUBLIC_SITE_URL } from "@/lib/seo";

import { CAMPS } from "@/lib/camps";
import { ensureCatalogue } from "@/lib/catalogue";
import { PROGRAMMES } from "@/lib/programmes";
import { conferenceSlugOf, slugOf } from "@/lib/programme-slug";
import { kingsPrograms } from "@/components/week-without-walls/kings-data";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";

const BASE_URL = PUBLIC_SITE_URL;

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        await ensureCatalogue(router.options.context.queryClient);

        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const programmesRouteId = "/programmes/$slug";
        if (isSitemapRouteIncluded(router.routesById[programmesRouteId])) {
          for (const programme of PROGRAMMES.filter((item) => item.type !== "conf")) {
            const location = router.buildLocation({
              to: programmesRouteId,
              params: { slug: slugOf(programme) },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, programmesRouteId);
            if (path) entries.push({ path });
          }
        }

        const conferencesRouteId = "/conferences/$slug";
        if (isSitemapRouteIncluded(router.routesById[conferencesRouteId])) {
          for (const conference of PROGRAMMES.filter((item) => item.type === "conf")) {
            const location = router.buildLocation({
              to: conferencesRouteId,
              params: { slug: conferenceSlugOf(conference) },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, conferencesRouteId);
            if (path) entries.push({ path });
          }
        }

        const campsRouteId = "/camps/$slug";
        if (isSitemapRouteIncluded(router.routesById[campsRouteId])) {
          for (const camp of CAMPS) {
            const location = router.buildLocation({
              to: campsRouteId,
              params: { slug: camp.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, campsRouteId);
            if (path) entries.push({ path });
          }
        }

        const kingsProgramRouteId = "/week-without-walls/kings/$programSlug";
        if (isSitemapRouteIncluded(router.routesById[kingsProgramRouteId])) {
          for (const program of kingsPrograms) {
            const location = router.buildLocation({
              to: kingsProgramRouteId,
              params: { programSlug: program.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, kingsProgramRouteId);
            if (path) entries.push({ path });
          }
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
