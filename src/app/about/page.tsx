import Head from "next/head";
import { createClient } from "@/utils/supabase/server";
import { Coaches } from "@/components/aboutSections/Coaches";
import { Hero } from "@/components/aboutSections/Hero";
import { Values } from "@/components/aboutSections/Values";

const AboutPage = async () => {
  const supabase = await createClient();
  const { data: coaches } = await supabase.from("big_sand_coaches").select();
  return (
    <>
      <Head>
        <title>About | Big Sand Volleyball Club</title>
        <meta
          name="description"
          content="Learn more about our club, our values, and our coaches."
        />
      </Head>

      <main role="main" aria-label="About Page" className="mb-16">
        <Hero />
        <Values />
        {coaches && <Coaches coaches={coaches} />}
      </main>
    </>
  );
};

export default AboutPage;
