import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join("/");
  const url = new URL(`https://api.jolpi.ca/ergast/f1/${endpoint}`);
  request.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));

  const upstream = await fetch(url, { next: { revalidate: 3600 } });
  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
