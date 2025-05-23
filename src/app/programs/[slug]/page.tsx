"use client";

import { useParams } from "next/navigation";
import data from "../../../stubs/programsData.json";
import { Program } from "../../../../types/app";
import Hero from "@/components/programSections/Hero";
import Form from "@/components/programSections/Form";
import Information from "@/components/programSections/Information";

export default function ProgramDetail() {
  const params = useParams();

  // Find corresponding data
  const programData: Program | undefined = data.find(
    (program) => program.slug === params.slug
  );

  return (
    <>
      {programData && (
        <>
          <Hero {...programData} />
          <Information program={programData} />
          <Form />
        </>
      )}
    </>
  );
}
