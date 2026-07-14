import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Plans } from "@/components/sections/plans";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Faq } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Benefits />
        <Plans />
        <Stats />
        <Process />
        <Portfolio />
        <Faq />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
