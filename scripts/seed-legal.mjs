// Creates the four legal pages in Sanity from src/content/legal.ts.
//
//   node --env-file=.env.local scripts/seed-legal.mjs           # creates missing pages only
//   node --env-file=.env.local scripts/seed-legal.mjs --force   # overwrites them (loses Studio edits)
import { createClient } from "@sanity/client";
import { legalIds, legalPages, legalUpdated, toBlocks } from "../src/content/legal.ts";

const force = process.argv.includes("--force");
if (!process.env.SANITY_API_TOKEN) throw new Error("SANITY_API_TOKEN manquant (lancer avec --env-file=.env.local)");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rhhpyv3a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const { fr, en } = legalPages;
const tx = client.transaction();
for (const id of legalIds) {
  const doc = {
    _id: `legal-${id}`,
    _type: "legalPage",
    title: { fr: fr[id].title, en: en[id].title },
    description: { fr: fr[id].description, en: en[id].description },
    updated: legalUpdated,
    body: { fr: toBlocks(fr[id].body, "f"), en: toBlocks(en[id].body, "e") },
  };
  if (force) tx.createOrReplace(doc);
  else tx.createIfNotExists(doc);
  console.log(force ? "  écrit" : "  créé si absent", doc._id);
}
await tx.commit();
console.log("Terminé.");
