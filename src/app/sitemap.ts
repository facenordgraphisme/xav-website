import type { MetadataRoute } from "next";
import { locales } from "@/content/copy";
import { SITE_URL } from "@/content/site";
import { legalIds, legalSlugs } from "@/content/legal";

// Every page in both languages, each listing its translations (hreflang).
const pages = [
  { path: "", priority: 1 },
  { path: "/rafting", priority: 0.9 },
  { path: "/canyoning", priority: 0.8 },
  ...legalIds.map((id) => ({ path: `/${legalSlugs[id]}`, priority: 0.3 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: lang === "fr" ? priority : Math.max(0.1, priority - 0.2),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
          "x-default": `${SITE_URL}/fr${path}`,
        },
      },
    })),
  );
}
