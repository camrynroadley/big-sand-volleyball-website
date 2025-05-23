"use client";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/FloatingCard";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import data from "../../stubs/valuesData.json";
import FadeInOnScroll from "../ui/FadeInOnScroll";

const Values: React.FC = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <FadeInOnScroll>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-sm font-semibold text-[#750000] uppercase tracking-wide mb-2">
                Values
              </p>
              <h2 className="text-5xl font-semibold">Our focus areas</h2>
            </div>
            <div className="text-right text-lg text-gray-700">
              <p>
                We focus on developing these skills through weekly practices. We
                encourage kids to play many sports and build their athletic
                abilities first before focusing on volleyball only.
              </p>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((value, index) => {
            let icon;
            if (value.icon === "HandshakeIcon") {
              icon = <HandshakeIcon />;
            } else if (value.icon === "SportsVolleyballIcon") {
              icon = <SportsVolleyballIcon />;
            } else {
              icon = <AutoAwesomeIcon />;
            }
            return (
              <FadeInOnScroll key={`fade-in-on-scroll-value-${value.name}`} delay={0.2 * index}>
                <CardContainer key={`card-container-value-${value.name}`}>
                  <CardBody className="bg-white relative group/card  border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border text-center">
                    <CardItem translateZ="100" className="w-full mb-2">
                      {icon}
                    </CardItem>
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 mx-auto dark:text-white"
                    >
                      {value.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
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
