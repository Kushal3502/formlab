import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const user = await auth();
  const url = request.nextUrl;

  if (user && url.pathname.startsWith("/api/auth"))
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (
    !user &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/builder") ||
      url.pathname.startsWith("/form") ||
      url.pathname.startsWith("/view"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
