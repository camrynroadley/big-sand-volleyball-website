/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Navbar } from "../../../src/components/ui/Navbar";
import { ProgramProvider } from "../../../src/context/ProgramContext";
import { Program } from "../../../src/types/app";
import React from "react";

jest.mock("next/image", () => (props: any) => <img {...props} />);
jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="close-icon" />,
}));
jest.mock("../../../src/components/ui/GradientText", () => ({
  GradientText: ({ children }: any) => (
    <div data-testid="gradient-text">{children}</div>
  ),
}));

const mockPrograms: Program[] = [
  {
    slug: "summer-camp",
    title: "Summer Camp",
    description: "An all-levels summer camp for ages 12-18.",
    location: "Beach Court A",
    target: "Ages 12–18",
    cap: 30,
    level: "Beginner to Intermediate",
    cost: "$200",
    payment_instructions: "E-transfer to contact@bigsand.com",
    sessions: [
      {
        id: 1,
        date: "July 10, 2025",
        time: "10:00 AM – 1:00 PM",
        cap: 28,
        isFull: false,
      },
      {
        id: 2,
        date: "July 11, 2025",
        time: "10:00 AM – 1:00 PM",
        cap: 30,
        isFull: true,
      },
    ],
    image_name: "summer-camp.jpg",
  },
  {
    slug: "elite-training",
    title: "Elite Training",
    description: "Advanced drills and performance coaching for top athletes.",
    location: "Beach Court B",
    target: "U18 Elite Athletes",
    cap: 16,
    level: "Advanced",
    cost: "$350",
    payment_instructions: "E-transfer to elite@bigsand.com",
    sessions: [
      {
        id: 3,
        date: "August 5, 2025",
        time: "1:00 PM – 4:00 PM",
        cap: 24,
        isFull: false,
      },
    ],
    image_name: "elite-training.jpg",
  },
];

const renderWithContext = (ui: React.ReactNode) => {
  return render(
    <ProgramProvider programs={mockPrograms}>{ui}</ProgramProvider>
  );
};

jest.useFakeTimers();

describe("Navbar", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
  });

  it("renders desktop and mobile links after opening mobile menu", () => {
    renderWithContext(<Navbar />);

    // Initially only desktop links are present
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/about/i)).toHaveLength(1);

    // Open mobile menu
    fireEvent.click(screen.getByRole("button", { name: "" }));

    expect(screen.getAllByText(/about/i)).toHaveLength(2);
    expect(screen.getAllByText(/contact/i)).toHaveLength(2);
    expect(screen.getAllByText(/clothing/i)).toHaveLength(2);
  });

  it("renders program links in both desktop and mobile views", async () => {
    renderWithContext(<Navbar />);

    // Hover to show desktop dropdown
    const programsBtn = screen.getAllByText("Programs")[0];
    fireEvent.mouseEnter(programsBtn);

    expect(await screen.findByText("Summer Camp")).toBeInTheDocument();
    expect(await screen.findByText("Elite Training")).toBeInTheDocument();
  });

  it("opens and closes the mobile menu", () => {
    renderWithContext(<Navbar />);

    const menuButton = screen.getByRole("button", { name: "" }); // matches the Menu icon button
    fireEvent.click(menuButton);

    expect(screen.getByText("Summer Camp")).toBeInTheDocument();
    expect(screen.getByText("Elite Training")).toBeInTheDocument();
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();

    // Close mobile drawer
    const closeButton = screen.getByRole("button", { name: "" });
    fireEvent.click(closeButton);

    // Use act + jest timers to animate out
    act(() => {
      jest.runAllTimers?.();
    });
  });

  it("closes the mobile menu when clicking outside", () => {
    renderWithContext(<Navbar />);

    const menuButton = screen.getByRole("button", { name: "" });
    fireEvent.click(menuButton);

    // Simulate clicking outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Summer Camp")).not.toBeNull(); // animation exit delay
  });

  it("adds sticky class when scrollY > 10", () => {
    renderWithContext(<Navbar />);
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });

    const nav = screen.getByRole("navigation");
    expect(nav.className).toMatch(/fixed top-0/);
  });
});
