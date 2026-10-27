// Facts about the business. Prices are SAMPLES until Xavier and Patrick confirm them.

export const contact = {
  phoneDisplay: "07 66 01 05 09",
  phoneIntl: "+33766010509",
  whatsapp: "33766010509",
  email: "activites.nature@gmail.com",
  facebook: "https://www.facebook.com/natureactivites",
  address: ["Z.A. Les Portes du Lac", "05200 Baratier"],
} as const;

export const GROUP_SIZE = 3;
export const GROUP_DISCOUNT = 5;

export type OutingId = "rafting" | "couleau" | "fournel";

export const outings: Record<OutingId, { price: number; photo: string }> = {
  rafting: { price: 45, photo: "/images/rafting/rafting-09.jpg" },
  couleau: { price: 45, photo: "/images/canyoning/canyoning-05.jpg" },
  fournel: { price: 60, photo: "/images/canyoning/canyoning-06.jpg" },
};

export const outingOrder: OutingId[] = ["rafting", "couleau", "fournel"];

export const lowestPrice = Math.min(...outingOrder.map((id) => outings[id].price)) - GROUP_DISCOUNT;

export function unitPrice(id: OutingId, people: number) {
  return people >= GROUP_SIZE ? outings[id].price - GROUP_DISCOUNT : outings[id].price;
}
