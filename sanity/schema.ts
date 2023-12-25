import account from "./schemas/account";
import booking from "./schemas/booking";
import hotelRoom from "./schemas/hotelRoom";
import review from "./schemas/review";
import user from "./schemas/user";
import verificationToken from "./schemas/verificationToken";

import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, account, booking, hotelRoom, review, verificationToken],
};
