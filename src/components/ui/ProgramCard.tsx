import { JSX } from "react";

interface ProgramCardProps {
  title: string;
  description: string;
  dateRange: string;
  onLearnMoreClicked?: () => void;
}

const ProgramCard = ({
  title,
  description,
  dateRange,
  onLearnMoreClicked,
}: ProgramCardProps): JSX.Element => {
  return (
    <div className="rounded-[2rem] border border-gray-300 p-6 md:p-8 bg-white">
      <p className="text-black text-base mb-2">{dateRange}</p>
      <h2 className="text-black text-5xl font-semibold mb-4">{title}</h2>
      <p className="text-black text-lg mb-6">{description}</p>
      <button
        onClick={onLearnMoreClicked}
        className="bg-[#750000] hover:bg-[#5e0000] text-white text-sm font-medium px-6 py-2 rounded-full transition transform hover:scale-105 duration-200 ease-in-out"
      >
        Learn More
      </button>
    </div>
  );
};

export default ProgramCard;
