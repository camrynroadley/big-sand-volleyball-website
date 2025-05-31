"use client";
import { BlurText } from "@/components/ui/BlurText";
import { FadeIn } from "@/components/ui/FadeIn";

export const ContactForm = () => {
  return (
    <main
      className="flex-grow flex items-center justify-center px-4 text-black tracking-tight"
      role="main"
      aria-label="Contact Section"
    >
      <div className="text-center max-w-xl" aria-labelledby="contact-heading">
        <FadeIn>
          <p className="text-[#DF0000] text-base font-medium mb-2" id="contact-heading">
            Questions?
          </p>
        </FadeIn>
        <BlurText
          text="Email us today"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-6xl font-semibold mb-4 justify-center"
          aria-label="Email us today"
        />
        <FadeIn>
          <p className="text-lg font-medium">
            Please send your messages to Peter Roadley at <br />
            <a
              href="mailto:bigsandvolleyballwinnipeg@gmail.com"
              className="underline hover:text-red-700"
              aria-label="Email Peter Roadley at bigsandvolleyballwinnipeg@gmail.com"
            >
              bigsandvolleyballwinnipeg@gmail.com
            </a>
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
