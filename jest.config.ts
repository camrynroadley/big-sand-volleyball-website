import nextJest from "next/jest";
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx,js,jsx}",
    "src/components/**/*.{ts,tsx,js,jsx}",
    "src/context/**/*.{ts,tsx,js,jsx}",
    "src/lib/**/*.{ts,tsx,js,jsx}",
    "src/utils/supabase/server.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/*.d.ts",
    "!**/__tests__/**",
    "!**/test-utils/**",
  ],
  coverageReporters: ['text', 'lcov'],
};

export default createJestConfig(customJestConfig);
