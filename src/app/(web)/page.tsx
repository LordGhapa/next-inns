import FeatureRoom from "@/components/FeaturedRoom";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import PageSearch from "@/components/PageSearch";
import { getFeaturedRoom } from "../libs/apis";

export default async function Home() {
  const featuredRoom = await getFeaturedRoom();

  return (
    <>
      <HeroSection />

      <PageSearch />

      <FeatureRoom featuredRoom={featuredRoom} />

      <Gallery />

      <NewsLetter />
    </>
  );
}
