import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string | null> {
  const username = process.env.OPENF1_USERNAME;
  const password = process.env.OPENF1_PASSWORD;
  if (!username || !password) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;

  const res = await fetch("https://api.openf1.org/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password })
  });
  if (!res.ok) return null;

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) return null;
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000
  };
  return cachedToken.token;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join("/");
  const url = new URL(`https://api.openf1.org/v1/${endpoint}`);
  request.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));

  const token = await getToken();
  const headers: HeadersInit = token ? { authorization: `Bearer ${token}` } : {};
  const upstream = await fetch(url, { headers, next: { revalidate: 5 } });
  const body = await upstream.text();

  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "s-maxage=5, stale-while-revalidate=30"
    }
  });
}
