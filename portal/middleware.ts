
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  const subdomain = hostname?.includes(".") ? hostname?.split(".")[0] : "";
console.log("host", hostname, "subdomain", subdomain);

if (subdomain) {
    const url = new URL(request.url);
    url.pathname = `/user/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
}

return NextResponse.next();
}

export const config = {
matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
