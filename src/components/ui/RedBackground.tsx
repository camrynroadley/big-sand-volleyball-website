import React from "react";

const SoftRedBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbd3d3] to-[#f7a1a1] z-0" />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1ElEQVRoge3VsQmCMBRF0azEIsYgZsQgD2MYP8Pu6B+iDjFzJt7nIbe35G85JUiBAgQIECBAgEDgCnh94RYZ9O6kgEUcH7hzpN/dAy6w1nRgEFsJv13rwB9R0mwAW8TbKYCnGg2A3Cg6g4wzEnmKrcKYVYE1hbp+2eHTFZriN03ESgI7mCJbGZgBXayE1A/8thG2Fsn0yTf9mXj4LBmKBoYwNwIPo0FJ5fURRkgV2Y4KDwYzzcb8A+YtW7F6i/RpAAAAAElFTkSuQmCC')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default SoftRedBackground;
