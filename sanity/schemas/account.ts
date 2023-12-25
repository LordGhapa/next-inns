import { defineField } from "sanity";

const account = {
  name: "inns-account",
  title: "Conta",
  type: "document",
  fields: [
    defineField({
      name: "providerType",
      type: "string",
    }),
    defineField({
      name: "providerId",
      type: "string",
    }),
    defineField({
      name: "providerAccountId",
      type: "string",
    }),
    defineField({
      name: "refreshToken",
      type: "string",
    }),
    defineField({
      name: "accessToken",
      type: "string",
    }),
    defineField({
      name: "accessTokenExpires",
      type: "number",
    }),
    defineField({
      name: "user",
      title: "user",
      type: "reference",
      to: { type: "inns-user" },
    }),
  ],
};

export default account;
