import { JSX } from "react";

interface HeroProps {
  title: string;
  description: string;
}

const Hero = ({ title, description }: HeroProps): JSX.Element => {
  return (
    <section className="bg-[#f5f5f5] py-16 px-4 text-center">
      <h2 className="text-6xl font-semibold text-black mt-24 mb-4">{title}</h2>
      <p className="text-lg md:text-xl max-w-2xl mb-4 mx-auto">{description}</p>
      <button className="relative overflow-hidden px-6 py-2 rounded-full font-semibold text-white bg-[#7E0000] group cursor-pointer">
        <span className="relative z-10">Sign up now</span>
        <div className="absolute inset-0 bg-red-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
      </button>
    </section>
  );
};

export default Hero;
