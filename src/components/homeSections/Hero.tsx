"use client";

import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";
import BlurText from "../ui/BlurText";
import FadeIn from "../ui/FadeIn";
import { EmailForm } from "../ui/EmailForm";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Hero() {
  return (
     <section className="relative w-screen h-screen bg-white flex items-center justify-center overflow-hidden tracking-tight">
      <div className="relative z-10 text-white rounded-3xl px-8 py-12 text-center max-w-xs md:max-w-xl">
        <BlurText
          text="For the love of the game."
          delay={100}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="w-full md:w-5/6 mx-auto text-5xl md:text-6xl font-semibold mb-4 text-black justify-center tracking-tight"
        />
        <FadeIn>
          <p className="text-md text-gray-800 mb-6 font-medium tracking-tight">
            Big Sand Volleyball Club has offered club volleyball and camps for
            over 15 years. Our goal is the same as always: to encourage a love
            for the game of volleyball.
          </p>
        </FadeIn>

        {/* Mailing List Form */}
        <EmailForm />
        {/* <div className="relative z-50 mt-6 flex items-center rounded-full overflow-hidden border border-black bg-white/10 backdrop-blur">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent px-4 py-2 text-black text-xs placeholder-black focus:outline-none"
          />
          <button className="bg-black text-white px-4 py-2 font-medium text-xs transition-all duration-300 ease-in-out hover:bg-red-200 hover:cursor-pointer">
            Submit
          </button>
        </div> */}
        <Image
          src={HeroLeft}
          alt="volleyball1"
          className="absolute -top-[20%] -left-[24%] w-[35%] md:-top-[5%] md:-left-[40%] md:w-[35%] h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
        />
        <Image
          src={HeroMiddle}
          alt="volleyball2"
          className="absolute -bottom-[35%] -right-[20%] w-[40%] md:-bottom-[40%] md:-right-[20%] md:w-[30%] h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
        />
        <Image
          src={HeroRight}
          alt="volleyball3"
          className="absolute -top-[10%] -right-[25%] w-[30%] md:-top-[15%] md:-right-[50%] md:w-[40%] h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
        />
      </div>
    </section>

  );
}
