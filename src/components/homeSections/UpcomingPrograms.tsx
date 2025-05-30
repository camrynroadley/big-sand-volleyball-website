"use client";
import ProgramCard from "../ui/ProgramCard";
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
              <div className="md:max-w-3xl mx-auto">
                <ProgramCard
                  slug={programs[0].slug}
                  title={programs[0].title}
                  description={programs[0].description}
                  imagePath={programs[0].image_name}
                />
              </div>
            ) : (
              <Carousel
                items={programs.map((program, index) => {
                  const { slug, title, description, image_name } = program;
                  return (
                    <ProgramCard
                      key={`program-card-${index}`}
                      slug={slug}
                      title={title}
                      description={description}
                      imagePath={image_name}
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
