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
                try {
                    const res = await fetch("http://localhost:8080/login", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });

                    const data = await res.json() as UserData;
                    if (res.ok && data)
                        return {
                            id: data.id,
                            accessToken: data.accessToken,
                            email: data.email,
                            name: `${data.first_name} ${data.last_name}`,
                        }
                    return null;
                } catch (ex) {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    accessToken: user.accessToken,
                    email: user.email,
                    name: user.name,
                }
            }
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