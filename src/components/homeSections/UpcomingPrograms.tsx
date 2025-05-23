import data from "../../stubs/programsData.json";
import GradientText from "../ui/GradientText";
import ProgramCard from "../ui/ProgramCard";
import SplitText from "../ui/SplitText";
import ScrollReveal from "../ui/ScrollReveal";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import Carousel from "../ui/Carousel";

const UpcomingPrograms: React.FC = () => {
  return (
    <section className="bg-[#f5f5f5] py-16 px-4">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <p className="text-sm font-semibold text-[#750000] uppercase tracking-wide mb-2">
              UPCOMING PROGRAMS
            </p>
            <h2 className="text-5xl font-semibold">Level up your game</h2>
          </div>
          <div className="text-right text-lg text-gray-700">
            <p>
              Check back regularly for new programs and sessions.
              If a session is full, you may sign-up for the waitlist, which will also register you for the mailing list.
            </p>
          </div>
        </div>
      </section>
      <FadeInOnScroll delay={0.4}>
        <div className="flex justify-center">
          <Carousel
            items={data.map((program, index) => {
              const { title, description, dateRange } = program;
              return (
                <ProgramCard
                  key={`program-card-${index}`}
                  title={title}
                  description={description}
                  dateRange={dateRange}
                />
              );
            })}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </FadeInOnScroll>
    </section>
  );
};

export default UpcomingPrograms;
