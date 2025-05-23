"use client";

import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";

export default function Hero() {
  return (
    <section className="relative bg-white h-screen flex items-center justify-center px-4">
      {/* Container grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-5 items-center gap-6 relative z-10">
        {/* Left side image */}
        <div className="hidden md:block col-span-1">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={HeroLeft}
              alt="Left player"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Center text and form */}
        <div className="col-span-3 text-center md:px-8">
          <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4">
            For the love of <span className="text-[#800000]">the game</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-6">
            <strong className="font-semibold text-black">
              Big Sand Volleyball Club
            </strong>{" "}
            has offered club volleyball and camps for over 15 years. Our goal is
            the same as always: to encourage a love for the game of volleyball.
          </p>

          {/* Signup form with embedded button */}
          <form className="mt-6 bg-white flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-6 py-3 pr-40 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#800000] text-base"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#800000] hover:bg-red-900 text-white px-5 py-2 rounded-full text-sm transition whitespace-nowrap"
              >
                Sign up for mailing list
              </button>
            </div>
          </form>

          {/* Overlapping bottom-left image */}
          <div className="mt-10 flex justify-center md:hidden">
            <div className="rounded-2xl overflow-hidden w-1/2">
              <Image
                src={HeroRight}
                alt="Bottom team"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side image */}
        <div className="hidden md:block col-span-1">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={HeroRight}
              alt="Right player"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom-left image (visible on desktop) */}
      <div className="hidden md:block absolute bottom-8 left-[calc(50%-160px)] z-0 w-64 rounded-2xl overflow-hidden">
        <Image
          src={HeroMiddle}
          alt="Bottom team"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
