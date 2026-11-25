import Image from "next/image";
import Link from "next/link";
import type { Site } from "@/content/getSite";
import { legalIds, legalSlugs } from "@/content/legal";
import SplitText from "./SplitText";

/** One close: the e-mail set as display type on the sky, then photograph half, menu half on the sun. */
export function SiteFooter({ site }: { site: Site }) {
  const { t, lang } = site;
  const { contact } = site.facts;
  const home = `/${lang}`;
  const [user, domain] = contact.email.split("@");
  const legalLabels = lang === "fr"
    ? { mentions: "Mentions légales", privacy: "Confidentialité", cookies: "Cookies", terms: "CGV" }
    : { mentions: "Legal notice", privacy: "Privacy", cookies: "Cookies", terms: "Terms of sale" };
  const links = [
    { href: `${home}/rafting`, label: t.nav.rafting },
    { href: `${home}/canyoning`, label: t.nav.canyoning },
    { href: `${home}#guides`, label: t.nav.guides },
    { href: `${home}#reserver`, label: t.nav.prices },
    { href: `${home}#infos`, label: t.nav.faq },
  ];
  return (
    <footer>
      <section className="statement field-sky frame" aria-labelledby="contact-title">
        <h2 id="contact-title" className="statement__sentence">
          <SplitText
            text={t.contact.sentence}
            tag="span"
            splitType="words"
            delay={45}
            duration={0.9}
            ease="expo.out"
            textAlign="left"
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            rootMargin="-40px"
          />
        </h2>
        <a className="statement__mail" href={`mailto:${contact.email}`}>
          <span>{user}@</span>
          <span>{domain}</span>
        </a>
        <div className="statement__foot">
          <div>
            <a className="link" href={`tel:${contact.phoneIntl}`}>
              {contact.phoneDisplay}
            </a>
            <span>{t.contact.city}</span>
          </div>
          <div>
            <a className="link" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="link" href={contact.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </section>

      <div className="site-footer">
        <div className="site-footer__photo">
          <Image src="/images/rafting/rafting-17.jpg" alt={t.footer.photoAlt} fill sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
        <div className="site-footer__menu">
          <Link className="site-footer__brand" href={home}>
            <Image src="/logo-badge.png" alt="" width={56} height={56} sizes="56px" />
            <span className="wordmark">Activités Nature</span>
          </Link>
          <nav className="footer-nav" aria-label={t.nav.menu}>
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="site-footer__blocks">
            <div>
              <h2>{t.footer.contact}</h2>
              <p>
                {contact.address[0]}
                <br />
                {contact.address[1]}
              </p>
            </div>
            <div>
              <h2>{t.footer.follow}</h2>
              <p>
                <a className="link" href={contact.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <br />
                <a className="link" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
          <div className="site-footer__legal">
            <nav className="site-footer__legal-nav" aria-label={lang === "fr" ? "Informations légales" : "Legal information"}>
              {legalIds.map((id) => (
                <Link key={id} className="link" href={`${home}/${legalSlugs[id]}`}>
                  {legalLabels[id]}
                </Link>
              ))}
            </nav>
            <p>{t.footer.legal}</p>
            <p>{t.footer.credit}</p>
            <p className="site-footer__made">
              {t.footer.poweredBy}{" "}
              <a className="link" href="https://facenordgraphisme.fr" target="_blank" rel="noopener">
                Face Nord Graphisme
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
