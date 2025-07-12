"use client";
import { usePrograms } from "@/context/ProgramContext";
import { useParams } from "next/navigation";
import { Hero } from "@/components/programSections/Hero";
import { Information } from "@/components/programSections/Information";
import { Form } from "@/components/programSections/Form";

export const ProgramContent = () => {
  const { slug } = useParams();
  const programs = usePrograms();
  const programData = programs.find((program) => program.slug === slug);

  return (
    <main role="main" aria-label={`${programData?.title} Program Page`}>
      {programData && (
        <>
          <Hero program={programData} />
          <Information program={programData} />
          <Form program={programData} />
        </>
      )}
    </main>
  );
};
