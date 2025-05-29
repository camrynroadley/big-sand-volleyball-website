import data from "../../stubs/programsData.json";
import GradientText from "../ui/GradientText";
import ProgramCard from "../ui/ProgramCard";
import SplitText from "../ui/SplitText";
import ScrollReveal from "../ui/ScrollReveal";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import Carousel from "../ui/Carousel";
import SectionHeading from "../ui/SectionHeading";
import { Program } from "../../../types/app";
import { usePrograms } from "@/context/ProgramContext";

const UpcomingPrograms = () => {
  const programs: Program[] | undefined = usePrograms();

  return (
    <section className="bg-[#f5f5f5] py-16 px-4 tracking-tight">
      <div className="max-w-xs md:max-w-5xl mx-auto">
        <SectionHeading
          label="UPCOMING PROGRAMS"
          title="Level up your game"
          description="Check back regularly for new programs and sessions.
              If a session is full, you may sign-up for the waitlist, which will also register you for the mailing list."
        />
        <FadeInOnScroll delay={0.4}>
          <div className="flex justify-center">
            {programs.length === 1 ? (
              <h1>test</h1>
            ) : (
              <Carousel
                items={programs.map((program, index) => {
                  const { slug, title, description } = program;
                  return (
                    <ProgramCard
                      key={`program-card-${index}`}
                      slug={slug}
                      title={title}
                      description={description}
                      imagePath="program_1.jpg"
                    />
                  );
                })}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />
            )}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default UpcomingPrograms;
