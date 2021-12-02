import NextAuth from 'next-auth'
import { PrismaClient } from '.prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

// TODO: Add database with prisma
// TODO: Deploy to vercel & test with supabase

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})
