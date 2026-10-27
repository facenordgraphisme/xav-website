import type { MetadataRoute } from "next";

const base = "https://activites-nature.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/rafting", "/canyoning"].map((path) => ({
    url: `${base}/fr${path}`,
    alternates: { languages: { fr: `${base}/fr${path}`, en: `${base}/en${path}` } },
  }));
}
