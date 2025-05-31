"use client";
import { useState } from "react";
import Image from "next/image";
import About1 from "../../../public/images/about_1.jpg";
import About2 from "../../../public/images/about_2.jpg";
import About3 from "../../../public/images/about_3.jpg";
import { EmailForm } from "../ui/EmailForm";
import { FadeInOnScroll } from "../ui/FadeInOnScroll";
import { Spinner } from "../ui/Spinner";
import { BlurText } from "../ui/BlurText";

export const Hero = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const allImagesLoaded = imagesLoaded === 3;

  return (
    <>
      {!allImagesLoaded && <Spinner />}
      <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden tracking-tight">
        <div className="relative z-10 bg-black text-white rounded-3xl px-8 py-12 w-full max-w-xs md:max-w-xl mx-auto">
          <div className="w-full max-w-3xs mx-auto text-center">
            <BlurText
              text="Join the Big Sand family"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-semibold text-center justify-center"
            />
          </div>
          <p className="mt-4 text-sm md:text-base text-center">
            Big Sand Volleyball is a youth volleyball
            <br />
            club serving Winnipeg and the
            <br />
            surrounding communities.
          </p>
          <FadeInOnScroll>
            <EmailForm
              formClassName="border border-white bg-white/10 backdrop-blur"
              inputClassName="bg-transparent text-white placeholder-white"
              buttonClassName="bg-white text-black hover:bg-gray-200"
              notificationClassName="text-white"
            />
          </FadeInOnScroll>
          <Image
            src={About1}
            alt="volleyball1"
            onLoadingComplete={handleImageLoad}
            className="absolute -top-[5%] -left-[18%] w-[35%] h-auto object-cover rounded-2xl shadow-xl"
          />
          <Image
            src={About2}
            alt="volleyball2"
            onLoadingComplete={handleImageLoad}
            className="absolute -bottom-[10%] -left-[5%] w-[20%] h-auto object-cover rounded-2xl shadow-xl"
          />
          <Image
            src={About3}
            alt="volleyball3"
            onLoadingComplete={handleImageLoad}
            className="absolute bottom-[15%] -right-[15%] w-[25%] h-auto object-cover rounded-2xl shadow-xl"
          />
        </div>
      </section>
    </>
  );
}
