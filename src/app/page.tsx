"use client";
import { Hero } from "@/components/homeSections/Hero";
import { UpcomingPrograms } from "@/components/homeSections/UpcomingPrograms";

const HomePage = () => {
  return (
    <main role="main" aria-label="Home Page" >
      <Hero />
      <UpcomingPrograms />
      {/* <Information /> */}
    </main>
  );
};

export default HomePage;
