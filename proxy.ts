import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const sessionCookieName = process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const tokenCookie = request.cookies.get(sessionCookieName)?.value;
    if (!tokenCookie)
        return NextResponse.redirect(new URL("/", request.url));

    try {
        const decryptedToken = await decode({
            token: tokenCookie,
            secret: process.env.NEXTAUTH_SECRET!,
        });

        // check for session
        if (!decryptedToken || !decryptedToken.accessToken)
            return handleAuthFailure(request);

        // check for expired session
        const now = Math.floor(Date.now() / 1000);
        if (decryptedToken.tokenExp && now > decryptedToken.tokenExp)
            return handleAuthFailure(request);

        if (request.nextUrl.pathname === "/dashboard")
            return NextResponse.redirect(new URL("/dashboard/wallet", request.url));

        return NextResponse.next();
    } catch {
        return handleAuthFailure(request);
    }
}

function handleAuthFailure(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/?reason=expired", request.url));
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*"]
};