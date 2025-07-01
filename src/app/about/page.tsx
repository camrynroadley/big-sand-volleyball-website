import { createClient } from "@/utils/supabase/server";
import { Coaches } from "@/components/aboutSections/Coaches";
import { Hero } from "@/components/aboutSections/Hero";
import { Values } from "@/components/aboutSections/Values";

export const metadata = {
  title: "About | Big Sand Volleyball Club",
  description: "Information for our club",
  openGraph: {
    title: "About | Big Sand Volleyball Club",
    description: "Information for our club",
    url: "https://bigsandvolleyball.com/contact",
    siteName: "Big Sand Volleyball Club",
    images: [
      {
        url: "/og_image.jpg",
        width: 400,
        height: 530,
        alt: "Big Sand Volleyball",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Big Sand Volleyball Club",
    description: "Information for our club",
    images: ["/og-image.jpg"],
  },
};

const AboutPage = async () => {
  const supabase = await createClient();
  const { data: coaches } = await supabase.from("big_sand_coaches").select();
  return (
    <main role="main" aria-label="About Page" className="mb-16">
      <Hero />
      <Values />
      {coaches && coaches.length > 0 && <Coaches coaches={coaches} />}
    </main>
  );
};

export default AboutPage;
