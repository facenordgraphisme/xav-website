import { fact, localeBlocks, localeString, localeText, photo } from "./fields";
import { activityPage, faq, gallery, homePage, legalPage, outing, settings } from "./documents";

export const schemaTypes = [localeString, localeText, localeBlocks, photo, fact, settings, outing, homePage, activityPage, gallery, faq, legalPage];

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
  { id: "legal-mentions", type: "legalPage", title: "Mentions légales" },
  { id: "legal-privacy", type: "legalPage", title: "Politique de confidentialité" },
  { id: "legal-cookies", type: "legalPage", title: "Politique cookies" },
  { id: "legal-terms", type: "legalPage", title: "Conditions générales de vente" },
] as const;
