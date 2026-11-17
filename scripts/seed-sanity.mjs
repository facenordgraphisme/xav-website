// Fills the Sanity dataset with the site's current content and photographs.
//
//   node --env-file=.env.local scripts/seed-sanity.mjs           # creates missing documents only
//   node --env-file=.env.local scripts/seed-sanity.mjs --force   # overwrites them (loses Studio edits)
//
// Needs SANITY_API_TOKEN with write access. Node 24+ (imports the .ts content files directly).
import { createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@sanity/client";
import { copy } from "../src/content/copy.ts";
import { contact, GROUP_DISCOUNT, GROUP_SIZE, outings } from "../src/content/site.ts";

const force = process.argv.includes("--force");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rhhpyv3a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});
if (!process.env.SANITY_API_TOKEN) throw new Error("SANITY_API_TOKEN manquant (lancer avec --env-file=.env.local)");

const { fr, en } = copy;
const L = (a, b) => ({ fr: a, en: b });
let n = 0;
const key = () => `k${(n++).toString(36)}`;

/* ---------- Images: uploaded once each, reused by reference ---------- */

const assets = new Map();
async function upload(src) {
  if (!assets.has(src)) {
    const file = join(import.meta.dirname, "..", "public", src);
    assets.set(
      src,
      client.assets.upload("image", createReadStream(file), { filename: basename(src) }).then((a) => {
        console.log("  image", src);
        return a._id;
      }),
    );
  }
  return assets.get(src);
}

/** "50% 62%" → a hotspot centred on that point, so the crop on the site stays the same. */
function hotspot(position) {
  if (!position) return undefined;
  const [x, y] = position.split(" ").map((v) => parseFloat(v) / 100);
  return { _type: "sanity.imageHotspot", x, y, width: 0.4, height: 0.4 };
}

async function photo(src, altFr, altEn, position, withKey = false) {
  return {
    ...(withKey ? { _key: key() } : {}),
    _type: "photo",
    asset: { _type: "reference", _ref: await upload(src) },
    ...(position ? { hotspot: hotspot(position), crop: { _type: "sanity.imageCrop", top: 0, bottom: 0, left: 0, right: 0 } } : {}),
    alt: { _type: "localeString", ...L(altFr, altEn) },
  };
}

const facts = (a, b) => a.map((f, i) => ({ _key: key(), _type: "fact", label: L(f.label, b[i].label), value: L(f.value, b[i].value) }));

/* ---------- Documents ---------- */

