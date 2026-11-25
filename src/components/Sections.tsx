import Image from "next/image";
import type { Site } from "@/content/getSite";
import { money, unitPrice, type Photo } from "@/content/facts";
import { outingOrder, type OutingId } from "@/content/site";
import { Arrow } from "./PosterHero";
import SplitText from "./SplitText";

const style = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/* ---------- Three outings: intro strip + one full-bleed frame each ---------- */

export function Outings({ site, only }: { site: Site; only?: OutingId[] }) {
  const { t } = site;
  const ids = only ?? outingOrder;
  return (
    <section id="sorties" aria-labelledby="sorties-title">
      {!only && (
        <div className="intro field-sun frame">
          <div className="grid12" data-reveal-group>
            <h2 id="sorties-title" className="head" data-reveal>
              {t.outingsIntro.title}
            </h2>
            <p className="lead" data-reveal>
              {t.outingsIntro.text}
            </p>
          </div>
        </div>
      )}
      {only && (
        <h2 id="sorties-title" className="sr-only">
          {t.outingsIntro.title}
        </h2>
      )}
      {ids.map((id, i) => (
        <OutingFrame key={id} id={id} site={site} position={i} />
      ))}
    </section>
  );
}

function OutingFrame({ id, site, position }: { id: OutingId; site: Site; position: number }) {
  const { t } = site;
  const o = t.outings[id];
  const pic = site.photos.outings[id];
  const price = money(unitPrice(site.facts, id, 1), site.lang);
  return (
    <article className="showcase__frame" aria-labelledby={`o-${id}`}>
      <div className="showcase__media">
        <div className="showcase__bg" data-drift>
          <Image src={pic.src} alt={pic.alt} fill sizes="100vw" loading="eager" fetchPriority="low" style={{ objectFit: "cover", objectPosition: pic.position }} />
        </div>
      </div>
      <div className="showcase__grid frame">
        <div className="card" style={style({ "--col": position + 2 })} data-reveal-group>
          <h3 id={`o-${id}`} data-reveal>
            {o.name}
          </h3>
          <p className="card__place" data-reveal>
            {o.place}
          </p>
          <dl className="slots num" data-reveal>
            <div style={{ display: "contents" }}>
              <dt>{t.slots.duration}</dt>
              <dd>{t.lineup.duration}</dd>
            </div>
            <div style={{ display: "contents" }}>
              <dt>{t.slots.who}</dt>
              <dd>{o.who}</dd>
            </div>
            <div style={{ display: "contents" }}>
              <dt>{t.slots.price}</dt>
              <dd>{price}</dd>
            </div>
          </dl>
          <p className="card__text" data-reveal>
            {o.text}
          </p>
          <p className="card__safety" data-reveal>
            {o.safety}
          </p>
          {/* Online booking when the outing has its Outplanners page, the request form otherwise */}
          <a className="btn btn--block" href={site.facts.booking[id] ?? "#reserver"} data-outing={id} data-outplanners={site.facts.booking[id] ? "" : undefined} data-reveal>
            {t.bookThis}
            <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Ritual: one verb at a time, each on its own flat field beside its photograph ---------- */

const FIELDS = ["sun", "lake", "sky", "sun"] as const;
// Each step shows a different stretch of the real valley map
const MAP_CROPS = ["12% 18%", "78% 64%", "40% 92%", "92% 10%"];

export function Ritual({ site, photos }: { site: Site; photos?: Photo[] }) {
  const t = site.t.ritual;
  return (
    <section aria-labelledby="ritual-title">
      <h2 id="ritual-title" className="sr-only">
        {t.title}
      </h2>
      <ol className="ritual">
        {t.steps.map((s, i) => {
          const photo = photos?.[i] ?? s.photo;
          return (
            <li
              key={s.verb}
              className={`ritual__panel field-${FIELDS[i % FIELDS.length]}`}
              data-flip={i % 2 === 1 || undefined}
              style={{ "--map-crop": MAP_CROPS[i % MAP_CROPS.length] } as React.CSSProperties}
            >
              <div className="ritual__field">
                <div className="ritual__map" aria-hidden="true" />
                <div className="ritual__group" data-reveal-group>
                  <p className="ritual__verb" aria-hidden="true" data-reveal>
                    {s.verb}
                  </p>
                  <p className="ritual__text" data-reveal>
                    <span className="sr-only">{s.verb}. </span>
                    {s.text}
                  </p>
                </div>
              </div>
              <div className="ritual__photo">
                {/* Eager but low priority: a fast scroll must never land on an empty panel */}
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 50vw" loading="eager" fetchPriority="low" style={{ objectPosition: photo.position }} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ---------- Guides: wide photo, colour tile, facts ---------- */

export function Guides({ site }: { site: Site }) {
  const t = site.t.guides;
  const guidesPhoto = site.photos.home.guides;
  return (
    <section id="guides" className="guides field-sky frame" aria-labelledby="guides-title">
      <div className="grid12" data-reveal-group>
        <h2 id="guides-title" className="head">
          <SplitText text={t.title} tag="span" splitType="chars" delay={28} duration={1} ease="expo.out" mask textAlign="left" from={{ yPercent: 105 }} to={{ yPercent: 0 }} rootMargin="-60px" />
        </h2>
        <p className="lead" data-reveal>
          {t.lead}
        </p>
        <figure className="guides__photo">
          <div className="guides__img" data-shutter>
            <Image src={guidesPhoto.src} alt={guidesPhoto.alt} fill sizes="(max-width: 860px) 100vw, 66vw" style={{ objectPosition: guidesPhoto.position }} />
          </div>
          <figcaption className="guides__note">{t.note}</figcaption>
        </figure>
        <div className="guides__side">
          <figure className="guides__tile">
            <div className="guides__img" data-shutter>
              <Image src="/images/lieu/serre-poncon.jpg" alt={t.mapLabel} fill sizes="(max-width: 860px) 100vw, 33vw" />
            </div>
            <figcaption>{t.lakeCaption}</figcaption>
          </figure>
          <dl className="facts4">
            {t.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ beside a tall photograph ---------- */

export function Faq({ site }: { site: Site }) {
  const t = site.t.faq;
  const { contact } = site.facts;
  return (
    <section id="infos" className="faq field-sky frame" aria-labelledby="faq-title">
      <div className="grid12">
        <div className="faq__copy" data-reveal-group>
          <h2 id="faq-title" className="head" data-reveal>
            {t.title}
          </h2>
          <dl className="faq__facts" data-reveal>
            {t.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.label === "Téléphone" || f.label === "Phone" ? <a className="link" href={`tel:${contact.phoneIntl}`}>{f.value}</a> : f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="qa" data-reveal>
            {t.items.map((item) => (
              <details key={item.q} name="faq">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="faq__actions" data-reveal>
            <a className="btn" href="#reserver">
              {t.cta}
              <Arrow />
            </a>
            <a className="link" href={`mailto:${contact.email}`} style={{ fontWeight: 700 }}>
              {t.write}
            </a>
          </div>
        </div>
        <div className="faq__media">
          <div className="faq__tall" data-shutter>
            <Image src="/images/rafting/rafting-11.jpg" alt={t.tallAlt} width={1600} height={2000} sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          <div className="faq__square">
            <Image src="/images/canyoning/canyoning-02.jpg" alt={t.squareAlt} width={1170} height={1463} sizes="(max-width: 860px) 40vw, 18vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Activity page detail ---------- */

export function Detail({ title, statement, text, pics }: { title: string; statement: string; text: string; pics: { src: string; alt: string }[] }) {
  return (
    <section className="detail field-sun frame" aria-labelledby="detail-title">
      <div className="grid12" data-reveal-group>
        <div className="detail__copy">
          <h2 id="detail-title" className="head" data-reveal>
            {title}
          </h2>
          <p className="detail__statement" data-reveal>
            {statement}
          </p>
          <p className="lead" data-reveal style={{ maxWidth: "46ch" }}>
            {text}
          </p>
        </div>
        <div className="detail__pics">
          {pics.map((p) => (
            <figure key={p.src} data-shutter>
              <Image src={p.src} alt={p.alt} width={958} height={856} sizes="(max-width: 860px) 50vw, 22vw" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

