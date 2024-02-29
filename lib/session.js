import { getServerSession } from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import jsonwebtoken from "jsonwebtoken"
import { createUser, getUser } from "./actions"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "promedia",
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      )

      return encodedToken
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token, secret)
      return decodedToken
    }
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg"
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email
      try {
        const data = await getUser(email)
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user
          }
        }
        return newSession
      } catch (error) {
        console.error("Error retrieving user data: ", error.message)
        return session
      }
    },
    async signIn({ user }) {
      try {
        const userExists = await getUser(user?.email)

        if (userExists.rowCount === 0) {
          createUser(user.email, user.name, user.image)
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message)
        return false
      }
    }
  }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session
}
