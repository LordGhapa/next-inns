import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

export default function Header() {
  return (
    <header className="container mx-auto flex flex-wrap items-center justify-between  px-4 py-10 text-xl md:flex-nowrap ">
      <div className="flex w-full items-center md:w-2/3">
        <Link href={"/"} className="text-tertiary-light font-black">
          Next-Inns
        </Link>
        <ul className=" ml-5 flex items-center">
          <li className="flex items-center">
            <Link href={"/auth"}>
              <FaUserCircle className="cursor-pointer " />
            </Link>
          </li>
          <li className="ml-2">
            <MdDarkMode className="cursor-pointer " />
          </li>
        </ul>
      </div>
      <ul className="mt-4 flex w-full items-center justify-between md:w-1/3 ">
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href={"/"}>Inicio</Link>
        </li>
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href={"/vagas"}>Vagas</Link>
        </li>
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href={"/contato"}>Contato</Link>
        </li>
      </ul>
    </header>
  );
}
