// Project id and dataset are public identifiers: defaults keep the site reading
// Sanity even where no env var is set (Vercel previews, local clones).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rhhpyv3a";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
