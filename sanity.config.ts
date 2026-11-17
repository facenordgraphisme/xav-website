"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "activites-nature",
  title: "Activités Nature",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Pages and outings are fixed: nothing to create from the "+" menu
    templates: () => [],
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    newDocumentOptions: () => [],
    actions: (prev) => prev.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish"),
  },
});
