import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import Palettes from "@/components/sections/Palettes";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Brief from "@/components/sections/Brief";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

// Section order = page flow. Saara content data/content.json se aata hai.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Approach />
        <Services />
        <Process />
        <Gallery />
        <Palettes />
        <Testimonials />
        <Faq />
        <Brief />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
