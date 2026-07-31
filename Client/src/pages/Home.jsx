import Navbar from "../components/layouts/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Statistics from "../components/home/Statistics";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import Footer from "../components/layouts/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;