import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "927174478737-j3eepaue5h7ppjtocjlkeb3k66hmkp01.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    }),
  ],
})