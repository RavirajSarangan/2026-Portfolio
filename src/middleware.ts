import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const isDev = process.env.NODE_ENV === "development";

    const cspDirectives = {
        "default-src": ["'self'"],
        "script-src": ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", isDev ? "'unsafe-eval'" : "", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "blob:", "data:", "https://images.unsplash.com", "https://cdn.jsdelivr.net", "https://raw.githubusercontent.com", "https://assets.unicorn.studio"],
        "font-src": ["'self'", "data:"],
        "connect-src": ["'self'", "https://cdn.jsdelivr.net", "https://raw.githubusercontent.com", "https://storage.googleapis.com", "https://assets.unicorn.studio", isDev ? "ws:" : ""],
        "media-src": ["'self'", "https://storage.googleapis.com"],
        "worker-src": ["'self'", "blob:"],
        "object-src": ["'none'"],
        "base-uri": ["'self'"],
        "form-action": ["'self'"],
        "frame-ancestors": ["'none'"],
        "upgrade-insecure-requests": isDev ? [] : [""],
    };

    const cspHeader = Object.entries(cspDirectives)
        .map(([key, values]) => {
            const filteredValues = values.filter(Boolean).join(" ");
            return filteredValues ? `${key} ${filteredValues};` : "";
        })
        .filter(Boolean)
        .join(" ");

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", cspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set("Content-Security-Policy", cspHeader);

    return response;
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
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};
