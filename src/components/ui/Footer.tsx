import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111111] text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Mailing list sign-up */}
        <div className="w-full md:w-1/2">
          <label htmlFor="email" className="block text-sm mb-2">
            Join our mailing list
          </label>
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full max-w-xs px-3 py-1.5 bg-white text-black border border-black rounded-full text-sm"
            />
            <button className="ml-2 px-4 py-1.5 bg-[#991b1b] rounded-full text-sm hover:bg-red-800 transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Club name and contact */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <p className="font-semibold">Big Sand Volleyball Winnipeg</p>
          <p className="text-sm">bigsandvolleyballwinnipeg@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
