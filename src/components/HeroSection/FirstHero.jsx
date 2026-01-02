import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";
import Container from "../Container/Container";

const FirstHero = () => {
  const banners = [banner1, banner2, banner3, banner4, banner5];

  return (
    <div className="rounded-xl px-10 my-10">
      <Container>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          transitionTime={800}
          emulateTouch
          showArrows={true}
          dynamicHeight={false}>
          {banners.map((banner, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="object-cover w-full h-[300px] md:h-[500px] rounded-xl"
              />

              {/* Gray overlay for better text visibility */}
              <div className="absolute inset-0 bg-gray-900/60 rounded-xl"></div>

              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-4xl md:text-3xl font-bold mb-2 text-white">
                  Welcome to HomeHero
                </h2>
                <p className="text-sm md:text-lg max-w-lg text-center text-white">
                  Connect with trusted local service providers like
                  electricians, plumbers, and cleaners.
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default FirstHero;
