"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { copy, type Locale } from "@/content/copy";

const HOLD = 3200;

/** One frame holds its place while its photographs change, with a visible count and controls. */
export function Gallery({ lang }: { lang: Locale }) {
  const t = copy[lang].gallery;
  const n = t.photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const go = (step: number) => setIndex((i) => (i + step + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (frame.current) io.observe(frame.current);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setIndex((i) => (i + 1) % n);
    }, HOLD);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [paused, n]);

  return (
    <section
      id="galerie"
      className="gallery field-sun frame"
      aria-labelledby="gallery-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid12">
        <div className="gallery__copy" data-reveal-group>
          <h2 id="gallery-title" className="head" data-reveal>
            {t.title}
          </h2>
          <p className="lead" data-reveal style={{ maxWidth: "40ch" }}>
            {t.text}
          </p>
          <div className="gallery__nav" data-reveal>
            <p className="gallery__count num" aria-live="polite">
              <strong>{index + 1}</strong> {t.of} {n}
            </p>
            <p className="gallery__caption">{t.photos[index].alt}</p>
            <div className="gallery__buttons">
              <button type="button" className="round" aria-label={t.prev} onClick={() => go(-1)}>
                <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M17 10H4M9 4.5 3.5 10 9 15.5" />
                </svg>
              </button>
              <button type="button" className="round" aria-label={t.next} onClick={() => go(1)}>
                <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="gallery__figure" ref={frame}>
          <button type="button" className="gallery__frame" aria-label={t.next} onClick={() => go(1)}>
            {t.photos.map((p, i) => (
              <Image
                key={p.src}
                src={p.src}
                alt={i === index ? p.alt : ""}
                aria-hidden={i !== index}
                width={958}
                height={1198}
                sizes="(max-width: 860px) 78vw, 40vw"
                data-active={i === index}
              />
            ))}
          </button>
        </div>
      </div>
    </section>
  );
}
