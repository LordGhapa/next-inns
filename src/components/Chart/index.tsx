"use client";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { type Booking } from "@/models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

interface Props {
  userBookings: Booking[];
}

export default function Chart({ userBookings }: Props) {
  const labels = userBookings.map((booking) => booking.hotelRoom.name);
  const amountSpent = userBookings.map((booking) => booking.totalPrice);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Quantidade Gasta",
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: "#F27405",
            hoverBackgroundColor: "#F2C641",
          },
        ],
      }}
    />
  );
}
