import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const jwtCookie = request.cookies.get("myTokenName");
  const jwt = jwtCookie && jwtCookie.value; // Obtener el valor de la cookie

    if (jwt === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  
  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/products/:path*'],
};