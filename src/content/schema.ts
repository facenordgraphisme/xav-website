import type { Site } from "./getSite";
import { SITE_URL, type OutingId } from "./site";

// Structured data (schema.org JSON-LD) read by Google. Everything comes from the same
// content as the page, so prices and contacts follow Sanity.

const BUSINESS = `${SITE_URL}/#business`;
const abs = (src: string) => (src.startsWith("/") ? `${SITE_URL}${src}` : src);

/** The business itself, on every page. */
export function businessSchema(site: Site) {
  const { contact, prices } = site.facts;
  const { lang, t } = site;
  const all = Object.values(prices);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsActivityLocation",
        "@id": BUSINESS,
        name: "Activités Nature",
        description: t.meta.description,
        url: `${SITE_URL}/${lang}`,
        telephone: contact.phoneIntl,
        email: contact.email,
        image: [abs(site.photos.home.hero.src), abs(site.photos.rafting.hero.src), abs(site.photos.canyoning.hero.src)],
        logo: `${SITE_URL}/icon.png`,
        priceRange: `${Math.min(...all)} € – ${Math.max(...all)} €`,
        currenciesAccepted: "EUR",
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address[0],
          postalCode: contact.address[1].match(/\d{5}/)?.[0],
          addressLocality: contact.address[1].replace(/\d{5}\s*/, ""),
          addressRegion: "Hautes-Alpes",
          addressCountry: "FR",
        },
        areaServed: ["Embrun", "Baratier", "Serre-Ponçon", "Hautes-Alpes"].map((name) => ({ "@type": "Place", name })),
        sameAs: [contact.facebook],
        knowsAbout: ["Rafting", "Canyoning", "Durance"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Activités Nature",
        inLanguage: ["fr-FR", "en"],
        publisher: { "@id": BUSINESS },
      },
    ],
  };
}

/** One outing sold by the business: the rafting trip, or a canyon. */
function trip(site: Site, id: OutingId, path: string) {
  const o = site.t.outings[id];
  return {
    "@type": "TouristTrip",
    name: o.name,
    description: o.text,
    touristType: o.who,
    provider: { "@id": BUSINESS },
    offers: {
      "@type": "Offer",
      price: site.facts.prices[id],
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: site.facts.booking[id] ?? `${SITE_URL}/${site.lang}${path}`,
    },
  };
}

/** Breadcrumb + the trips of an activity page. */
export function activitySchema(site: Site, page: "rafting" | "canyoning") {
  const path = `/${page}`;
  const name = page === "rafting" ? site.t.nav.rafting : site.t.nav.canyoning;
  const ids: OutingId[] = page === "rafting" ? ["rafting"] : ["couleau", "fournel"];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.t.nav.home, item: `${SITE_URL}/${site.lang}` },
          { "@type": "ListItem", position: 2, name, item: `${SITE_URL}/${site.lang}${path}` },
        ],
      },
      ...ids.map((id) => trip(site, id, path)),
    ],
  };
}

/** The questions shown in "Bon à savoir" (home page only, so Google sees them once). */
export function faqSchema(site: Site) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
