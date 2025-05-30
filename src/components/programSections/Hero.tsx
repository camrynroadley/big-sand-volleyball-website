import { Program } from "../../../types/app";
import BlurText from "../ui/BlurText";
import FadeInOnScroll from "../ui/FadeInOnScroll";

interface HeroProps {
  program: Program;
}

const Hero = ({ program }: HeroProps) => {
  return (
    <section className="grid grid-cols gap-8 w-full max-w-5xl mx-auto px-4 mt-[12%]">
      <BlurText
        text={program.title}
        delay={100}
        animateBy="words"
        direction="top"
        className="text-6xl max-w-2xl font-semibold text-black"
      />
      <div className="grid grid-cols-1">
        {program.sessions.length === 1 ? (
          <FadeInOnScroll>
            <p className="font-medium text-lg">{`${program.sessions[0].date} ● ${program.sessions[0].time}`}</p>
          </FadeInOnScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
            {program.sessions.map((session, index) => (
              <FadeInOnScroll key={`session-${session.id}`} delay={index * 0.2}>
                {session.isFull ? (
                  <>
                    <div className="inline-block bg-black text-white font-semibold text-sm px-2 py-1/2 rounded-sm">{`Session ${session.id}`}</div>
                    <div className="ml-1 inline-block bg-red-800 text-white font-semibold text-sm px-2 py-1/2 rounded-sm">
                      FULL
                    </div>
                    <p className="font-medium tracking-tight">{session.date}</p>
                    <p className="font-medium tracking-tight">{session.time}</p>
                  </>
                ) : (
                  <>
                    <div className="inline-block bg-black text-white font-semibold text-sm px-2 py-1/2 rounded-sm">{`Session ${session.id}`}</div>
                    <p className="font-medium tracking-tight">{session.date}</p>
                    <p className="font-medium tracking-tight">{session.time}</p>
                  </>
                )}
              </FadeInOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
