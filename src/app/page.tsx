"use client";
// import { useState } from 'react';
// import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import HeroSection from "@/components/homeSections/Hero";
import UpcomingPrograms from "@/components/homeSections/UpcomingPrograms";
import Information from '@/components/homeSections/Information';

export default function HomePage() {
  // const [activeMenuItem, setActiveMenuItem] = useState('');

  // const handleMenuItemChange = (selectedItem: string) => {
  //   setActiveMenuItem(selectedItem);
  // };

  return (
    <>
    {/* <Menu setActive={(e) => handleMenuItemChange(e)}>
      <MenuItem>test 1</MenuItem>
            <MenuItem>test 2</MenuItem>
                  <MenuItem>test 3</MenuItem>
    </Menu> */}
    <HeroSection />
    <UpcomingPrograms />
    <Information />
    </>
  );
}
