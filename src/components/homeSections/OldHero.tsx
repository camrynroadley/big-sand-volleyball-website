"use client";

import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";
import { ContainerTextFlip } from "../ui/ContainerTextFlip";
import FadeIn from "../ui/FadeIn";

export default function HeroSection() {
  return (
    <section className="py-12 px-4 md:px-8 text-center mt-20">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-10">
          For the love of{" "}
        </h1>
        <ContainerTextFlip
          words={["the game", "volleyball", "friendship", "teamwork"]}
        />
      </div>

      
<div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
        {/* Replace src with your real image paths or use static imports */}
        <FadeIn delay={0}>
        <Image
          src={HeroLeft}
          alt="Girl with volleyball"
          width={250}
          height={350}
          className="rounded-xl object-cover"
        />
        </FadeIn>
        <FadeIn delay={0.4}>
        <Image
          src={HeroMiddle}
          alt="Kids playing volleyball"
          width={250}
          height={350}
          className="rounded-xl object-cover"
        />
        </FadeIn>
        <FadeIn delay={0.8}>
        <Image
          src={HeroRight}
          alt="Girl watching the court"
          width={250}
          height={350}
          className="rounded-xl object-cover"
        />
        </FadeIn>
      </div>

      <p className="text-lg md:text-xl max-w-3xl mx-auto">
        <strong>Big Sand Volleyball Club</strong> has offered club volleyball
        and camps for over 15 years. <br />
        Our goal is the same as always: to encourage a love for the game of
        volleyball.
      </p>
    </section>
  );
}

