"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import About1 from "../../../public/images/about_1.jpg";
import About2 from "../../../public/images/about_2.jpg";
import About3 from "../../../public/images/about_3.jpg";
import { EmailForm } from "../ui/EmailForm";
import { FadeIn } from "../ui/FadeIn";
import { Spinner } from "../ui/Spinner";
import { BlurText } from "../ui/BlurText";

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
      <section
        aria-label="Hero Section: Big Sand Volleyball Home Page"
        className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden tracking-tight"
      >
                <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 bg-black text-white rounded-3xl px-8 py-12 w-full max-w-xs md:max-w-xl mx-auto"
          data-testid="hero-container"
        >
          <div className="w-full max-w-3xs mx-auto text-center">
            <BlurText
              aria-label="Join the Big Sand family"
              text="Join the Big Sand family"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-semibold text-center justify-center"
            />
          </div>
          <FadeIn>
            <p className="mt-4 text-sm md:text-base font-medium text-center">
              Big Sand Volleyball is a youth volleyball
              <br />
              club serving Winnipeg and the
              <br />
              surrounding communities.
            </p>
          </FadeIn>
          <FadeIn>
            <EmailForm
              formClassName="border border-white bg-white/10 backdrop-blur z-20"
              inputClassName="bg-transparent text-white placeholder-white"
              buttonClassName="bg-white text-black hover:bg-gray-200"
              notificationClassName="text-white"
              spinnerClassName="text-black"
            />
          </FadeIn>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="absolute -top-[5%] -left-[18%] w-[35%] h-auto"
          >
            <Image
              src={About1}
              alt="Volleyball player wearing a t-shirt with the Big Sand logo"
              onLoadingComplete={handleImageLoad}
              className="w-full h-auto object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            className="absolute -bottom-[10%] -left-[5%] w-[20%] h-auto"
          >
            <Image
              src={About2}
              alt="Group of girls practicing volleyball"
              onLoadingComplete={handleImageLoad}
              className="w-full h-auto object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="absolute bottom-[15%] -right-[15%] w-[25%] h-auto"
          >
            <Image
              src={About3}
              alt="Two girls playing volleyball"
              onLoadingComplete={handleImageLoad}
              className="w-full h-auto object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
