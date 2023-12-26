import { defineField } from "sanity";

const user = {
  name: "user",
  title: "Usuário",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Verifique se o usuário é administrador",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      //   readOnly: true,
      //   hidden: true,
    }),
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      description: "Nome do usuário",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image URL",
      type: "url",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    }),
    defineField({
      name: "about",
      title: "About",
      type: "text",
      description: "Uma breve descrição sobre o usuário",
    }),
  ],
};

export default user;
