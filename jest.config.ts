import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx,js,jsx}",
    "src/components/**/*.{ts,tsx,js,jsx}",
    "src/context/**/*.{ts,tsx,js,jsx}",
    "src/lib/**/*.{ts,tsx,js,jsx}",
    "src/utils/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/*.d.ts",
    "!**/__tests__/**",
    "!**/test-utils/**",
  ],

  coverageReporters: ["text", "lcov"],
};

export default createJestConfig(customJestConfig);
