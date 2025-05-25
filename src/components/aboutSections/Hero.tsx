"use client";

import Image from "next/image";
import AboutTop from "../../../public/images/about_top.png";
import AboutBottom from "../../../public/images/about_bottom.png";
import FadeIn from "../ui/FadeIn";
import FadeInOnScroll from "../ui/FadeInOnScroll";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-16">
      {/* Centered black box with text */}
      <div className="relative z-10 mx-auto max-w-4xl rounded-3xl bg-black mt-24 px-8 py-16 text-center text-white">
        <h1 className="text-4xl font-semibold md:text-5xl/14 leading-tight">
          Join the <br />
          <span className="text-white">Big Sand</span> <br />
          family
        </h1>
        <p className="mt-4 w-xs text-lg text-center text-gray-300">
          Big Sand Volleyball is a youth volleyball club serving Winnipeg and the surrounding communities.
        </p>
      </div>

      {/* Left image */}
      <div className="absolute -top-8 left-8 z-20">
        <div className="rounded-2xl border-4 border-blue-500 overflow-hidden w-32 h-40 md:w-40 md:h-52 shadow-lg">
          <Image
            src="/images/hero-left.png"
            alt="Player"
            width={160}
            height={208}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Right image overlapping bottom */}
      <div className="absolute -bottom-16 right-8 z-20">
        <div className="rounded-2xl overflow-hidden w-40 h-56 md:w-48 md:h-64 shadow-xl">
          <Image
            src="/images/hero-right.png"
            alt="Volleyball"
            width={192}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
    // <section className="py-12 px-4 md:px-8 center justify-center text-center mt-20">
    //   <FadeInOnScroll>
    //     <Image className="mx-auto w-[270px] rounded-t-[30]" src={AboutTop} alt="volleyball in air" />
    //   </FadeInOnScroll>
    //   <FadeIn delay={0.1}>
    //     <h1 className="text-6xl font-semibold text-black mb-6 mt-12">
    //       Who are we?
    //     </h1>
    //     <p className="text-md md:text-xl max-w-xl mx-auto mb-12">
    //       Big Sand Volleyball is a youth volleyball club serving Winnipeg and
    //       the surrounding communities. We provide young people with
    //       high-quality, accessible volleyball programs.
    //     </p>
    //   </FadeIn>
    //   <FadeInOnScroll>
    //     <Image className="mx-auto w-[270px] rounded-b-[30]" src={AboutBottom} alt="volleyball in air" />
    //   </FadeInOnScroll>
    // </section>
  );
};

export default Hero;
