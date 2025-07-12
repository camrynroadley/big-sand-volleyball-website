"use client";
import { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import HeroLeft from "../../../public/images/hero_left.png";
import HeroMiddle from "../../../public/images/hero_middle.png";
import HeroRight from "../../../public/images/hero_right.png";
import { BlurText } from "../ui/BlurText";
import { FadeIn } from "../ui/FadeIn";
import { EmailForm } from "../ui/EmailForm";
import { Spinner } from "../ui/Spinner";

export const Hero = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { scrollY } = useScroll();

  const yText = useSpring(useTransform(scrollY, [0, 1000], ["0%", "20%"]), {
    stiffness: 40,
    damping: 30,
  });

  const opacityText = useSpring(useTransform(scrollY, [0, 200], [1, 0]), {
    stiffness: 60,
    damping: 35,
  });

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const allImagesLoaded = imagesLoaded === 3;

  return (
    <>
      {!allImagesLoaded && <Spinner />}

      <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden tracking-tight">
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 text-white rounded-3xl px-8 py-12 text-center max-w-xs md:max-w-xl"
          data-testid="hero-container"
        >
          <BlurText
            text="For the love of the game."
            delay={100}
            animateBy="words"
            direction="top"
            className="w-full md:w-5/6 mx-auto text-5xl md:text-7xl font-semibold mb-4 text-black justify-center tracking-tight"
          />
          <FadeIn delay={1}>
            <p className="w-5/6 text-md text-gray-800 mb-6 mx-auto font-medium tracking-tight">
              Big Sand Volleyball Club has offered club volleyball and camps for
              over 15 years. Our goal is the same as always: to encourage a love
              for the game of volleyball.
            </p>
          </FadeIn>
          <FadeIn delay={1.5}>
            <div className="md:w-3/4 mx-auto">
            <EmailForm
              formClassName="border border-black bg-white/10 backdrop-blur"
              inputClassName="text-black bg-transparent placeholder-black"
              buttonClassName="bg-black text-white hover:bg-[#272727] hover:text-white"
              notificationClassName="text-black"
              spinnerClassName="text-white"
            />
            </div>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="absolute -top-[20%] -left-[24%] w-[35%] md:-top-[5%] md:-left-[40%] md:w-[35%] h-auto"
          >
            <Image
              src={HeroLeft}
              alt="volleyball1"
              onLoad={handleImageLoad}
              className="w-full h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            className="absolute -bottom-[35%] -right-[20%] w-[40%] md:-bottom-[40%] md:-right-[30%] md:w-[30%] h-auto"
          >
            <Image
              src={HeroMiddle}
              alt="volleyball2"
              onLoad={handleImageLoad}
              className="w-full h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="absolute -top-[10%] -right-[20%] w-[30%] md:-top-[15%] md:-right-[50%] md:w-[40%] h-auto "
          >
            <Image
              src={HeroRight}
              alt="volleyball3"
              onLoad={handleImageLoad}
              className="w-full h-auto object-cover rounded-lg md:rounded-2xl shadow-xl"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
