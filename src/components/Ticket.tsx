"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { copy, fill, type Locale } from "@/content/copy";
import { contact, GROUP_SIZE, outingOrder, unitPrice, type OutingId } from "@/content/site";
import { Arrow } from "./PosterHero";

// Season runs 1 April – 2 October. Off-season, the picker opens on next year's season.
function seasonKey() {
  const now = new Date();
  const y = now.getFullYear();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = `${y}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const end = `${y}-10-02`;
  if (today > end) return `${y + 1}-04-01|${y + 1}-10-02`;
  const start = `${y}-04-01`;
  return `${today > start ? today : start}|${end}`;
}
const noop = () => () => {};

function formatDate(iso: string, lang: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(y, m - 1, d));
}

export function Ticket({ lang, initial = "rafting", only }: { lang: Locale; initial?: OutingId; only?: OutingId[] }) {
  const t = copy[lang];
  const k = t.ticket;
  const ids = only ?? outingOrder;
  const uid = useId();
  const [outing, setOuting] = useState<OutingId>(initial);
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const range = useSyncExternalStore(noop, seasonKey, () => null);
  const [min, max] = range ? range.split("|") : [undefined, undefined];

  // "Book this trip" buttons elsewhere on the page pick the outing here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-outing]");
      const id = el?.dataset.outing as OutingId | undefined;
      if (id && ids.includes(id)) setOuting(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [ids]);

  const unit = unitPrice(outing, people);
  const total = unit * people;
  const money = (n: number) => (lang === "fr" ? `${n} €` : `€${n}`);
  const dateInvalid = Boolean(date && min && max && (date < min || date > max));

  const message = fill(k.message, {
    outing: t.outings[outing].name,
    date: date && !dateInvalid ? formatDate(date, lang) : k.anyDate,
    n: people,
    total,
    name: name.trim() ? fill(k.signed, { name: name.trim() }) : "",
  });
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const mail = `mailto:${contact.email}?subject=${encodeURIComponent(`${t.nav.book} · ${t.outings[outing].name}`)}&body=${encodeURIComponent(message)}`;

  return (
    <section id="reserver" className="ticket-section field-lake frame" aria-labelledby={`${uid}-title`}>
      <form className="ticket" onSubmit={(e) => e.preventDefault()} data-reveal-group>
        <div className="ticket__main">
          <div className="ticket__head">
            <h2 id={`${uid}-title`} className="ticket__title" data-reveal>
              {k.title}
            </h2>
            <p className="lead" style={{ maxWidth: "46ch" }} data-reveal>
              {k.intro}
            </p>
          </div>

          <fieldset className="fieldset" data-reveal>
            <legend>{k.outing}</legend>
            <div className="choices">
              {ids.map((id) => (
                <label key={id} className="choice">
                  <input type="radio" name={`${uid}-outing`} value={id} checked={outing === id} onChange={() => setOuting(id)} />
                  <span>
                    {t.outings[id].short} · {money(unitPrice(id, 1))}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="row2" data-reveal>
            <div className="field">
              <label htmlFor={`${uid}-date`}>{k.date}</label>
              <input
                id={`${uid}-date`}
                className="input"
                type="date"
                min={min}
                max={max}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-invalid={dateInvalid}
                aria-describedby={`${uid}-date-hint`}
              />
              <span id={`${uid}-date-hint`} className={dateInvalid ? "error" : "hint"} aria-live="polite">
                {dateInvalid ? k.errorDate : k.dateHint}
              </span>
            </div>
            <div className="field">
              <span id={`${uid}-people`} className="label">
                {k.people}
              </span>
              <div className="stepper" role="group" aria-labelledby={`${uid}-people`}>
                <button type="button" aria-label={k.less} disabled={people <= 1} onClick={() => setPeople((n) => Math.max(1, n - 1))}>
                  <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M4 10h12" />
                  </svg>
                </button>
                <output aria-live="polite">{people}</output>
                <button type="button" aria-label={k.more} disabled={people >= 30} onClick={() => setPeople((n) => Math.min(30, n + 1))}>
                  <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M4 10h12M10 4v12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="field">
              <label htmlFor={`${uid}-name`}>{k.name}</label>
              <input
                id={`${uid}-name`}
                className="input"
                type="text"
                autoComplete="given-name"
                placeholder={k.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <ul className="ticket__terms ticket__terms--main" data-reveal>
            {k.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>


        <div className="ticket__stub" data-reveal>
          <output className="ticket__price" aria-live="polite" aria-label={`${k.total} ${money(total)}`}>
            <span key={total} className="price-roll">
              {money(total)}
            </span>
          </output>
          <p className="ticket__sum num">
            {fill(k.each, { unit, n: people, people: people > 1 ? k.peopleN : k.people1 })}
          </p>
          <p className="ticket__group">{people >= GROUP_SIZE ? k.groupApplied : k.groupHint}</p>
          <div className="ticket__actions">
            <a className="btn btn--ink btn--block" href={whatsapp} target="_blank" rel="noreferrer">
              {k.whatsapp}
              <Arrow />
            </a>
            <a className="link" href={mail}>
              {k.email}
            </a>
            <a className="link call" href={`tel:${contact.phoneIntl}`}>
              {fill(k.call, { phone: contact.phoneDisplay })}
            </a>
          </div>
          {/* On a phone the stub follows the form, so the terms close the ticket instead */}
          <ul className="ticket__terms ticket__terms--stub">
            {k.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
}
