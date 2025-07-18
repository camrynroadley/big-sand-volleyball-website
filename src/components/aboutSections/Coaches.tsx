import { Accordion } from "../ui/Accordion";
import { Coach } from "../../types/app";
import { SectionHeading } from "../ui/SectionHeading";

interface CoachesProps {
  coaches: Coach[];
}

export const Coaches = ({ coaches }: CoachesProps) => {
  return (
    <section className="max-w-xs md:max-w-5xl mx-auto px-4 pt-12 tracking-tight">
      <SectionHeading
        id="coaches-heading"
        label="COACHES"
        title="Our current coaches"
        description="We are fortunate to have support from Big Sand and Sturgeon
              Heights Collegiate volleyball alumni, in addition to parent
              coaches, who may not all be listed below."
      />
      <Accordion aria-labelledby="coaches-heading" coaches={coaches} />
    </section>
  );
};
