import { createClient } from '@/utils/supabase/server'
import data from "../../../stubs/programsData.json";
import { Program } from "../../../../types/app";
import Hero from "@/components/programSections/Hero";
import Form from "@/components/programSections/Form";
import Information from "@/components/programSections/Information";

const ProgramDetail = async ({ params }) => {
  // const params = useParams();

   const supabase = await createClient();
  const { data: programs } = await supabase.from("big_sand_programs").select();
  console.log('*** programs: ', programs);

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

export default ProgramDetail;
