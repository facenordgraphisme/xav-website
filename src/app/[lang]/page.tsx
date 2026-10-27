import { notFound } from "next/navigation";
import { copy, fill, hasLocale } from "@/content/copy";
import { contact, lowestPrice } from "@/content/site";
import { PosterHero } from "@/components/PosterHero";
import { Faq, Guides, Outings, Ritual } from "@/components/Sections";
import { Ticket } from "@/components/Ticket";
import { Gallery } from "@/components/Gallery";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = copy[lang];

  return (
    <>
      <PosterHero
        title={t.hero.title}
        sub={t.hero.sub}
        lede={t.hero.lede}
        facts={t.hero.facts.map((f) => ({ ...f, value: fill(f.value, { price: lowestPrice }) }))}
        cta={{ label: t.hero.cta, href: "#reserver" }}
        phone={{ label: `${t.hero.call} ${contact.phoneDisplay}`, href: `tel:${contact.phoneIntl}` }}
        photo={{ src: "/images/rafting/rafting-01.jpg", alt: t.hero.photoAlt, position: "50% 62%" }}
      />
      <Outings lang={lang} />
      <Ritual lang={lang} />
      <Guides lang={lang} />
      <Ticket lang={lang} />
      <Gallery lang={lang} />
      <Faq lang={lang} />
    </>
  );
}
