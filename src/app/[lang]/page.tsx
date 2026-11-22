import { notFound } from "next/navigation";
import { fill, hasLocale } from "@/content/copy";
import { getSite } from "@/content/getSite";
import { lowestPrice } from "@/content/facts";
import { PosterHero } from "@/components/PosterHero";
import { Faq, Guides, Outings, Ritual } from "@/components/Sections";
import { Ticket } from "@/components/Ticket";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/content/schema";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const site = await getSite(lang);
  const { t, facts } = site;

  return (
    <>
      <JsonLd data={faqSchema(site)} />
      <PosterHero
        title={t.hero.title}
        sub={t.hero.sub}
        lede={t.hero.lede}
        facts={t.hero.facts.map((f) => ({ ...f, value: fill(f.value, { price: lowestPrice(facts) }) }))}
        cta={{ label: t.hero.cta, href: "#reserver" }}
        phone={{ label: `${t.hero.call} ${facts.contact.phoneDisplay}`, href: `tel:${facts.contact.phoneIntl}` }}
        photo={site.photos.home.hero}
      />
      <Outings site={site} />
      <Ritual site={site} />
      <Guides site={site} />
      <Ticket lang={lang} t={{ ticket: t.ticket, outings: t.outings, book: t.nav.book }} facts={facts} />
      <Gallery t={t.gallery} />
      <Faq site={site} />
    </>
  );
}
