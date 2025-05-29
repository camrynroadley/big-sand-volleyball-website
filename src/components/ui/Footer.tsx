import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111111] text-white py-6 px-4">
      <div className="flex justify-end max-w-2xl md:max-w-6xl">
        <div className="text-right">
          <p className="font-semibold text-sm">Big Sand Volleyball Winnipeg</p>
          <p className="text-xs">bigsandvolleyballwinnipeg@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
