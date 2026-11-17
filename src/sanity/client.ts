import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// The dataset is public: the site reads without a token. No API CDN: Next already
// caches the result ("use cache"), and the CDN can still serve the previous version
// at the moment the publish webhook asks the site to refetch.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });

export const imageBuilder = createImageUrlBuilder({ projectId, dataset });
