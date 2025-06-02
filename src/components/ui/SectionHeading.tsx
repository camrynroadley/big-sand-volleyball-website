"use client";

import { BlurText } from "./BlurText";
import { FadeInOnScroll } from "./FadeInOnScroll";

interface SectionHeadingProps {
  id: string,
  label: string;
  title: string;
  description: string;
}

export const SectionHeading = ({ id, label, title, description }: SectionHeadingProps) => {
  return (
    <div id={id} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center tracking-tight">
      <div className="text-left">
        <BlurText
          text={label}
          delay={0}
          animateBy="words"
          direction="top"
          className="text-sm font-semibold text-[#DF0000] uppercase mb-2"
        />
        <BlurText
          text={title}
          delay={100}
          animateBy="words"
          direction="top"
          className="text-5xl font-semibold"
        />
      </div>
      <FadeInOnScroll>
        <div className="text-right text-base text-gray-700">
          <p>{description}</p>
        </div>
      </FadeInOnScroll>
    </div>
  );
};
