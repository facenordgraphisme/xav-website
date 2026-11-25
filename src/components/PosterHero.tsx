"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  title: string;
  sub: string;
  lede: string;
  facts: { label: string; value: string }[];
  /** `outplanners`: the link opens online booking over the page (see BookingDialog). */
  cta: { label: string; href: string; outplanners?: boolean };
  phone: { label: string; href: string };
  photo: { src: string; alt: string; position?: string; ratio?: number };
  /** Caption under the base's name on the map, e.g. "La base · Baratier". */
  base: string;
};

/**
 * The poster: sky, ridge and lake as flat fields, the title as a monument, and one
 * photograph seen through a 4:5 window that opens to the whole screen on scroll.
 */
export function PosterHero({ title, sub, lede, facts, cta, phone, photo, base }: Props) {
  const root = useRef<HTMLElement>(null);
  // Every hero photograph is a 1170 × 1463 portrait unless told otherwise
  const ratio = photo.ratio ?? 1170 / 1463;

  useGSAP(
    () => {
      const picture = root.current!.querySelector<HTMLElement>(".hero__picture")!;
      const shift = root.current!.querySelector<HTMLElement>(".hero__shift")!;
      const text = root.current!.querySelector<HTMLElement>(".hero__text")!;
      const terrain = root.current!.querySelector<HTMLElement>(".hero__terrain")!;
      // Read the window from the stylesheet, not from GSAP's inline value, so resizes stay right.
      const start = () => {
        const inline = picture.style.clipPath;
        picture.style.clipPath = "";
        const value = getComputedStyle(picture).clipPath;
        picture.style.clipPath = inline;
        return value;
      };
      // At rest the whole photograph fits the window; it grows to cover the stage as the window opens.
      // The layer is sized to the photograph's own cover box, so scaling it shows the whole picture
      // rather than a smaller crop.
      const fit = () => {
        // Browsers shorten inset() like margin shorthand (a centred window comes back with 3 values)
        const v = (start().match(/-?[\d.]+px/g) ?? []).map(parseFloat);
        const [top, right, bottom, left] = [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]];
        const W = picture.clientWidth;
        const H = picture.clientHeight;
        if ([top, right, bottom, left].some((v) => v === undefined)) return { x: 0, y: 0, scale: 1 };
        const coverW = W / H > ratio ? W : H * ratio;
        const coverH = coverW / ratio;
        const [px, py] = (photo.position ?? "50% 50%").split(" ").map((v) => parseFloat(v) / 100);
        const boxLeft = (W - coverW) * px;
        const boxTop = (H - coverH) * py;
        // Plain style writes, in this order: the inset shorthand must not land after left/top
        Object.assign(shift.style, {
          inset: "auto",
          left: `${boxLeft}px`,
          top: `${boxTop}px`,
          width: `${coverW}px`,
          height: `${coverH}px`,
          transformOrigin: "50% 50%",
        });
        const winW = W - left - right;
        const winH = H - top - bottom;
        return {
          x: left + winW / 2 - (boxLeft + coverW / 2),
          y: top + winH / 2 - (boxTop + coverH / 2),
          scale: Math.max(winW / coverW, winH / coverH),
        };
      };
      const mm = gsap.matchMedia();

      // Reduced motion: no opening, but the window still shows the whole photograph.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const place = () => gsap.set(shift, fit());
        place();
        window.addEventListener("resize", place);
        return () => {
          window.removeEventListener("resize", place);
          gsap.set(shift, { clearProps: "transform,inset,left,top,width,height" });
        };
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.95}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(picture, { clipPath: start }, { clipPath: "inset(0px 0px 0px 0px)", ease: "none", duration: 1 }, 0);
        tl.fromTo(
          shift,
          { x: () => fit().x, y: () => fit().y, scale: () => fit().scale },
          { x: 0, y: 0, scale: 1, ease: "none", duration: 1 },
          0,
        );
        tl.to(text, { yPercent: -6, opacity: 0, ease: "none", duration: 0.42 }, 0);
        // The map closes in on Baratier while the window opens
        tl.to(terrain, { scale: 1.12, ease: "none", duration: 1 }, 0);

        // The badge on the poster shrinks into its place in the header over three quarters of a screen.
        // Both ends are fixed on screen (the stage is sticky, so is the header): measure once per refresh.
        const badge = root.current!.querySelector<HTMLElement>(".hero__badge");
        const slot = document.querySelector<HTMLElement>(".site-header .brand img");
        if (badge && slot) {
          const landing = () => {
            const inline = badge.style.transform;
            badge.style.transform = "none";
            const from = badge.getBoundingClientRect();
            badge.style.transform = inline;
            const to = slot.getBoundingClientRect();
            return {
              x: to.left + to.width / 2 - (from.left + from.width / 2),
              y: to.top + to.height / 2 - (from.top + from.height / 2),
              scale: to.width / from.width,
            };
          };
          gsap.fromTo(
            badge,
            { x: 0, y: 0, scale: 1, rotation: -8 },
            {
              x: () => landing().x,
              y: () => landing().y,
              scale: () => landing().scale,
              rotation: 0,
              ease: "power1.inOut",
              scrollTrigger: { start: 0, end: () => window.innerHeight * 0.75, scrub: true, invalidateOnRefresh: true },
            },
          );
        }
        return () => gsap.set([picture, shift, terrain, badge].filter(Boolean), { clearProps: "clipPath,transform,inset,left,top,width,height" });
      });
    },
    { scope: root, dependencies: [ratio, photo.position] },
  );

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      {/* The badge pinned on the poster; it flies into the header as the page scrolls */}
      <div className="hero__badge" aria-hidden="true">
        <Image src="/logo-badge.png" alt="" width={400} height={400} sizes="(max-width: 960px) 92px, 150px" preload />
      </div>
      <div className="hero__stage">
        <div className="hero__ground" aria-hidden="true">
          {/* The real valley: 50 m contours around Embrun, Serre-Ponçon at its true shape, the base pinned */}
          <div className="hero__map">
            <div className="hero__terrain">
              <div className="hero__layer hero__contours" />
              <div className="hero__layer hero__index" />
              <div className="hero__layer hero__shore" />
              <div className="hero__layer hero__river" />
              <div className="hero__layer hero__water" />
              <span className="hero__place hero__lakename" style={{ "--x": -284, "--y": 112 } as React.CSSProperties}>
                Lac de Serre-Ponçon
              </span>
              <span className="hero__place hero__town" style={{ "--x": 142.9, "--y": -34.1 } as React.CSSProperties}>
                <span>Embrun</span>
              </span>
              <span className="hero__place hero__pin" style={{ "--x": 128.0, "--y": 84.5 } as React.CSSProperties}>
                <span>
                  <b className="wordmark">Activités Nature</b>
                  <small>{base}</small>
                </span>
              </span>
            </div>
          </div>
          <div className="hero__lake" />
        </div>

        <div className="hero__picture">
          <div className="hero__shift">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              style={{ objectPosition: photo.position }}
            />
          </div>
        </div>

        <div className="hero__text frame">
          <h1 id="hero-title" className="hero__title">
            <span className="line">
              <span className="big" data-line style={{ "--i": 0 } as React.CSSProperties}>
                {title}
              </span>
            </span>
            <span className="line">
              <span className="sub" data-line style={{ "--i": 1 } as React.CSSProperties}>
                {sub}
              </span>
            </span>
          </h1>

          <div className="hero__band">
            <p className="hero__lede" data-load style={{ "--d": "380ms" } as React.CSSProperties}>
              {lede}
            </p>
            <dl className="hero__facts num" data-load style={{ "--d": "460ms" } as React.CSSProperties}>
              {facts.map((f) => (
                <div key={f.label} style={{ display: "contents" }}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="hero__actions" data-load style={{ "--d": "540ms" } as React.CSSProperties}>
              <a className="btn" href={cta.href} data-outplanners={cta.outplanners ? "" : undefined}>
                {cta.label}
                <Arrow />
              </a>
              <a className="link" href={phone.href}>
                {phone.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
    </svg>
  );
}
