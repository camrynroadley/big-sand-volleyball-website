import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/programSections/Hero";
import { Program } from "@/types/app";

// Mock child components
jest.mock("../../ui/BlurText", () => ({
  BlurText: ({ text }: { text: string }) => <div data-testid="blur-text">{text}</div>,
}));

jest.mock("../../ui/FadeInOnScroll", () => ({
  FadeInOnScroll: ({ children }: { children: React.ReactNode }) => <div data-testid="fade-in">{children}</div>,
}));

describe("Hero", () => {
  const baseProgram: Program = {
    title: "Summer Volleyball Camp",
    sessions: [],
  };

  it("renders BlurText with the program title", () => {
    render(<Hero program={{ ...baseProgram, sessions: [] }} />);
    expect(screen.getByTestId("blur-text")).toHaveTextContent("Summer Volleyball Camp");
  });

  it("renders a single session correctly", () => {
    const singleSession = {
      id: 1,
      date: "July 10",
      time: "10:00 AM - 12:00 PM",
      isFull: false,
    };

    render(<Hero program={{ ...baseProgram, sessions: [singleSession] }} />);
    expect(screen.getByText("July 10 ● 10:00 AM - 12:00 PM")).toBeInTheDocument();
  });

  it("renders multiple sessions (not full) correctly", () => {
    const sessions = [
      { id: 1, date: "July 10", time: "10:00 AM", isFull: false },
      { id: 2, date: "July 11", time: "11:00 AM", isFull: false },
    ];

    render(<Hero program={{ ...baseProgram, sessions }} />);

    sessions.forEach((session) => {
      expect(screen.getByText(`Session ${session.id}`)).toBeInTheDocument();
      expect(screen.getByText(session.date)).toBeInTheDocument();
      expect(screen.getByText(session.time)).toBeInTheDocument();
    });
  });

  it("renders multiple sessions with full indicator", () => {
    const sessions = [
      { id: 1, date: "July 10", time: "10:00 AM", isFull: true },
      { id: 2, date: "July 11", time: "11:00 AM", isFull: false },
    ];

    render(<Hero program={{ ...baseProgram, sessions }} />);

    expect(screen.getByText("Session 1")).toBeInTheDocument();
    expect(screen.getByText("FULL")).toBeInTheDocument();
    expect(screen.getByText("Session 2")).toBeInTheDocument();
    expect(screen.queryByText("FULL")).toBeInTheDocument(); // still only one "FULL"
  });
});
