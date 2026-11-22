import { defineArrayMember, defineField, defineType } from "sanity";

/** Bilingual short text: one line in French, one in English. */
export const localeString = defineType({
  name: "localeString",
  title: "Texte (FR / EN)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

/** Bilingual paragraph. */
export const localeText = defineType({
  name: "localeText",
  title: "Texte long (FR / EN)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
  ],
});

/** Formatted text for long pages: headings, paragraphs, bullet lists, bold, links. */
const richText = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Paragraphe", value: "normal" },
          { title: "Titre", value: "h2" },
          { title: "Sous-titre", value: "h3" },
        ],
        lists: [{ title: "Liste à puces", value: "bullet" }],
        marks: {
          decorators: [
            { title: "Gras", value: "strong" },
            { title: "Italique", value: "em" },
          ],
          annotations: [
            defineArrayMember({
              name: "link",
              title: "Lien",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "Adresse",
                  type: "url",
                  description: "Page du site (ex. /fr/cgv), site externe (https://…) ou e-mail (mailto:…).",
                  validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                }),
              ],
            }),
          ],
        },
      }),
    ],
  });

/** Bilingual formatted text: one editor per language. */
export const localeBlocks = defineType({
  name: "localeBlocks",
  title: "Texte mis en forme (FR / EN)",
  type: "object",
  fields: [
    richText("fr", "Français"),
    richText("en", "English", "Traduction : la version française fait foi."),
  ],
});

/** A photograph with its hotspot (the part to keep in frame) and a bilingual description. */
export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description de la photo (FR / EN)",
      description: "Ce que montre la photo, en une phrase. Lu par les lecteurs d'écran et Google.",
      type: "localeString",
    }),
  ],
  preview: { select: { title: "alt.fr", media: "asset" } },
});

/** Label + value pair shown in the small fact lists. */
export const fact = defineType({
  name: "fact",
  title: "Repère",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Intitulé", type: "localeString" }),
    defineField({ name: "value", title: "Valeur", type: "localeString" }),
  ],
  preview: { select: { title: "label.fr", subtitle: "value.fr" } },
});
