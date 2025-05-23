"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import GradientText from "./GradientText";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import data from "../../stubs/programsData.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleProgramsEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsProgramsOpen(true);
  };

  const handleProgramsLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProgramsOpen(false);
    }, 200); // Delay close by 200ms
  };

  return (
    <nav
      className={clsx(
        "mt-4 px-4 md:px-6 z-50 transition-all duration-300",
        isScrolled ? "fixed top-0 w-full" : "absolute top-0 w-full"
      )}
    >
      <div
        className={clsx(
          "mx-auto max-w-6xl rounded-[60] py-4 px-6 backdrop-blur-md flex items-center justify-between transition-all duration-300",
          isScrolled && "bg-white shadow-md border bg-white/80 border-gray-200"
        )}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <Image
            className="w-12 h-12"
            src={Logo}
            alt="Big Sand Volleyball Logo"
          />
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
          <Link href="/about">About</Link>

          {/* Dropdown Wrapper */}
          <div
            className="relative"
            onMouseEnter={handleProgramsEnter}
            onMouseLeave={handleProgramsLeave}
          >
            <button className="hover:text-black focus:outline-none">
              Programs
            </button>

            {/* Dropdown Menu */}
            {isProgramsOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <ul
                  className="py-2 text-sm"
                  onMouseEnter={handleProgramsEnter}
                  onMouseLeave={handleProgramsLeave}
                >
                  {data.map((program) => (
                    <li key={`li-program-${program.slug}`}>
                      <Link
                        href={`programs/${program.slug}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {program.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link href="/contact">Contact</Link>
        </div>

        {/* Clothing button */}
        <Link href="/clothing" className="">
          <GradientText
            colors={["#750000", "#FF0000"]}
            animationSpeed={3}
            showBorder={true}
          >
            <p className="text-sm font-semibold">Clothing</p>
          </GradientText>
        </Link>
      </div>
    </nav>
  );
}
