"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface ProgramCardProps {
  slug: string;
  title: string;
  description: string;
  imagePath: string;
}

export const ProgramCard = ({
  slug,
  title,
  description,
  imagePath,
}: ProgramCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/programs/${slug}`);
  };

  return (
    <div className="flex flex-col md:flex-row rounded-[2rem] border border-gray-300 bg-white overflow-hidden">
      <div className="md:w-1/3 w-full h-48 md:h-auto">
        <Image
          src={`/images/${imagePath}.jpg`}
          alt={title}
          className="object-cover w-full h-full"
          width={400}
          height={700}
        />
      </div>
      <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-center gap-4">
        <h2 className="text-black text-3xl md:text-4xl font-semibold">
          {title}
        </h2>
        <p className="text-black text-base">{description}</p>
        <button
          onClick={handleClick}
          className="bg-black hover:bg-[#1F1F1F] text-white text-xs font-semibold px-4 py-2 rounded-full transition transform hover:scale-105 hover:cursor-pointer duration-200 ease-in-out self-start"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};
