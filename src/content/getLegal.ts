import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/sanity/client";
import type { Locale } from "./copy";
import { SANITY_TAG } from "./getSite";
import { legalPages, legalUpdated, toBlocks, type Block, type LegalId } from "./legal";

type L = { fr?: string; en?: string } | null;
type Raw = { _id: string; title?: L; description?: L; updated?: string; body?: { fr?: Block[]; en?: Block[] } | null };

export type Legal = { title: string; description: string; updated: string; body: Block[] };

async function fetchLegal(): Promise<Raw[]> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife({ stale: 60, revalidate: 60, expire: 60 * 60 * 24 * 7 });
  try {
    return await client.fetch<Raw[]>(`*[_type == "legalPage"]{ _id, title, description, updated, body }`);
  } catch (error) {
    console.error("[sanity] legal fetch failed, using local content", error);
    return [];
  }
}

/** One legal page: Sanity first, field by field, the local first version otherwise. */
export async function getLegal(id: LegalId, lang: Locale): Promise<Legal> {
  const raw = (await fetchLegal()).find((d) => d._id === `legal-${id}`);
  const local = legalPages[lang][id];
  const pick = (v: L | undefined, fallback: string) => v?.[lang]?.trim() || fallback;
  const body = raw?.body?.[lang];
  return {
    title: pick(raw?.title, local.title),
    description: pick(raw?.description, local.description),
    updated: raw?.updated || legalUpdated,
    body: body?.length ? body : toBlocks(local.body, `${id}-${lang}-`),
  };
}
