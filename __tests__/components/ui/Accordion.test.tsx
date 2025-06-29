import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "../../../src/components/ui/Accordion";
import React from "react";

jest.mock("../../../src/components/ui/FadeInOnScroll", () => ({
  FadeInOnScroll: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockCoaches = [
  {
    name: "Coach Alice",
    description: "Alice is a national-level player and experienced coach.",
  },
  {
    name: "Coach Bob",
    description: "Bob has coached for 10 years in competitive leagues.",
  },
];

describe("Accordion", () => {
  it("renders all coach names", () => {
    render(<Accordion coaches={mockCoaches} />);

    expect(screen.getByText("Coach Alice")).toBeInTheDocument();
    expect(screen.getByText("Coach Bob")).toBeInTheDocument();
  });

  it("does not show any descriptions by default", () => {
    render(<Accordion coaches={mockCoaches} />);

    const panel1 = screen.getByText(mockCoaches[0].description).parentElement
      ?.parentElement;
    const panel2 = screen.getByText(mockCoaches[1].description).parentElement
      ?.parentElement;

    expect(panel1).toHaveClass("max-h-0");
    expect(panel2).toHaveClass("max-h-0");
  });
});
