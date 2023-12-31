/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from "axios";

import useSWR from "swr";

import { type Review } from "@/models/review";
import Rating from "../Rating";

interface Props {
  roomId: string;
  slug: string;
}
export const dynamic = "force-dynamic";

export default function RoomReview({ roomId, slug }: Props) {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${slug}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR("/api/room-reviews", fetchRoomReviews);

  if (error) throw new Error("Cannot fetch data");
  if (typeof roomReviews === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  const reviewDate = roomReviews?.filter(
    (el) => el.hotelRoom.slug.current === slug,
  );

  return (
    <>
      {reviewDate?.map((review) => (
        <div
          className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
          key={`${review._id} ${review.user.name}`}
        >
          <div className="mb-2 flex font-semibold">
            <p>{review.user.name}</p>
            <div className="ml-4 flex items-center text-lg text-tertiary-light">
              <Rating rating={review.userRating} />
            </div>
          </div>

          <p>{review.text}</p>
        </div>
      ))}
    </>
  );
}
