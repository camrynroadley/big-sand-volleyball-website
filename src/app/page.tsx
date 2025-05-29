"use client";
import HeroSection from "@/components/homeSections/Hero";
import UpcomingPrograms from "@/components/homeSections/UpcomingPrograms";
import Information from "@/components/homeSections/Information";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <UpcomingPrograms />
      <Information />
    </>
  );
};

export default HomePage;
