import { type SanityClient } from "sanity";
import { client } from "@/app/libs/sanity";
import { signUpHandler } from "next-auth-sanity";

export const POST = signUpHandler(client as SanityClient);
