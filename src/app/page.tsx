import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { getPlanPrices } from "@/lib/settings";

const Benefits = dynamic(() =>
  import("@/components/sections/benefits").then((m) => ({ default: m.Benefits }))
);
const Plans = dynamic(() =>
  import("@/components/sections/plans").then((m) => ({ default: m.Plans }))
);
const Stats = dynamic(() =>
  import("@/components/sections/stats").then((m) => ({ default: m.Stats }))
);
const Process = dynamic(() =>
  import("@/components/sections/process").then((m) => ({ default: m.Process }))
);
const Portfolio = dynamic(() =>
  import("@/components/sections/portfolio").then((m) => ({ default: m.Portfolio }))
);
const Faq = dynamic(() =>
  import("@/components/sections/faq").then((m) => ({ default: m.Faq }))
);
const About = dynamic(() =>
  import("@/components/sections/about").then((m) => ({ default: m.About }))
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => ({ default: m.Contact }))
);

export default async function Home() {
  const planPrices = await getPlanPrices();

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Benefits />
        <Plans priceOverrides={planPrices} />
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
