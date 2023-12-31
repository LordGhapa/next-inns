"use client";
import { useRouter } from "next/navigation";
import { type ChangeEvent } from "react";

interface Props {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
}

export default function Search({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}: Props) {
  const router = useRouter();

  const handleRoomTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(e.target.value);
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className="rounded-lg bg-tertiary-light px-4 py-6 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 ">
        <div className="mb-4 w-full md:mb-0 md:w-1/3 lg:w-auto ">
          <label
            htmlFor=""
            className="mb-2 block text-sm font-medium text-black "
          >
            Tipo de Quarto
          </label>
          <div className="relative ">
            <select
              value={roomTypeFilter}
              onChange={handleRoomTypeChange}
              className="w-full rounded px-4 py-2 capitalize leading-tight focus:outline-none dark:bg-black "
            >
              <option value="All">Todos</option>
              <option value="Basico">Básico</option>
              <option value="Luxo">Luxo</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
        <div className="mb-4 w-full md:mb-0  md:w-1/3 lg:w-auto ">
          <label className="mb-2 block text-sm font-medium text-black ">
            Pesquisar
          </label>
          <input
            type="search"
            id="search"
            placeholder="Pesquisar..."
            className="w-full rounded px-4 py-3 leading-tight placeholder:text-black focus:outline-none dark:bg-black dark:placeholder:text-white"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <button
          className="btn-primary"
          type="button"
          onClick={handleFilterClick}
        >
          Pesquisar
        </button>
      </div>
    </section>
  );
}
