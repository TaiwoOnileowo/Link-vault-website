import About from "@/components/About";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black-100  min-h-screen">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Pricing/>
    </main>
  );
}
