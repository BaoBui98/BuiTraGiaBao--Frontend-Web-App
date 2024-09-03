import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./constant/auth-name";
import { ROUTER_PAGE } from "./constant/router-page";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN);

  const loginPath = ROUTER_PAGE.LOGIN;

  if (!accessToken) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ROUTER_PAGE.USER],
};
