/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import { getRoom } from "@/app/libs/apis";
import useSWR from "swr";
import Loading from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery";

import { MdOutlineCleaningServices } from "react-icons/md";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCta from "@/components/BookRoomCta";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getStripe } from "@/app/libs/stripe";
import RoomReview from "@/components/RoomReview";

export const dynamic = "force-dynamic";

export default function RoomDetails(props: { params: { slug: string } }) {
  const {
    params: { slug },
  } = props;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [noOfChildren, setNoOfChildren] = useState<number>(0);

  const fetchRoom = async () => await getRoom(slug);
  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
  if (error) throw new Error("Erro ao fazer fetch da pagina rooms details");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Erro ao fazer fetch da pagina rooms details");
  if (!room) return <Loading />;
  if (isLoading) return <Loading />;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);

      return nextDay;
    }
    return null;
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();

    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Coloque data de Entrada e Saida");

    if (checkinDate > checkoutDate)
      return toast.error("Coloque um valor Valido");

    const numberOfDays = calcNumDays();

    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Falha ao Tenta fazer pagamento");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Ocorreu um Error | Verifique se esta logado");
    }
  };

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />
      <div className="container mx-auto mt-20 ">
        <div className="gap-10 px-3 lg:grid lg:grid-cols-12">
          <div className="md:col-span-8 md:w-full ">
            <div>
              <h2 className="text-left text-lg font-bold md:text-2xl ">
                {room.name}({room.dimension})
              </h2>
              <div className="my-11 flex ">
                {room.offeredAmenities.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="mr-3 grid h-20 w-fit place-content-center rounded-lg bg-[#eff0f2] px-2 text-center dark:bg-gray-800 md:h-40 md:w-44 md:px-0"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="pt-3 text-xs md:text-base">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-11 ">
                <h2 className="mb-2 text-3xl font-bold ">Descrição</h2>
                <p>{room.description}</p>
              </div>
              <div className="mb-11 ">
                <h2 className="mb-2 text-3xl font-bold ">
                  Comodidades oferecidas
                </h2>
                <div className="grid grid-cols-2 ">
                  {room.offeredAmenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="my-1 flex items-center md:my-0"
                    >
                      <i className={`fa-solid ${amenity.icon}`}></i>
                      <p className="ml-2 text-xs md:text-base">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-11">
                <h2 className="mb-2 text-3xl font-bold">Segurança e Higiene</h2>
                <div className="grid grid-cols-2">
                  <div className="my-1 flex items-center md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 text-xs md:text-base">Limpeza Diária</p>
                  </div>
                  <div className="my-1 flex items-center md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 text-xs md:text-base">
                      Extintores de incêndio
                    </p>
                  </div>
                  <div className="my-1 flex items-center md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 text-xs md:text-base">
                      Desinfecções e Esterilizações
                    </p>
                  </div>
                  <div className="my-1 flex items-center md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 text-xs md:text-base">
                      Detectores de fumaça
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 shadow dark:shadow-white ">
                <div className="mb-4 items-center ">
                  <p className="font-semibold md:text-lg ">
                    Reviews dos Consumidores
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2  ">
                  <RoomReview roomId={room._id} slug={slug} />
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-10 h-fit overflow-auto rounded-xl shadow-lg dark:shadow dark:shadow-white  md:col-span-4 ">
            <BookRoomCta
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              calcMinCheckoutDate={calcMinCheckoutDate}
              adults={adults}
              setAdults={setAdults}
              noOfChildren={noOfChildren}
              setNoOfChildren={setNoOfChildren}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              handleBookNowClick={handleBookNowClick}
              isBooked={room.isBooked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
