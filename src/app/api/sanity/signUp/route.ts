import { client } from "@/app/libs/sanity";
import { signUpHandler } from "next-auth-sanity";
import { type SanityClient } from "sanity";

export const POST = signUpHandler(client as SanityClient);
