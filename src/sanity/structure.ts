import type { StructureResolver } from "sanity/structure";
import { fixedDocuments } from "./schemaTypes";

const item = (S: Parameters<StructureResolver>[0], id: string) => {
  const doc = fixedDocuments.find((d) => d.id === id)!;
  return S.listItem().title(doc.title).id(doc.id).child(S.document().schemaType(doc.type).documentId(doc.id).title(doc.title));
};

/** One fixed entry per page and per outing, in the order a visitor meets them. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Activités Nature")
    .items([
      item(S, "settings"),
      S.divider(),
      item(S, "outing-rafting"),
      item(S, "outing-couleau"),
      item(S, "outing-fournel"),
      S.divider(),
      item(S, "homePage"),
      item(S, "raftingPage"),
      item(S, "canyoningPage"),
      item(S, "gallery"),
      item(S, "faq"),
      S.divider(),
      S.listItem()
        .title("Pages légales")
        .id("legal")
        .child(
          S.list()
            .title("Pages légales")
            .items([item(S, "legal-mentions"), item(S, "legal-privacy"), item(S, "legal-cookies"), item(S, "legal-terms")]),
        ),
    ]);
