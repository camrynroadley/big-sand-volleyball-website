import { Program } from "../../../types/app";
import ProgramInfoText from "../ui/ProgramInfoText";

interface InformationProps {
  program: Program;
}

const Information = ({ program }: InformationProps) => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl font-semibold">Details</h2>
        </div>
        <div>
          <ProgramInfoText label="WHEN" info={program.dateRange} />
          <ProgramInfoText label="WHERE" info={program.location} />
          <ProgramInfoText label="WHO" info={program.who} />
          <ProgramInfoText label="LEVEL" info={program.level} />
          <ProgramInfoText label="COST" info={program.cost} />
          <ProgramInfoText label="HOW" info={program.paymentInstructions} />
        </div>
      </div>
    </section>
  );
};

export default Information;
