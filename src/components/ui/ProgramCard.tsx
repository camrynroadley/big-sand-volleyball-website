import { JSX } from "react";
import Image from "next/image";
import About3 from "../../../public/images/about_3.jpg";

interface ProgramCardProps {
  slug: string;
  title: string;
  description: string;
  imagePath: string;
  onLearnMoreClicked?: () => void;
}

const ProgramCard = ({
  slug,
  title,
  description,
  imagePath,
  onLearnMoreClicked,
}: ProgramCardProps): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row rounded-[2rem] border border-gray-300 bg-white overflow-hidden">
      {/* Image Section */}
      <div className="md:w-1/3 w-full h-48 md:h-auto">
        <Image
          src={About3}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-black text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
          <p className="text-black text-lg mb-6">{description}</p>
        </div>
        <button
          onClick={onLearnMoreClicked}
          className="bg-[#750000] hover:bg-[#5e0000] text-white text-sm font-medium px-6 py-2 rounded-full transition transform hover:scale-105 duration-200 ease-in-out self-start"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
