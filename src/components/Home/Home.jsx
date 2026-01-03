import React from "react";
import FirstHero from "../HeroSection/FirstHero";
import PopularServices from "../../Services/PopularServices/PopularServices";
import WhyChooseUs from "../HeroSection/WhyChooseUs";
import CustomerTestimonials from "../HeroSection/CustomerTestimonials";

const Home = () => {
  return (
    <div className="my-10">
      <FirstHero />
      <PopularServices />
      <WhyChooseUs />

      <CustomerTestimonials />
    </div>
  );
};

export default Home;
