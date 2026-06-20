import Hero from "@/features/home/components/Hero";
import Stats from "@/features/home/components/Stats";
import Features from "@/features/home/components/Features";
import Shelves from "@/features/home/components/Shelves";
import Testimonials from "@/features/home/components/Testimonials";
import Pricing from "@/features/home/components/Pricing";
import Banner from "@/features/home/components/Banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Shelves />
      <Testimonials />
      <Pricing />
      <Banner />
    </>
  );
}
