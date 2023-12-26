/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { type NextAuthOptions } from "next-auth";
import { SanityCredentials, SanityAdapter } from "next-auth-sanity";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import { client } from "../../../sanity/lib/client";
import { client } from "./sanity";
import { type SanityClient } from "sanity";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(client as SanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(client as SanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  // para adicionar informaçoes adicionais
  callbacks: {
    session: async ({ session, token }) => {
      const userEmail = token.email;
      const userIdObj = await client.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail },
      );
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj._id,
        },
      };
    },
  },
};
