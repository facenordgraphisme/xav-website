import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/content/copy";
import { getSite } from "@/content/getSite";
import { money } from "@/content/facts";
import { PosterHero } from "@/components/PosterHero";
import { Detail, Faq, Outings, Ritual } from "@/components/Sections";
import { Ticket } from "@/components/Ticket";

export async function generateMetadata({ params }: PageProps<"/[lang]/canyoning">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getSite(lang)).t.meta;
  return {
    title: t.canyoning,
    description: t.canyoningDesc,
    alternates: { canonical: `/${lang}/canyoning`, languages: { fr: "/fr/canyoning", en: "/en/canyoning" } },
  };
}

export default async function Canyoning({ params }: PageProps<"/[lang]/canyoning">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const site = await getSite(lang);
  const { t, facts } = site;
  const p = t.canyoningPage;
  const price = money(Math.min(facts.prices.couleau, facts.prices.fournel), lang);

  return (
    <>
      <PosterHero
        title={p.title}
        sub={p.sub}
        lede={p.lede}
        facts={[
          { label: t.slots.duration, value: t.lineup.duration },
          { label: t.slots.who, value: t.outings.couleau.who },
          { label: t.slots.price, value: lang === "fr" ? `dès ${price}` : `from ${price}` },
        ]}
        cta={{ label: t.bookThis, href: "#reserver" }}
        phone={{ label: `${t.hero.call} ${facts.contact.phoneDisplay}`, href: `tel:${facts.contact.phoneIntl}` }}
        photo={site.photos.canyoning.hero}
      />
      <Detail title={t.nav.canyoning} statement={p.statement} text={p.text} pics={site.photos.canyoning.detail} />
      <Outings site={site} only={["couleau", "fournel"]} />
      <Ritual site={site} photos={t.canyonRitual} />
      <Ticket lang={lang} t={{ ticket: t.ticket, outings: t.outings, book: t.nav.book }} facts={facts} initial="couleau" only={["couleau", "fournel"]} />
      <Faq site={site} />
    </>
  );
}
