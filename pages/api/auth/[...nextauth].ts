import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// TODO: Add database with prisma
// TODO: Deploy to vercel & test with supabase

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})
