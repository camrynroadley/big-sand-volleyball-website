import Coaches from "@/components/aboutSections/Coaches";
import Hero from "@/components/aboutSections/Hero";
import Values from "@/components/aboutSections/Values";

const About: React.FC = () => {
  return (
    <>
      <Hero />
      <Values />
      <Coaches />
      <div className="mb-16" />
    </>
  );
};

export default About;
