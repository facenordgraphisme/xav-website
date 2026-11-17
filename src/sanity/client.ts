import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// The dataset is public: the site reads without a token.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });

export const imageBuilder = createImageUrlBuilder({ projectId, dataset });
