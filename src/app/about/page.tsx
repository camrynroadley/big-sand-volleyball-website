import { createClient } from '@/utils/supabase/server'
import Coaches from "@/components/aboutSections/Coaches";
import Hero from "@/components/aboutSections/Hero";
import Values from "@/components/aboutSections/Values";

const About: React.FC = async () => {
 const supabase = await createClient();
  const { data: coaches } = await supabase.from("big_sand_coaches").select();
  console.log('*** coaches: ', coaches);

  return (
    <>
      <Hero />
      <Values />
      <Coaches coaches={coaches} />
      {/* LAzy Load here */}
      <div className="mb-16" />
    </>
  );
};

export default About;
