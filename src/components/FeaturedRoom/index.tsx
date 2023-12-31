import { type Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";

interface Props {
  featuredRoom: Room;
}
export default function FeatureRoom({ featuredRoom }: Props) {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-10 md:flex-row">
      <div className="grid-cols-1 gap-8 md:grid ">
        <div className="mb-4 h-48 overflow-hidden rounded-2xl md:mb-0">
          <Image
            alt={featuredRoom.name}
            src={featuredRoom.coverImage.url}
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>
        <div className="grid h-48 grid-cols-2 gap-8">
          {featuredRoom.images.splice(1, 2).map((image) => (
            <div key={image._key} className="overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt={image._key}
                width={300}
                height={300}
                className="img scale-animation"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-left md:w-1/2 md:py-10">
        <h3 className="font-heading mb-12">Quarto em Destaque</h3>

        <p className="max-w-md font-normal">{featuredRoom.description}</p>

        <div className="mt-5 flex flex-col justify-between md:flex-row md:items-end">
          <div className="mb-3 flex md:mb-0">
            <div className="mr-4 flex flex-col items-center justify-center gap-3">
              <p className="text-center text-xs lg:text-xl">Diária</p>
              <p className="flex text-lg font-medium md:font-bold xl:text-5xl">
                R$ {featuredRoom.price}
              </p>
            </div>
            <div className="mr-4 flex flex-col items-center justify-center gap-3">
              <p className="text-center text-xs lg:text-xl">Desconto</p>
              <p className="flex text-lg font-medium md:font-bold xl:text-5xl">
                R$ {featuredRoom.discount}
              </p>
            </div>
          </div>

          <Link
            href={`/rooms/${featuredRoom.slug.current}`}
            className="h-fit rounded-2xl border border-tertiary-dark px-3 py-2 text-center font-bold text-tertiary-dark lg:px-7 lg:py-5 lg:text-xl"
          >
            Saiba Mais
          </Link>
        </div>
      </div>
    </section>
  );
}
