import { outingOrder, type OutingId } from "./site";

// Client-safe: shared by server pages and client components (no Sanity import here).

export type Photo = { src: string; alt: string; position?: string; ratio?: number };

/** Business facts the client components need (serialisable). */
export type Facts = {
  contact: { phoneDisplay: string; phoneIntl: string; whatsapp: string; email: string; facebook: string; address: string[] };
  groupSize: number;
  groupDiscount: number;
  prices: Record<OutingId, number>;
};

export const unitPrice = (facts: Facts, id: OutingId, people: number) =>
  people >= facts.groupSize ? facts.prices[id] - facts.groupDiscount : facts.prices[id];

export const lowestPrice = (facts: Facts) => Math.min(...outingOrder.map((id) => facts.prices[id])) - facts.groupDiscount;

export const money = (n: number, lang: "fr" | "en") => (lang === "fr" ? `${n} €` : `€${n}`);
