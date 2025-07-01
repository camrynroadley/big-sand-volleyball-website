import { ProgramContent } from "./ProgramContent";
import { supabaseAdmin } from "../../../utils/supabase/admin";

export async function generateStaticParams() {
  const { data } = await supabaseAdmin
    .from("big_sand_programs")
    .select("slug");
  return (data || []).map((p) => ({ slug: p.slug }));
}

export const metadata = {
  title: "Programs | Big Sand Volleyball Club",
  description: "Program information for our club",
  openGraph: {
    title: "Programs | Big Sand Volleyball Club",
    description: "Program information for our club",
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
    title: "Programs | Big Sand Volleyball Club",
    description: "program information for our club",
    images: ["/og-image.jpg"],
  },
};

export default function ProgramPage() {
  return <ProgramContent />;
}
