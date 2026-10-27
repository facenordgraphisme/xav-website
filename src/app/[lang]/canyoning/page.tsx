import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, hasLocale } from "@/content/copy";
import { contact, outings } from "@/content/site";
import { PosterHero } from "@/components/PosterHero";
import { Detail, Faq, Outings, Ritual } from "@/components/Sections";
import { Ticket } from "@/components/Ticket";

export async function generateMetadata({ params }: PageProps<"/[lang]/canyoning">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = copy[lang].meta;
  return {
    title: t.canyoning,
    description: t.canyoningDesc,
    alternates: { canonical: `/${lang}/canyoning`, languages: { fr: "/fr/canyoning", en: "/en/canyoning" } },
  };
}

export default async function Canyoning({ params }: PageProps<"/[lang]/canyoning">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = copy[lang];
  const p = t.canyoningPage;
  const from = Math.min(outings.couleau.price, outings.fournel.price);
  const price = lang === "fr" ? `${from} €` : `€${from}`;

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
        phone={{ label: `${t.hero.call} ${contact.phoneDisplay}`, href: `tel:${contact.phoneIntl}` }}
        photo={{ src: "/images/canyoning/canyoning-04.jpg", alt: p.photoAlt, position: "50% 40%" }}
      />
      <Detail
        title={t.nav.canyoning}
        statement={p.statement}
        text={p.text}
        pics={[
          { src: "/images/canyoning/canyoning-09.jpg", alt: t.gallery.photos[2].alt },
          { src: "/images/canyoning/canyoning-11.jpg", alt: t.gallery.photos[4].alt },
        ]}
      />
      <Outings lang={lang} only={["couleau", "fournel"]} />
      <Ritual lang={lang} photos={t.canyonRitual} />
      <Ticket lang={lang} initial="couleau" only={["couleau", "fournel"]} />
      <Faq lang={lang} />
    </>
  );
}
