import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const checkPathPublic = path === "/sign-in" || path === "/sign-up";
  const getCookies = await cookies();
  const token = getCookies.get("token")?.value || "";

  if (checkPathPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!checkPathPublic && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
};
