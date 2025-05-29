"use client";

export default function ContactForm() {
  return (
 <main className="flex-grow flex items-center justify-center px-4 text-black tracking-tight">
      <div className="text-center max-w-xl">
        <p className="text-[#DF0000] text-base font-medium mb-2">Questions?</p>
        <h1 className="text-6xl md:text-6xl font-semibold mb-4">Email us today</h1>
        <p className="text-lg font-medium">
          Please send your messages to Peter Roadley at <br />
          <a
            href="mailto:bigsandvolleyballwinnipeg@gmail.com"
            className="underline hover:text-red-700"
          >
            bigsandvolleyballwinnipeg@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
