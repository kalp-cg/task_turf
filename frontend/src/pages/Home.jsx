import React from "react";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import PopularServices from "../components/PopularServices.jsx";
import HowItWorks from "../components/howItWorks.jsx";
import TopRatedWorkers from "../components/TopRatedWorkers.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <PopularServices />
      <HowItWorks />
      <TopRatedWorkers />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
