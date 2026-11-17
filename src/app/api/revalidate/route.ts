import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/content/getSite";

// Called by the Sanity webhook on every publish: the site shows the change on the next visit.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });

  const { isValidSignature } = await parseBody(req, secret, true);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });

  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true });
}
