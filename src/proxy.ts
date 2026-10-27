import { NextResponse, type NextRequest } from "next/server";

const locales = ["fr", "en"];

// Sends visitors without a locale in the URL to French, or English when the browser prefers it.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accept = request.headers.get("accept-language") ?? "";
  const locale = !accept || /\bfr\b/i.test(accept) ? "fr" : "en";

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|images|logo|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
