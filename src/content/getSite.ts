import { cacheLife, cacheTag } from "next/cache";
import { client, imageBuilder } from "@/sanity/client";
import { copy, type Copy, type Locale } from "./copy";
import { contact as localContact, GROUP_DISCOUNT, GROUP_SIZE, outingOrder, outings as localOutings, type OutingId } from "./site";

import type { Facts, Photo } from "./facts";

export type Site = {
  lang: Locale;
  t: Copy;
  facts: Facts;
  photos: {
    outings: Record<OutingId, Photo>;
    home: { hero: Photo; guides: Photo };
    rafting: { hero: Photo; detail: Photo[] };
    canyoning: { hero: Photo; detail: Photo[] };
  };
};

export const SANITY_TAG = "sanity";

/* ---------- Raw shapes from Sanity ---------- */

type L = { fr?: string; en?: string } | null | undefined;
type RawPhoto = {
  asset?: { _ref: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number };
  alt?: L;
  dims?: { width: number; height: number };
} | null;
type RawActivity = {
  metaTitle?: L; metaDescription?: L; title?: L; sub?: L; lede?: L; heroPhoto?: RawPhoto;
  statement?: L; text?: L; detailPhotos?: RawPhoto[]; ritualPhotos?: RawPhoto[];
} | null;
type Raw = {
  settings: { phoneDisplay?: string; phoneIntl?: string; whatsapp?: string; email?: string; facebook?: string; addressLine1?: string; addressLine2?: string; groupSize?: number; groupDiscount?: number } | null;
  outings: ({ _id: string; name?: L; short?: L; price?: number; bookingUrl?: string; photo?: RawPhoto; place?: L; who?: L; level?: L; where?: L; text?: L; safety?: L })[];
  home: {
    metaTitle?: L; metaDescription?: L; heroTitle?: L; heroSub?: L; heroLede?: L; heroPhoto?: RawPhoto;
    outingsTitle?: L; outingsText?: L; ritual?: { verb?: L; text?: L; photo?: RawPhoto }[];
    guidesTitle?: L; guidesLead?: L; guidesNote?: L; guidesPhoto?: RawPhoto; guidesFacts?: { label?: L; value?: L }[];
  } | null;
  rafting: RawActivity;
  canyoning: RawActivity;
  gallery: { title?: L; text?: L; photos?: RawPhoto[] } | null;
  faq: { title?: L; items?: { q?: L; a?: L }[] } | null;
};

const PHOTO = `{ asset, crop, hotspot, alt, "dims": asset->metadata.dimensions{ width, height } }`;
const ACTIVITY = `{ metaTitle, metaDescription, title, sub, lede, heroPhoto${PHOTO}, statement, text, detailPhotos[]${PHOTO}, ritualPhotos[]${PHOTO} }`;
const QUERY = `{
  "settings": *[_id == "settings"][0],
  "outings": *[_type == "outing" && _id in ["outing-rafting", "outing-couleau", "outing-fournel"]]{ _id, name, short, price, bookingUrl, photo${PHOTO}, place, who, level, where, text, safety },
  "home": *[_id == "homePage"][0]{ ..., heroPhoto${PHOTO}, guidesPhoto${PHOTO}, ritual[]{ verb, text, photo${PHOTO} } },
  "rafting": *[_id == "raftingPage"][0]${ACTIVITY},
  "canyoning": *[_id == "canyoningPage"][0]${ACTIVITY},
  "gallery": *[_id == "gallery"][0]{ title, text, photos[]${PHOTO} },
  "faq": *[_id == "faq"][0]{ title, items }
}`;

async function fetchRaw(): Promise<Raw | null> {
  "use cache";
  cacheTag(SANITY_TAG);
  // Edits show up within a minute even without the webhook; the webhook makes it instant.
  cacheLife({ stale: 60, revalidate: 60, expire: 60 * 60 * 24 * 7 });
  try {
    return await client.fetch<Raw>(QUERY);
  } catch (error) {
    // Sanity down or misconfigured: the site falls back to its local content.
    console.error("[sanity] fetch failed, using local content", error);
    return null;
  }
}

/* ---------- Merge helpers: Sanity wins when a field is filled, local copy otherwise ---------- */

const str = (v: L, lang: Locale, fallback: string) => {
  const s = v?.[lang]?.trim();
  return s ? s : fallback;
};

