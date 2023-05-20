import User from '@models/api/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import slugify from 'slugify';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });
        console.log(profile);
        if (!userExists) {
          await User.create({
            email: profile.email,
            username:
              slugify(profile.name, { lower: true, replacement: '' }) +
              profile.exp,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
