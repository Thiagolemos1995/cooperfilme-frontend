import { NextRequest, NextResponse } from "next/server";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";

// Middleware function to check access token
export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get("access_token");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  if (isLoggedIn) {
    if (isPrivateRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      const scriptsUrl = new URL("/backoffice/scripts", req.url);
      return NextResponse.redirect(scriptsUrl);
    }
  } else {
    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      const loginUrl = new URL("/backoffice/signin", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
