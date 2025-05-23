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
  container: {
  position: "relative",
  display: "inline-flex",
    maxWidth: "fit-content",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    cursor: "pointer",
    overflow: "hidden",
    transition: "box-shadow 0.5s ease",
  },
  gradientBorder: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    borderRadius: 20,
    background: `linear-gradient(270deg, ${gradientColors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: "gradientShift 4s linear infinite",
  },
  innerBlack: {
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "white",
    width: "calc(100% - 2px)",
    height: "calc(100% - 2px)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
  },
  gradientText: {
    position: "relative",
    zIndex: 2,
    color: "transparent",
    background: `linear-gradient(270deg, ${gradientColors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: "gradientShift 8s linear infinite",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", // <= this line is crucial
  },
};

export default function GradientText({
  children,
  showBorder = false,
  className = "",
}) {
  return (
    <>
      <style>{gradientAnimation}</style>
      <span style={styles.container} className={className}>
        {showBorder && (
          <div style={styles.gradientBorder}>
            <div style={styles.innerBlack} />
          </div>
        )}
        <span style={styles.gradientText}>{children}</span>
      </span>
    </>
  );
}
