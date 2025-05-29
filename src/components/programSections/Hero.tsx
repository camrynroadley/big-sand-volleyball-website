import { JSX } from "react";
import { Program } from "../../../types/app";

interface HeroProps {
  program: Program;
}

const Hero = ({ program }: HeroProps): JSX.Element => {
  return (
    <section className="grid grid-cols gap-8 max-w-xs md:max-w-5xl mx-auto mt-[12%]">
      <h1 className="text-6xl font-semibold text-black">{program.title}</h1>
      <div className="grid grid-cols-1 mx-auto ">
        {program.sessions.length === 1 ? (
          <p>{`${program.sessions[0].date} ◦ ${program.sessions[0].time}`}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {program.sessions.map((session) => (
              <div key={`session-${session.id}`}>
                <div className="inline-block bg-black text-white font-semibold text-sm px-2 py-1/2 rounded-sm">{`Session ${session.id}`}</div>
                <p className="font-medium tracking-tight">{session.date}</p>
                <p className="font-medium tracking-tight">{session.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
