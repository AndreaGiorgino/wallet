import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import SessionUser from "./SessionUser"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.API_URL}/login`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })

                    const data = await res.json() as SessionUser
                    if (res.ok && data) {
                        const base64Url = data.accessToken.split(".")[1]
                        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
                        const payload = JSON.parse(atob(base64))

                        return {
                            id: data.id,
                            accessToken: data.accessToken,
                            tokenExp: payload.exp,
                            email: data.email,
                            name: `${data.first_name} ${data.last_name}`,
                        }
                    }
                    return null
                } catch (ex) {
                    return null
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
                    tokenExp: user.tokenExp,
                    email: user.email,
                    name: user.name,

                }
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        },
    },
}