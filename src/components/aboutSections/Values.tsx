"use client";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/FloatingCard";
import data from "../../stubs/valuesData.json";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import SectionHeading from "../ui/SectionHeading";

const Values = () => {
  return (
    <section className="bg-[#f5f5f5] tracking-tight">
      <FadeInOnScroll>
        <section className="max-w-xs md:max-w-5xl mx-auto px-4 pt-12">
          <SectionHeading
            label="VALUES"
            title="Our focus areas"
            description="We focus on developing these skills through weekly practices. We
                encourage kids to play many sports and build their athletic
                abilities first before focusing on volleyball only."
          />
        </section>
      </FadeInOnScroll>
      <section className="max-w-xs md:max-w-5xl mx-auto px-4 py-12 tracking-tight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((value, index) => {
            return (
              <FadeInOnScroll
                key={`fade-in-on-scroll-value-${value.name}`}
                delay={0.2 * index}
              >
                <CardContainer key={`card-container-value-${value.name}`}>
                  <CardBody className="flex flex-col justify-between bg-white relative group/card border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border text-center h-full">
                    <CardItem
                      translateZ="50"
                      className="text-base font-semibold text-black mx-auto"
                    >
                      {value.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-black text-sm max-w-sm mt-2"
                    >
                      {value.description}
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </FadeInOnScroll>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Values;
