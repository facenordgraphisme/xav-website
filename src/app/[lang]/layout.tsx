import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { copy, hasLocale, locales } from "@/content/copy";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Motion } from "@/components/Motion";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = copy[lang].meta;
  return {
    metadataBase: new URL("https://activites-nature.vercel.app"),
    title: t.title,
    description: t.description,
    alternates: { canonical: `/${lang}`, languages: { fr: "/fr", en: "/en" } },
    openGraph: {
      title: t.title,
      description: t.description,
      images: ["/images/rafting/rafting-07.jpg"],
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#cfe7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0e2433" },
  ],
};

// Runs before paint: restores the saved theme and marks that scripts run.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = copy[lang];

  return (
    <html lang={lang} className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#contenu">
          {t.nav.skip}
        </a>
        <SiteHeader lang={lang} />
        <main id="contenu">{children}</main>
        <SiteFooter lang={lang} />
        <Motion />
      </body>
    </html>
  );
}
