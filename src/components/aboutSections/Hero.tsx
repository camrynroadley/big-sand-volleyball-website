"use client";

import Image from "next/image";
import About1 from "../../../public/images/about_1.jpg";
import About2 from "../../../public/images/about_2.jpg";
import About3 from "../../../public/images/about_3.jpg";

export default function Hero() {
  return (
    <section className="relative w-screen h-screen bg-white flex items-center justify-center overflow-hidden tracking-tight">
      {/* Black Box - positioned relative */}
      <div className="relative z-10 bg-black text-white rounded-3xl px-8 py-12 text-center w-full max-w-xs md:max-w-xl">
        <h1 className="text-4xl md:text-5xl font-semibold">
          Join the
          <br />
          Big Sand
          <br />
          family
        </h1>
        <p className="mt-4 text-sm md:text-base">
          Big Sand Volleyball is a youth volleyball
          <br />
          club serving Winnipeg and the
          <br />
          surrounding communities.
        </p>

        {/* Mailing List Form */}
        <div className="relative z-50 mt-6 flex items-center rounded-full overflow-hidden border border-white bg-white/10 backdrop-blur">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent px-4 py-2 text-white text-xs placeholder-white focus:outline-none"
          />
          <button className="bg-white text-black px-4 py-2 font-medium text-xs transition-all duration-300 ease-in-out hover:bg-red-200 hover:cursor-pointer">
            Submit
          </button>
        </div>
        <Image
          src={About1}
          alt="volleyball1"
          className="absolute -top-[5%] -left-[18%] w-[35%] h-auto object-cover rounded-2xl shadow-xl"
        />
        <Image
          src={About2}
          alt="volleyball2"
          className="absolute -bottom-[7%] -left-[10%] w-[20%] h-auto object-cover rounded-2xl shadow-xl"
        />
        <Image
          src={About3}
          alt="volleyball3"
          className="absolute bottom-[15%] -right-[15%] w-[25%] h-auto object-cover rounded-2xl shadow-xl"
        />
      </div>
    </section>
  );
}
