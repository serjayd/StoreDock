import Hero from "@/features/home/components/Hero";
import Stats from "@/features/home/components/Stats";
import Features from "@/features/home/components/Features";
import Shelves from "@/features/home/components/Shelves";
import Testimonials from "@/features/home/components/Testimonials";
import Pricing from "@/features/subscription/components/Pricing";
import Banner from "@/features/home/components/Banner";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Shelves />
      <Testimonials />
      <Pricing session={session} />
      <Banner />
    </>
  );
}
