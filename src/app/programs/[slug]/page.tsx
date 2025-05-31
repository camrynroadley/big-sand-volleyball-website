"use client";
import { usePrograms } from "@/context/ProgramContext";
import { Program } from "../../../../types/app";
import { Hero } from "@/components/programSections/Hero";
import { Form } from "@/components/programSections/Form";
import { Information } from "@/components/programSections/Information";
import { useParams } from "next/navigation";

export const ProgramDetail = () => {
  const params = useParams();
  const programs: Program[] | undefined = usePrograms();

  let programData: Program | undefined;
  // Find corresponding data
  if (programs) {
    programData = programs.find(
      (program) => program.slug === params.slug
    );
  }

  return (
    <>
      {programData && (
        <>
          <Hero program={programData} />
          <Information program={programData} />
          <Form program={programData} />
        </>
      )}
    </>
  );
};
