"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Copy, Locale } from "@/content/copy";

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="tool theme-toggle"
      aria-label={label}
      onClick={() => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
    >
      {/* Moon shows on the light poster, sun on the night one (CSS decides) */}
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
      </svg>
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <circle cx="12" cy="12" r="4.6" />
        <path d="M11 1.5h2v3h-2zM11 19.5h2v3h-2zM1.5 11h3v2h-3zM19.5 11h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zM16.3 17.7l1.4-1.4 2.1 2.1-1.4 1.4zM4.2 18.4l2.1-2.1 1.4 1.4-2.1 2.1zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1z" />
      </svg>
    </button>
  );
}

export function SiteHeader({ lang, t, phone }: { lang: Locale; t: Copy["nav"]; phone: { display: string; intl: string } }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const other: Locale = lang === "fr" ? "en" : "fr";
  const switchHref = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${other}`);
  const home = `/${lang}`;
  // Only the home and activity pages carry the booking ticket; elsewhere the button goes home to it.
  const hasTicket = pathname === home || /\/(rafting|canyoning)$/.test(pathname);
  const bookHref = hasTicket ? "#reserver" : `${home}#reserver`;
  const links = [
    { href: `${home}/rafting`, label: t.rafting },
    { href: `${home}/canyoning`, label: t.canyoning },
    { href: `${home}#guides`, label: t.guides },
    { href: `${home}#reserver`, label: t.prices },
    { href: `${home}#infos`, label: t.faq },
  ];

  useEffect(() => {
    if (!open) return;
    const panel = menuRef.current;
    const opener = openerRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
      opener?.focus();
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__bar frame">
        <Link className="brand" href={home}>
          <Image src="/logo-badge.png" alt="" width={52} height={52} sizes="52px" preload />
          <span className="wordmark">Activités Nature</span>
        </Link>
        <nav className="site-nav" aria-label={t.menu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="tools">
          <Link className="tool hide-sm" href={switchHref} hrefLang={other} aria-label={t.language}>
            {t.languageShort}
          </Link>
          <span className="hide-sm">
            <ThemeToggle label={t.theme} />
          </span>
          <a className="btn header-cta" href={bookHref}>
            {t.book}
          </a>
          <button
            ref={openerRef}
            type="button"
            className="tool menu-btn"
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen(true)}
          >
            {t.menu}
          </button>
        </div>
      </div>

      <div
        id="menu-panel"
        ref={menuRef}
        className="menu-panel frame"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        inert={!open}
      >
        <div className="menu-panel__top">
          <span className="brand"><span className="wordmark">Activités Nature</span></span>
          <button type="button" className="tool" onClick={() => setOpen(false)}>
            {t.close}
          </button>
        </div>
        <nav aria-label={t.menu}>
          <Link href={home} onClick={() => setOpen(false)}>
            {t.home}
          </Link>
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ "--i": i + 1 } as React.CSSProperties}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu-panel__foot">
          <a className="btn btn--ink btn--block" href={bookHref} onClick={() => setOpen(false)}>
            {t.book}
          </a>
          <div className="tools">
            <a className="tool" href={`tel:${phone.intl}`}>
              {phone.display}
            </a>
            <Link className="tool" href={switchHref} hrefLang={other}>
              {t.language}
            </Link>
            <ThemeToggle label={t.theme} />
          </div>
        </div>
      </div>
    </header>
  );
}
