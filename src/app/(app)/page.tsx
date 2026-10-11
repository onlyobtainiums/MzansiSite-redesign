import Builder from "@/components/Builder";
import Cursor from "@/components/Cursor";
import Demo from "@/components/Demo";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Includes from "@/components/Includes";
import Nav from "@/components/Nav";
import PatternStrip from "@/components/PatternStrip";
import Pricing from "@/components/Pricing";
import Problem from "@/components/Problem";
import SmoothScroll from "@/components/SmoothScroll";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="grain relative">
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Problem />
          <Includes />
          <PatternStrip />
          <Demo />
          <Builder />
          <PatternStrip />
          <Steps />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
