/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import { getUserBookings } from "@/app/libs/apis";
import { type User } from "@/models/user";
import axios from "axios";
import useSWR from "swr";
import Loading from "../../loading";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import Chart from "@/components/Chart/Chart";
import Table from "@/components/Table/Table";

interface Props {
  params: { id: string };
}

export default function UserDetails({ params: { id } }: Props) {
  const fetchUserBooking = async () => await getUserBookings(id);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    return data;
  };

  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "rating"
  >("bookings");

  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  const toggleRatingModal = () => {
    setIsRatingVisible((prevState) => !prevState);
  };

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbooking", fetchUserBooking);

  const {
    data: userData,
    error: errorGettingUserData,
    isLoading: loadingUserData,
  } = useSWR("api/users", fetchUserData);

  if (error || errorGettingUserData)
    throw new Error("Erro no fetch pagina users");
  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Erro no fetch pagina users");
  if (typeof userData === "undefined" && !loadingUserData)
    throw new Error("Erro no fetch pagina users");

  if (loadingUserData) return <Loading />;
  if (!userData) throw new Error("Erro no fetch pagina users");
  if (!userData) throw new Error("Erro no fetch pagina users");

  return (
    <div className="container mx-auto px-2 py-10 md:px-4 ">
      <div className="grid gap-10 md:grid-cols-12 ">
        <div className="sticky top-10 hidden h-fit rounded-lg  bg-[#eff0f2] px-6 py-4 text-black shadow-lg md:col-span-4 md:block lg:col-span-3 ">
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full md:h-[143px] md:w-[143px]">
            <Image
              src={userData.image}
              alt={userData.name}
              width={143}
              height={143}
              className="img scale-animation rounded-full"
            />
          </div>
          <div className="py-4 text-left font-normal">
            <h6 className="pb-3 text-xl font-bold">Sobre</h6>
            <p className="text-sm">{userData.about ?? ""}</p>
          </div>
          <div className="text-left font-normal">
            <h6 className="pb-3 text-xl font-bold">{userData.name}</h6>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Sair</p>
            <FaSignOutAlt
              className="cursor-pointer text-3xl"
              onClick={async () => {
                await signOut({ callbackUrl: "/" });
              }}
            />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="mr-3 text-2xl font-bold">Ola, {userData.name}</h5>
          </div>
          <div className="h-14 w-14 overflow-hidden rounded-l-full md:hidden">
            <Image
              className="img scale-animation rounded-full"
              width={56}
              height={56}
              src={userData.image}
              alt={userData.name}
            />
          </div>
          <p className="block w-fit py-2 text-sm md:hidden">
            {userData.about ?? ""}
          </p>

          <p className="py-2 text-xs font-medium">
            Criada em{" "}
            {userData._createdAt.split("T")[0].split("-").reverse().join("/")}
          </p>
          <div className="my-2 flex items-center md:hidden">
            <p className="mr-2">Sair</p>
            <FaSignOutAlt
              className="cursor-pointer text-3xl"
              onClick={async () => {
                await signOut({ callbackUrl: "/" });
              }}
            />
          </div>

          <nav className="sticky top-0 mx-auto mb-8 mt-7 w-fit rounded-lg border border-gray-200 bg-gray-50 px-2 py-3 text-gray-700 md:w-full md:px-5">
            <ol
              className={`${
                currentNav === "bookings" ? "text-blue-600" : "text-gray-700"
              } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
            >
              <li
                onClick={() => {
                  setCurrentNav("bookings");
                }}
                className="inline-flex cursor-pointer items-center"
              >
                <BsJournalBookmarkFill />
                <a className="mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm">
                  Reservas atuais
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === "amount" ? "text-blue-600" : "text-gray-700"
              } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
            >
              <li
                onClick={() => {
                  setCurrentNav("amount");
                }}
                className="inline-flex cursor-pointer items-center"
              >
                <GiMoneyStack />
                <a className="mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm">
                  Quantidade Gasta
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === "bookings" ? (
            userBookings && (
              <Table
                bookingDetails={userBookings}
                setRoomId={setRoomId}
                toggleRatingModal={toggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          {currentNav === "amount" ? (
            userBookings && <Chart userBookings={userBookings} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
