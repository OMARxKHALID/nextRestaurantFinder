import NextAuth from "next-auth";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/models/user";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      return session;
    },
    async signIn({ user, profile, account }) {
      try {
        await connectDB();
        const result = await User.findOne({ email: profile?.email });
        if (!result) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: user?.image,
          });
        }
        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
