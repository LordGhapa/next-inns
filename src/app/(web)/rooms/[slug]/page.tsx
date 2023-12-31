/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import { getRoom } from "@/app/libs/apis";
import useSWR from "swr";
import Loading from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery";

export default function RoomDetails(props: { params: { slug: string } }) {
  const {
    params: { slug },
  } = props;

  const fetchRoom = async () => await getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Erro ao fazer fetch da pagina rooms details");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Erro ao fazer fetch da pagina rooms details");

  if (!room) return <Loading />;
  console.log(room);

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />
    </div>
  );
}
