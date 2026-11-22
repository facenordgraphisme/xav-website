import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { hasLocale, locales } from "@/content/copy";
import { getLegal } from "@/content/getLegal";
import { legalIdFromSlug, legalIds, legalSlugs } from "@/content/legal";

export async function generateStaticParams() {
  return locales.flatMap((lang) => legalIds.map((id) => ({ lang, legal: legalSlugs[id] })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[legal]">): Promise<Metadata> {
  const { lang, legal } = await params;
  const id = legalIdFromSlug(legal);
  if (!hasLocale(lang) || !id) return {};
  const page = await getLegal(id, lang);
  return {
    title: `${page.title} · Activités Nature`,
    description: page.description,
    alternates: { canonical: `/${lang}/${legal}`, languages: { fr: `/fr/${legal}`, en: `/en/${legal}`, "x-default": `/fr/${legal}` } },
  };
}

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      if (href.startsWith("/")) return <Link className="link" href={href}>{children}</Link>;
      const external = href.startsWith("http");
      return (
        <a className="link" href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export default async function LegalPage({ params }: PageProps<"/[lang]/[legal]">) {
  const { lang, legal } = await params;
  const id = legalIdFromSlug(legal);
  if (!hasLocale(lang) || !id) notFound();
  const page = await getLegal(id, lang);
  const date = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(page.updated));

  return (
    <article className="legal frame" aria-labelledby="legal-title">
      <header className="legal__head">
        <h1 id="legal-title" className="head">
          {page.title}
        </h1>
        <p className="legal__date">
          {lang === "fr" ? "Mise à jour le" : "Last updated"} <time dateTime={page.updated}>{date}</time>
        </p>
      </header>
      <div className="legal__body">
        <PortableText value={page.body} components={components} />
      </div>
    </article>
  );
}
