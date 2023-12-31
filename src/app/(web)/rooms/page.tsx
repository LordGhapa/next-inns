/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import { getRooms } from "@/app/libs/apis";
import RoomCard from "@/components/RoomCard/RoomCard";
import Search from "@/components/Search";
import { type Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Rooms() {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");
    console.log();

    if (roomType != null) setRoomTypeFilter(roomType);
    if (searchQuery != null) setSearchQuery(searchQuery);

    return () => {};
  }, []);

  async function fetchData() {
    return await getRooms();
  }

  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);

  if (error) throw new Error("Erro ao fazer fetch da pagina rooms");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Erro ao fazer fetch da pagina rooms");

  const filterRooms = (rooms: Room[]) => {
    console.log(rooms);

    return rooms.filter((room) => {
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };
  const filteredRooms = filterRooms(data || []);

  return (
    <div className="container mx-auto pt-10 ">
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />
      <div className="mt-20 flex flex-wrap justify-between ">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}
