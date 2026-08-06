import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          plan: user.plan,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = (user as any).id
      token.role = (user as any).role
      token.plan = (user as any).plan
    }
    return token
  },

  async session({ session, token }) {
    if (session.user) {
      ;(session.user as any).id = (token as any).id
      ;(session.user as any).role = (token as any).role
      ;(session.user as any).plan = (token as any).plan
    }
    return session
  },
},

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }