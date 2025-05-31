import React from "react";

const gradientColors = [
  "#750000",
  "#D70000",
  "#750000",
];

const gradientAnimation = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}
`;

const styles = {
  wrapper: {
    display: "inline-block",
    padding: 1, // Border thickness
    borderRadius: 9999,
    background: `linear-gradient(270deg, ${gradientColors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: "gradientShift 4s linear infinite",
  },
  inner: {
    padding: "3px 10px", // Padding around text
    borderRadius: 9999,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    background: `linear-gradient(270deg, ${gradientColors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: "gradientShift 4s linear infinite",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 500,
    letterSpacing: "-0.5px"
  },
};

export const GradientText = ({ children }) => {
  return (
    <>
      <style>{gradientAnimation}</style>
      <div style={styles.wrapper}>
        <div style={styles.inner}>
          <span style={styles.text}>{children}</span>
        </div>
      </div>
    </>
  );
}
