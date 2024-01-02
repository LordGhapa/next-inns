/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );
  }

  return await stripePromise;
};
