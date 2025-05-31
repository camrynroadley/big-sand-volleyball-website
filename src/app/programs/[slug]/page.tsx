"use client";
import Head from "next/head";
import { usePrograms } from "@/context/ProgramContext";
import { Program } from "../../../../types/app";
import { Hero } from "@/components/programSections/Hero";
import { Form } from "@/components/programSections/Form";
import { Information } from "@/components/programSections/Information";
import { useParams } from "next/navigation";

const ProgramPage = () => {
  const params = useParams();
  const programs: Program[] | undefined = usePrograms();

  let programData: Program | undefined;
  // Find corresponding data
  if (programs) {
    programData = programs.find((program) => program.slug === params.slug);
  }

  return (
    <>
      <Head>
        <title>Contact | Big Sand Volleyball Club</title>
        <meta name="description" content="Contact information for our club" />
      </Head>
      <main role="main" aria-label={`${programData?.title} Program Page`}>
        {programData && (
          <>
            <Hero program={programData} />
            <Information program={programData} />
            <Form program={programData} />
          </>
        )}
      </main>
    </>
  );
};

export default ProgramPage;
