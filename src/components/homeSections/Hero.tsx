"use client";

import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";
import GradientText from "../ui/GradientText";
import SoftRedBackground from "../ui/RedBackground";
import BlurText from "../ui/BlurText";
import FadeIn from "../ui/FadeIn";
import { BlurFadeInWrapper } from "../ui/BlurFadeIn";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Hero() {
  return (
    <section className="relative bg-white h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background images (absolutely positioned) */}
      <div className="absolute top-54 -left-4 md:w-56 rounded-2xl overflow-hidden shadow-md z-0">
        <Image
          src={HeroLeft}
          alt="Left player"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="absolute top-72 -right-4 w-32 md:w-56 rounded-2xl overflow-hidden shadow-md z-0">
        <Image
          src={HeroRight}
          alt="Right player"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="absolute -bottom-6 left-1/6 translate-x-1/4 w-40 md:w-56 rounded-2xl overflow-hidden shadow-md z-0">
        <Image
          src={HeroMiddle}
          alt="Bottom team"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 max-w-4xl text-center px-4">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-black tracking-tight">
          <BlurText
            text="For the love of the game."
            delay={100}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl md:text-6xl font-semibold mb-4 text-black tracking-tight"
          />
          {/* For the love of{" "}
          <h1>the game</h1> */}
          {/* <GradientText className="font-semibold">
            the game
          </GradientText> */}
        </h1>
        <FadeIn>
        <p className="text-lg md:text-md max-w-2xl text-gray-800 mb-6 font-medium tracking-tight">
          Big Sand Volleyball Club has offered club volleyball and camps for
          over 15 years. Our goal is the same as always: to encourage a love for
          the game of volleyball.
        </p>
        </FadeIn>

        {/* Signup form with embedded button */}
        <FadeIn>
        <form className="mt-6 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-6 py-3 pr-40 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] text-base"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#800000] hover:bg-red-900 text-white px-5 py-2 rounded-full text-sm shadow-md transition whitespace-nowrap"
            >
              Sign up for mailing list
            </button>
          </div>
        </form>
        </FadeIn>
      </div>
    </section>
  );
}
