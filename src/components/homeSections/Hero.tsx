"use client";

import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";
import BlurText from "../ui/BlurText";
import FadeIn from "../ui/FadeIn";
import EmailForm from "../ui/EmailForm";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Hero() {
  return (
    <section className="relative bg-white h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute top-54 -left-4 md:w-56 overflow-hidden z-0">
        <FadeIn delay={0.5}>
          <Image
            src={HeroLeft}
            alt="Left player"
            className="w-full h-auto object-cover rounded-2xl shadow-md "
          />
        </FadeIn>
      </div>

      <div className="absolute top-72 -right-4 w-32 md:w-56 overflow-hidden z-0">
        <FadeIn delay={1}>
          <Image
            src={HeroRight}
            alt="Right player"
            className="w-full h-auto object-cover rounded-2xl shadow-md"
          />
        </FadeIn>
      </div>

      <div className="absolute -bottom-6 left-1/6 translate-x-1/4 w-40 md:w-56 overflow-hidden z-0">
        <FadeIn delay={1.5}>
          <Image
            src={HeroMiddle}
            alt="Bottom team"
            className="w-full h-auto object-cover shadow-md rounded-2xl"
          />
        </FadeIn>
      </div>

      {/* Center content */}
      <div className="relative z-10 max-w-lg text-center px-4">
        <BlurText
          text="For the love of the game."
          delay={100}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-4xl md:text-6xl font-semibold mb-4 text-black justify-center tracking-tight"
        />
        <FadeIn>
          <p className="text-lg md:text-md text-gray-800 mb-6 font-medium tracking-tight">
            Big Sand Volleyball Club has offered club volleyball and camps for
            over 15 years. Our goal is the same as always: to encourage a love
            for the game of volleyball.
          </p>
        </FadeIn>

        {/* Signup form with embedded button */}
        <FadeIn>
          <EmailForm />
        </FadeIn>
      </div>
    </section>
  );
}
