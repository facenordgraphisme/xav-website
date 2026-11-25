import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/content/copy";
import { getSite } from "@/content/getSite";
import { money, unitPrice } from "@/content/facts";
import { PosterHero } from "@/components/PosterHero";
import { Detail, Faq, Outings } from "@/components/Sections";
import { Ticket } from "@/components/Ticket";
import { JsonLd } from "@/components/JsonLd";
import { activitySchema } from "@/content/schema";

export async function generateMetadata({ params }: PageProps<"/[lang]/rafting">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getSite(lang)).t.meta;
  return {
    title: t.rafting,
    description: t.raftingDesc,
    alternates: { canonical: `/${lang}/rafting`, languages: { fr: "/fr/rafting", en: "/en/rafting", "x-default": "/fr/rafting" } },
  };
}

export default async function Rafting({ params }: PageProps<"/[lang]/rafting">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const site = await getSite(lang);
  const { t, facts } = site;
  const p = t.raftingPage;

  return (
    <>
      <JsonLd data={activitySchema(site, "rafting")} />
      <PosterHero
        title={p.title}
        sub={p.sub}
        lede={p.lede}
        facts={[
          { label: t.slots.duration, value: t.lineup.duration },
          { label: t.slots.who, value: t.outings.rafting.who },
          { label: t.slots.price, value: money(unitPrice(facts, "rafting", 1), lang) },
        ]}
        cta={{ label: t.bookThis, href: facts.booking.rafting ?? "#reserver", outplanners: Boolean(facts.booking.rafting) }}
        phone={{ label: `${t.hero.call} ${facts.contact.phoneDisplay}`, href: `tel:${facts.contact.phoneIntl}` }}
        photo={site.photos.rafting.hero}
        base={t.hero.mapBase}
      />
      <Detail title={t.outings.rafting.name} statement={p.statement} text={p.text} pics={site.photos.rafting.detail} />
      <Outings site={site} only={["rafting"]} />
      <Ticket lang={lang} t={{ ticket: t.ticket, outings: t.outings, book: t.nav.book }} facts={facts} initial="rafting" />
      <Faq site={site} />
    </>
  );
}
