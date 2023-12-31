import Link from "next/link";
import { BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link href="/" className=" font-black text-tertiary-dark">
          {/* NEXT-INNS */}
          <Image
            alt="logo"
            src={"/logo.png"}
            height={150}
            width={150}
            className="-ml-8"
          />
        </Link>

        <h4 className="py-6 text-[40px] font-semibold">Contato</h4>

        <div className="flex flex-col flex-wrap justify-between gap-16 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p>R. dos bobos n° 0</p>
            <div className="flex items-center py-4">
              <FaLinkedinIn />
              <Link
                href={"https://www.linkedin.com/in/felipe-lacerda-oliveira/"}
                target="_blank"
                className="ml-2 border-b  border-tertiary-light transition-all duration-300 hover:scale-110 hover:border-b hover:border-tertiary-dark"
              >
                Felipe Lacerda
              </Link>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">000-000-00</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail />
              <p className="ml-2">Felipe Lacerda</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 md:text-right">
            <p>Nossa História</p>
            <p>Entrar em contato</p>
            <p>Nosso compromisso de privacidade</p>
            <p>Termos de serviço</p>
            <p>Assistência ao Cliente</p>
          </div>
        </div>
      </div>

      <div className="bottom-0  mt-16  flex h-10 w-full items-center justify-center bg-tertiary-light md:h-[70px]">
        <Link
          href={"https://www.linkedin.com/in/felipe-lacerda-oliveira/"}
          target="_blank"
          className=" ml-2  text-black transition-all duration-300 hover:scale-110 "
        >
          Felipe Lacerda
        </Link>
      </div>
    </footer>
  );
}