/** Builds a next/image-ready photo. `size` crops to that box around the hotspot; without it the whole (cropped) image is served and the hotspot becomes the object-position. */
function photo(raw: RawPhoto | undefined, lang: Locale, fallback: Photo, size?: { w: number; h: number }): Photo {
  if (!raw?.asset?._ref) return { ...fallback, alt: str(raw?.alt, lang, fallback.alt) };
  const alt = str(raw.alt, lang, fallback.alt);
  const base = imageBuilder.image(raw).auto("format").quality(80);
  if (size) return { src: base.width(size.w).height(size.h).fit("crop").url(), alt };

  const crop = raw.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const cw = 1 - crop.left - crop.right;
  const ch = 1 - crop.top - crop.bottom;
  const hs = raw.hotspot;
  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  const position = hs ? `${clamp(((hs.x - crop.left) / cw) * 100).toFixed(1)}% ${clamp(((hs.y - crop.top) / ch) * 100).toFixed(1)}%` : fallback.position;
  const ratio = raw.dims ? (raw.dims.width * cw) / (raw.dims.height * ch) : undefined;
  return { src: base.width(2400).fit("max").url(), alt, position, ratio };
}

/** Uses the Sanity list when it has entries, the local one otherwise. */
const list = <R, T>(raw: R[] | null | undefined, fallback: T[], map: (r: R, i: number) => T) =>
  raw && raw.length ? raw.map(map) : fallback;

const DETAIL = { w: 958 * 2, h: 856 * 2 };
const GALLERY = { w: 958 * 2, h: 1198 * 2 };

/** Local defaults for photographs that live in components today. */
const localPhotos = (t: Copy) => ({
  homeHero: { src: "/images/rafting/rafting-01.jpg", alt: t.hero.photoAlt, position: "50% 62%" },
  guides: { src: "/images/canyoning/canyoning-08.jpg", alt: t.guides.photoAlt },
  raftingHero: { src: "/images/rafting/rafting-02.jpg", alt: t.raftingPage.photoAlt, position: "50% 60%" },
  raftingDetail: [
    { src: "/images/rafting/rafting-12.jpg", alt: t.gallery.photos[1].alt },
    { src: "/images/rafting/rafting-14.jpg", alt: t.gallery.photos[3].alt },
  ],
  canyoningHero: { src: "/images/canyoning/canyoning-04.jpg", alt: t.canyoningPage.photoAlt, position: "50% 40%" },
  canyoningDetail: [
    { src: "/images/canyoning/canyoning-09.jpg", alt: t.gallery.photos[2].alt },
    { src: "/images/canyoning/canyoning-11.jpg", alt: t.gallery.photos[4].alt },
  ],
});

/**
 * All the content of one language: the local copy, overridden field by field by
 * what is filled in Sanity. An empty field in the Studio never empties the site.
 */
