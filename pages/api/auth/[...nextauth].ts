import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { ExtendedSession } from '@/utils/api/types'
import prisma from '@/services/prisma'

// TODO: Deploy to vercel & test with supabase

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const extendedSession: ExtendedSession = {
        ...session,
        userId: user.id,
      }
      
      return Promise.resolve(extendedSession)
    },
  },
})
