import { fact, localeString, localeText, photo } from "./fields";
import { activityPage, faq, gallery, homePage, outing, settings } from "./documents";

export const schemaTypes = [localeString, localeText, photo, fact, settings, outing, homePage, activityPage, gallery, faq];

/** Every document has a fixed id: editors fill them in, they never create or delete them. */
export const fixedDocuments = [
  { id: "settings", type: "settings", title: "Coordonnées et tarifs" },
  { id: "homePage", type: "homePage", title: "Page d'accueil" },
  { id: "raftingPage", type: "activityPage", title: "Page Rafting" },
  { id: "canyoningPage", type: "activityPage", title: "Page Canyoning" },
  { id: "outing-rafting", type: "outing", title: "Sortie — Rafting" },
  { id: "outing-couleau", type: "outing", title: "Sortie — Canyon du Couleau" },
  { id: "outing-fournel", type: "outing", title: "Sortie — Canyon du Fournel" },
  { id: "gallery", type: "gallery", title: "Galerie photo" },
  { id: "faq", type: "faq", title: "Bon à savoir (FAQ)" },
] as const;
