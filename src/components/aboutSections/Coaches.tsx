import GradientText from "../ui/GradientText";
import Accordion from "../ui/Accordion";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import { Coach } from "../../../types/app";


interface CoachesProps {
  coaches: Coach[],
}

const Coaches = ({ coaches }: CoachesProps) => {
  return (
    <section>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-sm font-semibold text-[#750000] uppercase tracking-wide mb-2">
                COACHES
              </p>
              <h2 className="text-5xl font-semibold">Our current coaches</h2>
            </div>
            <div className="text-right text-lg text-gray-700">
              <p>
                We are fortunate to have support from Big Sand and Sturgeon
                Heights Collegiate volleyball alumni, in addition to parent
                coaches, who may not all be listed below.
              </p>
            </div>
          </div>
        </section>
      <Accordion coaches={coaches} />
    </section>
  );
};

export default Coaches;
