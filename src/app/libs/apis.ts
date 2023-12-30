/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  type UpdateReviewDto,
  type CreateReviewDto,
  type Review,
} from "./../models/review";
import axios from "axios";

import { client } from "./sanity";
import * as queries from "./sanityQueries";
import { type CreateBookingDto, type Room } from "../models/room";
import { type Booking } from "../models/booking";

export async function getFeaturedRoom() {
  const result = await client.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: "force-cache" },
    // {next:{revalidate:1800} }, //30 min pode substituir a ultima linha 15
    //   { cache: "no-cache" } //30 min pode substituir a ultima linha 15
  );

  return result;
}

export async function getRooms() {
  const result = await client.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getRoom(slug: string) {
  const result = await client.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" },
  );

  return result;
}

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "inns-booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-12-25/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );

  return data;
};

export const updateHotelRoom = async (hotelRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-12-25/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );

  return data;
};

export async function getUserBookings(userId: string) {
  const result = await client.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: "no-cache" },
  );

  return result;
}

export async function getUserData(userId: string) {
  const result = await client.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" },
  );

  return result;
}

export async function checkReviewExists(
  userId: string,
  hotelRoomId: string,
): Promise<null | { _id: string }> {
  const query = `*[_type == 'inns-review' && user._ref == $userId && inns-hotelRoom._ref == $inns-hotelRoomId][0] {
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await client.fetch(query, params);

  return result || null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-12-25/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );

  return data;
};

export const createReview = async ({
  hotelRoomId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "review",
          user: {
            _type: "reference",
            _ref: userId,
          },
          hotelRoom: {
            _type: "reference",
            _ref: hotelRoomId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-12-25/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );

  return data;
};

export async function getRoomReviews(roomId: string) {
  const result = await client.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: "no-cache" },
  );

  return result;
}