const docs = [
  {
    _id: "settings",
    _type: "settings",
    phoneDisplay: contact.phoneDisplay,
    phoneIntl: contact.phoneIntl,
    whatsapp: contact.whatsapp,
    email: contact.email,
    facebook: contact.facebook,
    addressLine1: contact.address[0],
    addressLine2: contact.address[1],
    groupSize: GROUP_SIZE,
    groupDiscount: GROUP_DISCOUNT,
  },
  ...(await Promise.all(
    ["rafting", "couleau", "fournel"].map(async (id) => {
      const a = fr.outings[id];
      const b = en.outings[id];
      return {
        _id: `outing-${id}`,
        _type: "outing",
        name: L(a.name, b.name),
        short: L(a.short, b.short),
        price: outings[id].price,
        photo: await photo(outings[id].photo, a.alt, b.alt),
        place: L(a.place, b.place),
        who: L(a.who, b.who),
        level: L(a.level, b.level),
        where: L(a.where, b.where),
        text: L(a.text, b.text),
        safety: L(a.safety, b.safety),
      };
    }),
  )),
  {
    _id: "homePage",
    _type: "homePage",
    metaTitle: L(fr.meta.title, en.meta.title),
    metaDescription: L(fr.meta.description, en.meta.description),
    heroTitle: L(fr.hero.title, en.hero.title),
    heroSub: L(fr.hero.sub, en.hero.sub),
    heroLede: L(fr.hero.lede, en.hero.lede),
    heroPhoto: await photo("/images/rafting/rafting-01.jpg", fr.hero.photoAlt, en.hero.photoAlt, "50% 62%"),
    outingsTitle: L(fr.outingsIntro.title, en.outingsIntro.title),
    outingsText: L(fr.outingsIntro.text, en.outingsIntro.text),
    ritual: await Promise.all(
      fr.ritual.steps.map(async (s, i) => {
        const e = en.ritual.steps[i];
        return { _key: key(), _type: "step", verb: L(s.verb, e.verb), text: L(s.text, e.text), photo: await photo(s.photo.src, s.photo.alt, e.photo.alt, s.photo.position) };
      }),
    ),
    guidesTitle: L(fr.guides.title, en.guides.title),
    guidesLead: L(fr.guides.lead, en.guides.lead),
    guidesNote: L(fr.guides.note, en.guides.note),
    guidesPhoto: await photo("/images/canyoning/canyoning-08.jpg", fr.guides.photoAlt, en.guides.photoAlt),
    guidesFacts: facts(fr.guides.facts, en.guides.facts),
  },
  {
    _id: "raftingPage",
    _type: "activityPage",
    metaTitle: L(fr.meta.rafting, en.meta.rafting),
    metaDescription: L(fr.meta.raftingDesc, en.meta.raftingDesc),
    title: L(fr.raftingPage.title, en.raftingPage.title),
    sub: L(fr.raftingPage.sub, en.raftingPage.sub),
    lede: L(fr.raftingPage.lede, en.raftingPage.lede),
    heroPhoto: await photo("/images/rafting/rafting-02.jpg", fr.raftingPage.photoAlt, en.raftingPage.photoAlt, "50% 60%"),
    statement: L(fr.raftingPage.statement, en.raftingPage.statement),
    text: L(fr.raftingPage.text, en.raftingPage.text),
    detailPhotos: [
      await photo("/images/rafting/rafting-12.jpg", fr.gallery.photos[1].alt, en.gallery.photos[1].alt, undefined, true),
      await photo("/images/rafting/rafting-14.jpg", fr.gallery.photos[3].alt, en.gallery.photos[3].alt, undefined, true),
    ],
  },
  {
    _id: "canyoningPage",
    _type: "activityPage",
    metaTitle: L(fr.meta.canyoning, en.meta.canyoning),
    metaDescription: L(fr.meta.canyoningDesc, en.meta.canyoningDesc),
    title: L(fr.canyoningPage.title, en.canyoningPage.title),
    sub: L(fr.canyoningPage.sub, en.canyoningPage.sub),
    lede: L(fr.canyoningPage.lede, en.canyoningPage.lede),
    heroPhoto: await photo("/images/canyoning/canyoning-04.jpg", fr.canyoningPage.photoAlt, en.canyoningPage.photoAlt, "50% 40%"),
    statement: L(fr.canyoningPage.statement, en.canyoningPage.statement),
    text: L(fr.canyoningPage.text, en.canyoningPage.text),
    detailPhotos: [
      await photo("/images/canyoning/canyoning-09.jpg", fr.gallery.photos[2].alt, en.gallery.photos[2].alt, undefined, true),
      await photo("/images/canyoning/canyoning-11.jpg", fr.gallery.photos[4].alt, en.gallery.photos[4].alt, undefined, true),
    ],
    ritualPhotos: await Promise.all(fr.canyonRitual.map((p, i) => photo(p.src, p.alt, en.canyonRitual[i].alt, p.position, true))),
  },
  {
    _id: "gallery",
    _type: "gallery",
    title: L(fr.gallery.title, en.gallery.title),
    text: L(fr.gallery.text, en.gallery.text),
    photos: await Promise.all(fr.gallery.photos.map((p, i) => photo(p.src, p.alt, en.gallery.photos[i].alt, undefined, true))),
  },
  {
    _id: "faq",
    _type: "faq",
    title: L(fr.faq.title, en.faq.title),
    items: fr.faq.items.map((it, i) => ({ _key: key(), _type: "qa", q: L(it.q, en.faq.items[i].q), a: L(it.a, en.faq.items[i].a) })),
  },
];

const tx = client.transaction();
for (const doc of docs) {
  if (force) tx.createOrReplace(doc);
  else tx.createIfNotExists(doc);
}
await tx.commit();
console.log(`${docs.length} documents ${force ? "écrits" : "créés s'ils manquaient"}, ${assets.size} images.`);
