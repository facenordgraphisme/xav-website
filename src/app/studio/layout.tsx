// The Studio is its own root layout: none of the site's header, fonts or motion.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
