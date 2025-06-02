"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { GradientText } from "../ui/GradientText";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import { Program } from "../../types/app";
import { usePrograms } from "@/context/ProgramContext";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar = () => {
  const programs: Program[] | undefined = usePrograms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        isMobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isMobileOpen]);

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
    }, 200);
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
          "mx-auto max-w-6xl rounded-[60px] py-4 px-6 backdrop-blur-md flex items-center justify-between transition-all duration-300",
          isScrolled && "bg-white shadow-md border bg-white/80 border-gray-200"
        )}
      >
        <Link href="/">
          <Image
            className="w-12 h-12"
            src={Logo}
            alt="Big Sand Volleyball Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2 tracking-tight">
          <Link href="/about">About</Link>
          <div
            className="relative"
            onMouseEnter={handleProgramsEnter}
            onMouseLeave={handleProgramsLeave}
          >
            <button className="hover:text-black focus:outline-none">
              Programs
            </button>
            {programs && isProgramsOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <ul
                  className="py-2 text-sm"
                  onMouseEnter={handleProgramsEnter}
                  onMouseLeave={handleProgramsLeave}
                >
                  {programs.map((program) => (
                    <li key={`program-${program.slug}`}>
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

        {/* Clothing Link (Desktop only) */}
        <Link
          href="https://bigsand.ca/home-%26-services"
          target="_blank"
          className="hidden md:block"
        >
          <GradientText ariaLabel="Button link to Big Sand Clothing and Printing">
            <p className="text-sm font-semibold">Clothing</p>
          </GradientText>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden z-50 p-2 text-black"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-40"
            ref={mobileMenuRef}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 text-black z-50 p-2"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-4 text-base font-semibold text-black px-6 tracking-tight">
              <Link href="/about" onClick={() => setIsMobileOpen(false)}>
                About
              </Link>
              {programs &&
                programs.map((program) => (
                  <Link
                    key={`mobile-program-${program.slug}`}
                    href={`programs/${program.slug}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {program.title}
                  </Link>
                ))}
              <Link href="/contact" onClick={() => setIsMobileOpen(false)}>
                Contact
              </Link>
              <Link
                href="https://bigsand.ca/home-%26-services"
                target="_blank"
                onClick={() => setIsMobileOpen(false)}
              >
                <GradientText ariaLabel="Button link to Big Sand Clothing and Printing">
                  <p className="text-base font-semibold">Clothing</p>
                </GradientText>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
