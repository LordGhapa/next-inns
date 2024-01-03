"use client";
import Image from "next/image";
import CountUpNumber from "../CountUpNumber";
import { useRouter } from "next/navigation";
export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="container mx-auto flex items-center gap-12 px-4 ">
      <div className="h-full py-10 ">
        <h1 className="font-heading mb-6 ">
          Encontre o hotel perfeito para sua viagem
        </h1>
        <p className="mb-12 max-w-lg text-[#4a4a4a] dark:text-[#fff] ">
          Reserve seu hotel com a maior facilidade e segurança
        </p>
        <button
          className="btn-primary"
          onClick={() => {
            router.push(`/rooms`);
          }}
        >
          Reserve agora
        </button>

        <div className="mt-12 flex justify-between ">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Quarto Básico</p>
            <CountUpNumber duration={3000} endValue={50} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Quarto de Luxo</p>
            <CountUpNumber duration={3000} endValue={20} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Suíte</p>
            <CountUpNumber duration={3000} endValue={60} />
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-1 gap-8 md:grid ">
        <div className="h-48 overflow-hidden rounded-2xl">
          <Image
            src={"/images/hero-1.jpeg"}
            alt="hero hotel image"
            width={300}
            height={300}
            className="img scale-animation "
          />
        </div>
        <div className="grid h-48 grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-xl">
            <Image
              src={"/images/hero-2.jpeg"}
              alt="hero hotel image"
              width={300}
              height={300}
              className="img scale-animation "
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <Image
              src={"/images/hero-3.jpeg"}
              alt="hero hotel image"
              width={300}
              height={300}
              className="img scale-animation "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
