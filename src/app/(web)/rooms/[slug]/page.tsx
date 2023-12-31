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

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />
      <div className="container mx-auto mt-20 ">
        <div className="gap-10 px-3 md:grid md:grid-cols-12">
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
                  {/* review */}
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-10 h-fit overflow-auto rounded-xl shadow-lg dark:shadow dark:shadow-white md:col-span-4 ">
            {/* book room cta */}
          </div>
        </div>
      </div>
    </div>
  );
}
