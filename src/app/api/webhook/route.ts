/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBooking, updateHotelRoom } from "@/app/libs/apis";

import { NextResponse } from "next/server";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/naming-convention
const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;
      console.log("SESSION =>>>", session);

      const {
        metadata: {
          // @ts-expect-error
          adults,
          // @ts-expect-error
          checkinDate,
          // @ts-expect-error
          checkoutDate,
          // @ts-expect-error
          children,
          // @ts-expect-error
          hotelRoom,
          // @ts-expect-error
          numberOfDays,
          // @ts-expect-error
          user,
          // @ts-expect-error
          discount,
          // @ts-expect-error

          totalPrice,
        },
      } = session;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      //   Update hotel Room
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await updateHotelRoom(hotelRoom);

      return NextResponse.json("Reservado com sucesso", {
        status: 200,
        statusText: "Reservado com sucesso",
      });
    default:
      console.log(` event type nao encontrado ${event.type}`);
  }

  return NextResponse.json("Event Recebido", {
    status: 200,
    statusText: "Event Recebido",
  });
}
