"use client";

import Image from "next/image";
import AboutTop from "../../../public/images/about_top.png";
import AboutBottom from "../../../public/images/about_bottom.png";
import FadeIn from "../ui/FadeIn";
import FadeInOnScroll from "../ui/FadeInOnScroll";

const Hero: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 center justify-center text-center mt-20">
      <FadeInOnScroll>
        <Image className="mx-auto w-[270px] rounded-t-[30]" src={AboutTop} alt="volleyball in air" />
      </FadeInOnScroll>
      <FadeIn delay={0.1}>
        <h1 className="text-6xl font-semibold text-black mb-6 mt-12">
          Who are we?
        </h1>
        <p className="text-md md:text-xl max-w-xl mx-auto mb-12">
          Big Sand Volleyball is a youth volleyball club serving Winnipeg and
          the surrounding communities. We provide young people with
          high-quality, accessible volleyball programs.
        </p>
      </FadeIn>
      <FadeInOnScroll>
        <Image className="mx-auto w-[270px] rounded-b-[30]" src={AboutBottom} alt="volleyball in air" />
      </FadeInOnScroll>
    </section>
  );
};

export default Hero;
