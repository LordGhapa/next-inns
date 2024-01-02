/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { type Dispatch, type SetStateAction } from "react";

interface Props {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  price: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  specialNote: string;
  isBooked: boolean;
  handleBookNowClick: () => void;
}

export default function BookRoomCta({
  price,
  discount,
  specialNote,
  checkinDate,
  setCheckinDate,
  checkoutDate,
  setCheckoutDate,
  calcMinCheckoutDate,
  setAdults,
  setNoOfChildren,
  adults,
  noOfChildren,
  isBooked,
  handleBookNowClick,
}: Props) {
  const discountPrice = price - (price / 100) * discount;

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();

    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className="px-7 py-6 ">
      <h3>
        <span
          className={`${
            discount !== 0 ? "text-gray-400" : ""
          } text-xl font-bold `}
        >
          R$ {price}/Dia
        </span>
        {discount !== 0 ? (
          <span className="text-xl font-bold">
            {" "}
            | desconto {discount}% Apenas por :{" "}
            <span className="text-tertiary-dark">R$ {discountPrice}/Dia</span>
          </span>
        ) : (
          ""
        )}
      </h3>
      <div className="my-2 w-full border-b-2 border-b-secondary" />
      <h4 className="my-8 ">{specialNote}</h4>
      <div className="flex gap-1">
        <div className="w-1/2  ">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Data de Entrada
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => {
              setCheckinDate(date);
            }}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="w-1/2  ">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Data de Saida
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => {
              setCheckoutDate(date);
            }}
            dateFormat="dd/MM/yyyy"
            minDate={calcMinCheckoutDate()}
            disabled={!checkinDate}
            id="check-out-date"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-1 ">
        <div className="w-1/2  ">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adultos
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => {
              setAdults(Number(e.target.value));
            }}
            min={1}
            max={5}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 "
          />
        </div>
        <div className="w-1/2  ">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Crianças
          </label>
          <input
            type="number"
            id="children"
            value={noOfChildren}
            onChange={(e) => {
              setNoOfChildren(Number(e.target.value));
            }}
            min={1}
            max={5}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 "
          />
        </div>
      </div>
      {calcNoOfDays() > 0 ? (
        <p className="mt-3"> Valor Total R$ {calcNoOfDays() * discountPrice}</p>
      ) : (
        <></>
      )}
      <button
        disabled={isBooked}
        onClick={handleBookNowClick}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        {isBooked ? (
          <span>Não Disponível</span>
        ) : (
          <span className="text-sm">Reserve Agora</span>
        )}
      </button>
    </div>
  );
}
