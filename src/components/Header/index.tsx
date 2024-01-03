"use client";

import { useThemeContext } from "@/context/themeContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Header() {
  const { darkTheme, setDarkTheme } = useThemeContext();

  const { data: session } = useSession();

  return (
    <header className="container mx-auto flex flex-wrap items-center justify-between  px-4 py-10 text-xl md:flex-nowrap ">
      <div className="flex w-full items-center md:w-2/3">
        <Link href={"/"} className="-ml-8 font-black text-tertiary-light">
          <Image alt="logo" src={"/logo.png"} height={150} width={150} />
        </Link>
        <ul className=" ml-5 flex items-center">
          <li className="flex items-center">
            {session?.user != null ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image != null ? (
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={session.user.image}
                      alt={`imagem do usuário ${session?.user.name}
                       `}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer " />
                )}
              </Link>
            ) : (
              <Link href={"/auth"}>
                <FaUserCircle className="cursor-pointer " />
              </Link>
            )}
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer "
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer "
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className="mt-4 flex w-full items-center justify-between md:w-1/3 ">
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href={"/"}>Inicio</Link>
        </li>
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href={"/rooms"}>Vagas</Link>
        </li>
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href={"/contato"}>Contato</Link>
        </li>
      </ul>
    </header>
  );
}
