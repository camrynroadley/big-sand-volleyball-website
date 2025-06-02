import { Program } from "../../types/app";
import { ProgramInfoText } from "../ui/ProgramInfoText";

interface InformationProps {
  program: Program;
}

export const Information = ({ program }: InformationProps) => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ProgramInfoText label="WHO" info={program.target} />
          <ProgramInfoText label="COST" info={program.cost} />
          <ProgramInfoText label="HOW" info={program.payment_instructions} />
        </div>
        <div>
          <ProgramInfoText label="WHERE" info={program.location} />
          <ProgramInfoText label="LEVEL" info={program.level} />
        </div>
      </div>
    </section>
  );
};
