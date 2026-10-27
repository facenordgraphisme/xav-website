import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, hasLocale } from "@/content/copy";
import { contact, outings } from "@/content/site";
import { PosterHero } from "@/components/PosterHero";
import { Detail, Faq, Outings } from "@/components/Sections";
import { Ticket } from "@/components/Ticket";

export async function generateMetadata({ params }: PageProps<"/[lang]/rafting">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = copy[lang].meta;
  return {
    title: t.rafting,
    description: t.raftingDesc,
    alternates: { canonical: `/${lang}/rafting`, languages: { fr: "/fr/rafting", en: "/en/rafting" } },
  };
}

export default async function Rafting({ params }: PageProps<"/[lang]/rafting">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = copy[lang];
  const p = t.raftingPage;
  const price = lang === "fr" ? `${outings.rafting.price} €` : `€${outings.rafting.price}`;

  return (
    <>
      <PosterHero
        title={p.title}
        sub={p.sub}
        lede={p.lede}
        facts={[
          { label: t.slots.duration, value: t.lineup.duration },
          { label: t.slots.who, value: t.outings.rafting.who },
          { label: t.slots.price, value: price },
        ]}
        cta={{ label: t.bookThis, href: "#reserver" }}
        phone={{ label: `${t.hero.call} ${contact.phoneDisplay}`, href: `tel:${contact.phoneIntl}` }}
        photo={{ src: "/images/rafting/rafting-02.jpg", alt: p.photoAlt, position: "50% 60%" }}
      />
      <Detail
        title={t.outings.rafting.name}
        statement={p.statement}
        text={p.text}
        pics={[
          { src: "/images/rafting/rafting-12.jpg", alt: t.gallery.photos[1].alt },
          { src: "/images/rafting/rafting-14.jpg", alt: t.gallery.photos[3].alt },
        ]}
      />
      <Outings lang={lang} only={["rafting"]} />
      <Ticket lang={lang} initial="rafting" />
      <Faq lang={lang} />
    </>
  );
}
