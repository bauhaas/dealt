// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            "http://api:3001/authentication/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          console.log(response.data.access_token);
          if (response.data) {
            const decodedToken = jwtDecode(response.data.access_token);
            return { ...decodedToken, accessToken: response.data.access_token };
          }
          return null;
        } catch (error) {
          console.error("tt");
          console.error(error);
          console.error("tt");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      console.log("User signed in:", user);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.sub;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.token = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
