"use client";
import { useState, useRef, useEffect } from "react";
import data from "../../stubs/coachesData.json";
import { Coach } from "../../../types/app";
import FadeInOnScroll from "./FadeInOnScroll";

interface AccordionProps {
  coaches: Coach[];
}

const Accordion = ({ coaches }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2 tracking-tight">
      {coaches.map((coach, index) => {
        const isOpen = openIndex === index;
        return (
          <FadeInOnScroll key={`fade-in-on-scroll-accordion-${index}`}>
            <div
              className="border border-gray-200 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-lg font-medium cursor-pointer"
              >
                {coach.name}
                <span className="ml-2 text-xl">{isOpen ? "−" : "+"}</span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4 pt-0 text-gray-600 text-base">
                    {coach.description}
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        );
      })}
    </div>
  );
};

export default Accordion;
