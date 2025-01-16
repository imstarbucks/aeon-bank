import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const userCookie = cookieStore.get("login");

  if (!userCookie || userCookie.value !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
