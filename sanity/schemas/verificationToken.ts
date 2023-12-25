import { defineField } from "sanity";

const verificationToken = {
  name: "inns-verification-token",
  title: "Verification Token",
  type: "document",
  fields: [
    defineField({
      name: "identifier",
      title: "ID",
      type: "string",
    }),
    defineField({
      name: "token",
      title: "Token",
      type: "string",
    }),
    defineField({
      name: "expires",
      title: "Expira",
      type: "datetime",
    }),
  ],
};

export default verificationToken;
