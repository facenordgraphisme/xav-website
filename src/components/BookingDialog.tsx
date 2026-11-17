"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Online booking through Outplanners, over the page. Any link carrying
 * `data-outplanners` and pointing at an Outplanners public page opens here instead
 * of navigating; without JavaScript it stays a plain link to that page.
 * Same contract as Outplanners' embed.js (`?embed=1`, `easybooking:close` message),
 * but delegated on the document so links rendered after a client navigation work too.
 */
export function BookingDialog({ title, close }: { title: string; close: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-outplanners]");
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      e.preventDefault();
      url.searchParams.set("embed", "1");
      setSrc(url.toString());
      dialog.current?.showModal();
      document.documentElement.classList.add("booking-open");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!src) return;
    const origin = new URL(src).origin;
    const onMessage = (e: MessageEvent) => {
      if (e.origin === origin && e.data && typeof e.data === "object" && e.data.type === "easybooking:close") dialog.current?.close();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [src]);

  return (
    <dialog
      ref={dialog}
      className="booking"
      aria-label={title}
      data-lenis-prevent
      onClose={() => {
        document.documentElement.classList.remove("booking-open");
        setSrc(null);
      }}
      // A click on the backdrop lands on the <dialog> itself
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="booking__frame">
        <button type="button" className="booking__close" aria-label={close} onClick={() => dialog.current?.close()}>
          <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
        {src && <iframe src={src} title={title} allow="payment" />}
      </div>
    </dialog>
  );
}
