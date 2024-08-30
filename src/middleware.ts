import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./constant/auth-name";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN);

  const loginPath = "/login";

  if (!accessToken) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
