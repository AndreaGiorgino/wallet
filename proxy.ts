import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
    pages: {
        signIn: "/",
    },
});

export default function proxy(req: NextRequestWithAuth, event: any) {
    return authMiddleware(req, event);
}

export const config = {
    matcher: ["/dashboard/:path*"]
};