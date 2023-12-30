import Image from "next/image";

export default function Gallery() {
  return (
    <div className="container mx-auto h-full py-14">
      <div className="flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="h-48 w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="img"
              src="/images/hero-1.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="h-48 w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="img"
              src="/images/hero-2.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="h-48 w-full p-1 md:p-2">
            <Image
              alt="gallery"
              className="img"
              src="/images/hero-3.jpeg"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="h-48 w-full p-1 md:p-2">
            <Image
              alt="gallery"
              className="img"
              src="/images/hero-1.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="h-48 w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="img"
              src="/images/hero-2.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="h-48 w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="img"
              src="/images/hero-3.jpeg"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
