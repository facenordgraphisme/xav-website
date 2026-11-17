import { defineArrayMember, defineField, defineType } from "sanity";

const seo = [
  defineField({ name: "metaTitle", title: "Titre Google", type: "localeString", group: "seo" }),
  defineField({ name: "metaDescription", title: "Description Google", type: "localeText", group: "seo" }),
];
const groups = [
  { name: "content", title: "Contenu", default: true },
  { name: "seo", title: "Référencement" },
];

export const settings = defineType({
  name: "settings",
  title: "Coordonnées et tarifs",
  type: "document",
  fields: [
    defineField({ name: "phoneDisplay", title: "Téléphone (affiché)", type: "string", description: "Ex. 07 66 01 05 09" }),
    defineField({ name: "phoneIntl", title: "Téléphone (format international)", type: "string", description: "Ex. +33766010509 — utilisé pour les liens d'appel" }),
    defineField({ name: "whatsapp", title: "Numéro WhatsApp", type: "string", description: "Chiffres seulement, avec l'indicatif : 33766010509" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "facebook", title: "Page Facebook", type: "url" }),
    defineField({ name: "addressLine1", title: "Adresse — ligne 1", type: "string" }),
    defineField({ name: "addressLine2", title: "Adresse — ligne 2", type: "string" }),
    defineField({
      name: "groupSize",
      title: "Tarif groupe : à partir de combien de personnes",
      type: "number",
      validation: (r) => r.integer().min(2),
    }),
    defineField({
      name: "groupDiscount",
      title: "Tarif groupe : réduction par personne (€)",
      type: "number",
      validation: (r) => r.min(0),
    }),
  ],
  preview: { prepare: () => ({ title: "Coordonnées et tarifs" }) },
});

export const outing = defineType({
  name: "outing",
  title: "Sortie",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "localeString" }),
    defineField({ name: "short", title: "Nom court (formulaire)", type: "localeString" }),
    defineField({ name: "price", title: "Prix par personne (€)", type: "number", validation: (r) => r.min(0) }),
    defineField({
      name: "bookingUrl",
      title: "Lien de réservation Outplanners",
      description:
        "Adresse de la page publique de cette activité sur Outplanners, ex. https://www.outplanners.com/r/activites-nature/rafting. Les boutons « Réserver » ouvrent alors la réservation en ligne par-dessus le site. Laisser vide pour garder la demande par WhatsApp ou e-mail.",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"] }).custom((value) => {
          if (!value) return true;
          try {
            return /^\/r\/[^/]+\/[^/]+\/?$/.test(new URL(value).pathname)
              ? true
              : "Collez le lien d'une activité : il ressemble à https://www.outplanners.com/r/votre-structure/votre-activite";
          } catch {
            return "Lien invalide";
          }
        }),
    }),
    defineField({ name: "photo", title: "Photo", type: "photo" }),
    defineField({ name: "place", title: "Lieu · niveau", type: "localeString" }),
    defineField({ name: "who", title: "Pour qui", type: "localeString", description: "Ex. Dès 7 ans" }),
    defineField({ name: "level", title: "Niveau", type: "localeString" }),
    defineField({ name: "where", title: "Lieu", type: "localeString" }),
    defineField({ name: "text", title: "Description", type: "localeText" }),
    defineField({ name: "safety", title: "Sécurité", type: "localeText" }),
  ],
  preview: { select: { title: "name.fr", subtitle: "price", media: "photo" }, prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle != null ? `${subtitle} € / pers.` : undefined, media }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Page d'accueil",
  type: "document",
  groups,
  fields: [
    ...seo,
    defineField({ name: "heroTitle", title: "Grand titre", type: "localeString", group: "content" }),
    defineField({ name: "heroSub", title: "Sous-titre", type: "localeString", group: "content" }),
    defineField({ name: "heroLede", title: "Accroche", type: "localeText", group: "content" }),
    defineField({ name: "heroPhoto", title: "Photo d'ouverture", type: "photo", group: "content", description: "Format portrait de préférence." }),
    defineField({ name: "outingsTitle", title: "Sorties — titre", type: "localeString", group: "content" }),
    defineField({ name: "outingsText", title: "Sorties — texte", type: "localeText", group: "content" }),
    defineField({
      name: "ritual",
      title: "Déroulé d'une sortie (4 étapes)",
      type: "array",
      group: "content",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "verb", title: "Verbe", type: "localeString" }),
            defineField({ name: "text", title: "Texte", type: "localeText" }),
            defineField({ name: "photo", title: "Photo", type: "photo" }),
          ],
          preview: { select: { title: "verb.fr", subtitle: "text.fr", media: "photo" } },
        }),
      ],
    }),
    defineField({ name: "guidesTitle", title: "Les guides — titre", type: "localeString", group: "content" }),
    defineField({ name: "guidesLead", title: "Les guides — présentation", type: "localeText", group: "content" }),
    defineField({ name: "guidesNote", title: "Les guides — légende de la photo", type: "localeText", group: "content" }),
    defineField({ name: "guidesPhoto", title: "Les guides — photo", type: "photo", group: "content" }),
    defineField({ name: "guidesFacts", title: "Les guides — repères", type: "array", group: "content", of: [defineArrayMember({ type: "fact" })] }),
  ],
  preview: { prepare: () => ({ title: "Page d'accueil" }) },
});

export const activityPage = defineType({
  name: "activityPage",
  title: "Page activité",
  type: "document",
  groups,
  fields: [
    ...seo,
    defineField({ name: "title", title: "Grand titre", type: "localeString", group: "content" }),
    defineField({ name: "sub", title: "Sous-titre", type: "localeString", group: "content" }),
    defineField({ name: "lede", title: "Accroche", type: "localeText", group: "content" }),
    defineField({ name: "heroPhoto", title: "Photo d'ouverture", type: "photo", group: "content", description: "Format portrait de préférence." }),
    defineField({ name: "statement", title: "Phrase forte", type: "localeText", group: "content" }),
    defineField({ name: "text", title: "Texte", type: "localeText", group: "content" }),
    defineField({ name: "detailPhotos", title: "Deux photos à côté du texte", type: "array", group: "content", validation: (r) => r.max(2), of: [defineArrayMember({ type: "photo" })] }),
    defineField({
      name: "ritualPhotos",
      title: "Photos du déroulé (4, dans l'ordre des étapes)",
      description: "Laisser vide pour reprendre celles de la page d'accueil.",
      type: "array",
      group: "content",
      validation: (r) => r.max(4),
      of: [defineArrayMember({ type: "photo" })],
    }),
  ],
  preview: { select: { title: "title.fr" } },
});

export const gallery = defineType({
  name: "gallery",
  title: "Galerie photo",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "text", title: "Texte", type: "localeText" }),
    defineField({ name: "photos", title: "Photos", type: "array", of: [defineArrayMember({ type: "photo" })], options: { layout: "grid" } }),
  ],
  preview: { prepare: () => ({ title: "Galerie photo" }) },
});

export const faq = defineType({
  name: "faq",
  title: "Bon à savoir (FAQ)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "qa",
          fields: [
            defineField({ name: "q", title: "Question", type: "localeString" }),
            defineField({ name: "a", title: "Réponse", type: "localeText" }),
          ],
          preview: { select: { title: "q.fr", subtitle: "a.fr" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Bon à savoir (FAQ)" }) },
});
