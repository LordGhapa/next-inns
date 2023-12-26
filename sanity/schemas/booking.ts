import { defineField } from "sanity";

const booking = {
  name: "inns-booking",
  title: "Booking",
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
      name: "checkinDate",
      title: "Check-in Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkoutDate",
      title: "Check-out Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "numberOfDays",
      title: "Número de dias",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "discount",
      title: "Desconto",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "adults",
      title: "Adultos",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "children",
      title: "Crianças",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "totalPrice",
      title: "Valor Total",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
};

export default booking;
