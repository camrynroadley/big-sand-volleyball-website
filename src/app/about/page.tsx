import { createClient } from '@/utils/supabase/server'
import { Coaches } from "@/components/aboutSections/Coaches";
import { Hero } from "@/components/aboutSections/Hero";
import { Values } from "@/components/aboutSections/Values";

export const About = async () => {
 const supabase = await createClient();
  const { data: coaches } = await supabase.from("big_sand_coaches").select();
  return (
    <div className='mb-16'>
      <Hero />
      <Values />
      {coaches && (
      <Coaches coaches={coaches} />
      )}
    </div>
  );
};
