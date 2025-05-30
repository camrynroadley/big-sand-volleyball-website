"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";
import BlurText from "../ui/BlurText";
import FadeIn from "../ui/FadeIn";
import { EmailForm } from "../ui/EmailForm";
import { Spinner } from "../ui/Spinner";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Hero() {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const allImagesLoaded = imagesLoaded === 3;

  return (
    <>
      {!allImagesLoaded && <Spinner />}

      <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden tracking-tight">
        <div className="relative z-10 text-white rounded-3xl px-8 py-12 text-center max-w-xs md:max-w-xl">
          <BlurText
            text="For the love of the game."
            delay={100}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="w-full md:w-5/6 mx-auto text-5xl md:text-6xl font-semibold mb-4 text-black justify-center tracking-tight"
          />
          <FadeIn delay={1}>
            <p className="text-md text-gray-800 mb-6 font-medium tracking-tight">
              Big Sand Volleyball Club has offered club volleyball and camps for
              over 15 years. Our goal is the same as always: to encourage a love
              for the game of volleyball.
            </p>
          </FadeIn>
          <FadeIn delay={1.5}>
            <EmailForm
              formClassName="border border-black bg-white/10 backdrop-blur"
              inputClassName="text-black bg-transparent placeholder-black"
              buttonClassName="bg-black text-white hover:bg-[#272727] hover:text-white"
              notificationClassName="text-black"
            />
          </FadeIn>
          <Image
            src={HeroLeft}
            alt="volleyball1"
            onLoadingComplete={handleImageLoad}
            className="absolute -top-[20%] -left-[24%] w-[35%] md:-top-[5%] md:-left-[40%] md:w-[35%] h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
          />
          <Image
            src={HeroMiddle}
            alt="volleyball2"
            onLoadingComplete={handleImageLoad}
            className="absolute -bottom-[35%] -right-[20%] w-[40%] md:-bottom-[40%] md:-right-[20%] md:w-[30%] h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
          />
          <Image
            src={HeroRight}
            alt="volleyball3"
            onLoadingComplete={handleImageLoad}
            className="absolute -top-[10%] -right-[25%] w-[30%] md:-top-[15%] md:-right-[50%] md:w-[40%] h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
          />
        </div>
      </section>
    </>
  );
}
