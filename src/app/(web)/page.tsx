import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import PageSearch from "@/components/PageSearch";

export default function Home() {
  return (
    <>
      <HeroSection />

      <PageSearch />
      {/* feature room */}

      <Gallery />
      {/* news letter */}
    </>
  );
}
