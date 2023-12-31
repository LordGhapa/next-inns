import { defineField } from "sanity";

const review = {
  name: "inns-review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "Usuário",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hotelRoom",
      title: "Hotel Room",
      type: "reference",
      to: [{ type: "inns-hotelRoom" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Review Texto",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userRating",
      title: "Avaliação do Usuário",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("A classificação deve estar entre 1 e 5"),
    }),
  ],
};

export default review;
