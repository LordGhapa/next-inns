"use client";

import { type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { type Booking } from "@/models/booking";

interface Props {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
}

export default function Table({
  bookingDetails,
  setRoomId,
  toggleRatingModal,
}: Props) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[340px] overflow-x-auto rounded-lg shadow-md sm:rounded-lg md:max-w-full">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Quarto</th>
            <th className="px-6 py-3">Preço Normal</th>
            <th className="px-6 py-3">Gasto</th>
            <th className="px-6 py-3">Desconto</th>
            <th className="px-6 py-3">Dias Reservados</th>
            {/* <th className="px-6 py-3">Dias Restantes</th> */}
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((booking) => (
            <tr
              key={booking._id}
              className="border-b bg-white hover:bg-gray-50"
            >
              <th
                onClick={() => {
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`);
                }}
                className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium text-blue-600 underline"
              >
                {booking.hotelRoom.name}
              </th>
              <td className="px-6 py-4">{booking.hotelRoom.price}</td>
              <td className="px-6 py-4">{booking.totalPrice}</td>
              <td className="px-6 py-4">{booking.discount}</td>
              <td className="px-6 py-4">{booking.numberOfDays}</td>
              {/* TO DO DIAS RESTANTES
              <td className="px-6 py-4">0</td> */}
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setRoomId(booking.hotelRoom._id);
                    toggleRatingModal();
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Nota
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
