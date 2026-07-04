import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import UserData from "./UserData";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const res = await fetch("http://localhost:8080/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json()
                if (res.ok && data)
                    return data as UserData;
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user)
                token.accessToken = user.accessToken;
            return token;
        },
        async session({ session, token }) {
            if (token)
                session.accessToken = token.accessToken;
            return session;
        },
    },
});

export { handler as GET, handler as POST };