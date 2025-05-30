import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ProgramProvider } from "../context/ProgramContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Big Sand Volleyball Winnipeg",
  description: "Big Sand Youth Volleyball Club Winnipeg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: programs } = await supabase.from("big_sand_programs").select();

  return (
    <>
      <html lang="en">
        <body
          className={`${plusJakartaSans.variable} antialiased font-[family-name:var(--font-plus-jakarta-sans)]`}
        >
          <ProgramProvider programs={programs || []}>
            <div className="flex flex-col min-h-screen bg-white">
              <Navbar />
              {children}
              <Footer />
            </div>
          </ProgramProvider>
        </body>
      </html>
    </>
  );
}
