import React from "react";
import FirstHero from "../HeroSection/FirstHero";
import PopularServices from "../../Services/PopularServices/PopularServices";

const Home = () => {
  return (
    <div className="my-10">
      <FirstHero />
      <PopularServices />
    </div>
  );
};

export default Home;
