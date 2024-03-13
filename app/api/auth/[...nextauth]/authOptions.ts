import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/utils/database/databse";
import User from "@/utils/database/model/user";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { SigninValidation } from "@/lib/validation/index";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text", placeholder: "test@test.com" },
        password: { type: "password", placeholder: "Pa$$w0rd" },
      },
      async authorize(credentials, req) {
        console.log(credentials, "credentials from authorize");

        const { email, password } = SigninValidation.parse(credentials);
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);

        if (!isPasswordValid) return null;
        console.log(user);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
