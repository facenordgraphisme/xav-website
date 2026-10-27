"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The page's quiet motion layer: smooth scroll, per-section entrances in reading
 * order, picture shutters and a slow drift on large photographs. Everything here
 * starts from content that is already visible without scripts.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced() || window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -68 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      // Entrances: the parts of a group arrive in reading order, once.
      const groups = new Map<Element, Element[]>();
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const group = el.closest("[data-reveal-group]") ?? el;
        groups.set(group, [...(groups.get(group) ?? []), el]);
      });
      groups.forEach((items, group) => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 86%", once: true },
        });
      });

      // Shutters: the picture opens from its lower edge while settling in its frame.
      document.querySelectorAll<HTMLElement>("[data-shutter]").forEach((el) => {
        const img = el.querySelector("img");
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" })
          .to(img, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
      });

      // Drift: large photographs travel a few percent inside their frames.
      document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -4 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