export async function getSite(lang: Locale): Promise<Site> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife({ stale: 60, revalidate: 60, expire: 60 * 60 * 24 * 7 });

  const raw = await fetchRaw();
  const local = copy[lang];
  const lp = localPhotos(local);
  const s = raw?.settings;
  const h = raw?.home;
  const byId = (id: OutingId) => raw?.outings.find((o) => o._id === `outing-${id}`);

  const contact: Facts["contact"] = {
    phoneDisplay: s?.phoneDisplay || localContact.phoneDisplay,
    phoneIntl: s?.phoneIntl || localContact.phoneIntl,
    whatsapp: s?.whatsapp || localContact.whatsapp,
    email: s?.email || localContact.email,
    facebook: s?.facebook || localContact.facebook,
    address: [s?.addressLine1 || localContact.address[0], s?.addressLine2 || localContact.address[1]],
  };
  const groupSize = s?.groupSize ?? GROUP_SIZE;
  const groupDiscount = s?.groupDiscount ?? GROUP_DISCOUNT;
  const booking = Object.fromEntries(
    outingOrder.flatMap((id) => {
      const url = byId(id)?.bookingUrl?.trim();
      return url ? [[id, url]] : [];
    }),
  ) as Facts["booking"];
  const prices = Object.fromEntries(outingOrder.map((id) => [id, byId(id)?.price ?? localOutings[id].price])) as Record<OutingId, number>;

  const outings = Object.fromEntries(
    outingOrder.map((id) => {
      const o = byId(id);
      const l = local.outings[id];
      return [
        id,
        {
          ...l,
          name: str(o?.name, lang, l.name),
          short: str(o?.short, lang, l.short),
          place: str(o?.place, lang, l.place),
          text: str(o?.text, lang, l.text),
          safety: str(o?.safety, lang, l.safety),
          who: str(o?.who, lang, l.who),
          level: str(o?.level, lang, l.level),
          where: str(o?.where, lang, l.where),
          alt: str(o?.photo?.alt, lang, l.alt),
        },
      ];
    }),
  ) as Copy["outings"];

  const activity = (r: RawActivity, l: Copy["raftingPage"]) => ({
    ...l,
    title: str(r?.title, lang, l.title),
    sub: str(r?.sub, lang, l.sub),
    lede: str(r?.lede, lang, l.lede),
    statement: str(r?.statement, lang, l.statement),
    text: str(r?.text, lang, l.text),
    photoAlt: str(r?.heroPhoto?.alt, lang, l.photoAlt),
  });
  const pageMeta = (r: RawActivity, title: string, desc: string) => ({ title: str(r?.metaTitle, lang, title), desc: str(r?.metaDescription, lang, desc) });
  const rMeta = pageMeta(raw?.rafting ?? null, local.meta.rafting, local.meta.raftingDesc);
  const cMeta = pageMeta(raw?.canyoning ?? null, local.meta.canyoning, local.meta.canyoningDesc);

  const t: Copy = {
    ...local,
    meta: {
      ...local.meta,
      title: str(h?.metaTitle, lang, local.meta.title),
      description: str(h?.metaDescription, lang, local.meta.description),
      rafting: rMeta.title,
      raftingDesc: rMeta.desc,
      canyoning: cMeta.title,
      canyoningDesc: cMeta.desc,
    },
    hero: { ...local.hero, title: str(h?.heroTitle, lang, local.hero.title), sub: str(h?.heroSub, lang, local.hero.sub), lede: str(h?.heroLede, lang, local.hero.lede) },
    outingsIntro: { title: str(h?.outingsTitle, lang, local.outingsIntro.title), text: str(h?.outingsText, lang, local.outingsIntro.text) },
    outings,
    ritual: {
      ...local.ritual,
      steps: local.ritual.steps.map((step, i) => {
        const r = h?.ritual?.[i];
        return { verb: str(r?.verb, lang, step.verb), text: str(r?.text, lang, step.text), photo: photo(r?.photo, lang, step.photo) };
      }),
    },
    canyonRitual: local.canyonRitual.map((p, i) => photo(raw?.canyoning?.ritualPhotos?.[i], lang, p)),
    guides: {
      ...local.guides,
      title: str(h?.guidesTitle, lang, local.guides.title),
      lead: str(h?.guidesLead, lang, local.guides.lead),
      note: str(h?.guidesNote, lang, local.guides.note),
      facts: list(h?.guidesFacts, local.guides.facts, (f, i) => ({
        label: str(f.label, lang, local.guides.facts[i]?.label ?? ""),
        value: str(f.value, lang, local.guides.facts[i]?.value ?? ""),
      })),
    },
    gallery: {
      ...local.gallery,
      title: str(raw?.gallery?.title, lang, local.gallery.title),
      text: str(raw?.gallery?.text, lang, local.gallery.text),
      photos: list(raw?.gallery?.photos?.filter((p) => p?.asset), local.gallery.photos, (p, i) =>
        photo(p, lang, { src: "", alt: local.gallery.photos[i]?.alt ?? "" }, GALLERY),
      ),
    },
    faq: {
      ...local.faq,
      title: str(raw?.faq?.title, lang, local.faq.title),
      facts: [
        { ...local.faq.facts[0], value: contact.address.join(", ") },
        local.faq.facts[1],
        { ...local.faq.facts[2], value: contact.phoneDisplay },
      ],
      items: list(raw?.faq?.items?.filter((it) => it.q?.[lang]?.trim()), local.faq.items, (it) => ({ q: str(it.q, lang, ""), a: str(it.a, lang, "") })),
    },
    raftingPage: activity(raw?.rafting ?? null, local.raftingPage),
    canyoningPage: activity(raw?.canyoning ?? null, local.canyoningPage),
  };

  const detail = (r: RawActivity, fallback: Photo[]) => fallback.map((p, i) => photo(r?.detailPhotos?.[i], lang, p, DETAIL));

  return {
    lang,
    t,
    facts: { contact, groupSize, groupDiscount, prices, booking },
    photos: {
      outings: Object.fromEntries(
        outingOrder.map((id) => [id, photo(byId(id)?.photo, lang, { src: localOutings[id].photo, alt: outings[id].alt })]),
      ) as Record<OutingId, Photo>,
      home: { hero: photo(h?.heroPhoto, lang, lp.homeHero), guides: photo(h?.guidesPhoto, lang, lp.guides) },
      rafting: { hero: photo(raw?.rafting?.heroPhoto, lang, lp.raftingHero), detail: detail(raw?.rafting ?? null, lp.raftingDetail) },
      canyoning: { hero: photo(raw?.canyoning?.heroPhoto, lang, lp.canyoningHero), detail: detail(raw?.canyoning ?? null, lp.canyoningDetail) },
    },
  };
}
