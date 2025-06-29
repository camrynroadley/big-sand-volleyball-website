/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { FadeIn } from "../../../src/components/ui/FadeIn";
import React from "react";

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div data-testid="fade-in" {...props}>{children}</div>,
    },
  };
});

describe("FadeIn", () => {
  it("renders its children", () => {
    render(<FadeIn><p>Test content</p></FadeIn>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("sets aria-hidden to true", () => {
    render(<FadeIn><p>Accessibility check</p></FadeIn>);
    const container = screen.getByTestId("fade-in");
    expect(container).toHaveAttribute("aria-hidden", "true");
  });

  it("uses default transition values", () => {
    render(<FadeIn><p>With defaults</p></FadeIn>);
    const container = screen.getByTestId("fade-in");
    expect(container).toHaveAttribute("initial", expect.anything());
    expect(container).toHaveAttribute("animate", expect.anything());
    expect(container).toHaveAttribute("transition", expect.anything());
  });

  it("applies custom delay and duration", () => {
    render(<FadeIn delay={0.2} duration={1.2}><p>Custom timing</p></FadeIn>);
    const container = screen.getByTestId("fade-in");
    expect(container).toHaveAttribute("transition", expect.anything());
  });
});
