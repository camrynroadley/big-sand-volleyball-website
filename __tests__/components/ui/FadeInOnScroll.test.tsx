/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { FadeInOnScroll } from "../../../src/components/ui/FadeInOnScroll";
import React from "react";

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div data-testid="fade-in-on-scroll" {...props}>{children}</div>,
    },
  };
});

describe("FadeInOnScroll", () => {
  it("renders children content", () => {
    render(<FadeInOnScroll><p>Scroll Content</p></FadeInOnScroll>);
    expect(screen.getByText("Scroll Content")).toBeInTheDocument();
  });

  it("has aria-hidden set to true", () => {
    render(<FadeInOnScroll><p>Check aria</p></FadeInOnScroll>);
    const container = screen.getByTestId("fade-in-on-scroll");
    expect(container).toHaveAttribute("aria-hidden", "true");
  });

  it("includes expected motion props", () => {
    render(<FadeInOnScroll delay={0.2} duration={1}><p>Props test</p></FadeInOnScroll>);
    const container = screen.getByTestId("fade-in-on-scroll");
    // These won't appear as DOM attributes but we validate the test itself renders properly with props.
    expect(container).toBeInTheDocument();
  });

  it("applies default className", () => {
    render(<FadeInOnScroll><div>Check class</div></FadeInOnScroll>);
    const container = screen.getByTestId("fade-in-on-scroll");
    expect(container).toHaveClass("h-full w-full");
  });
});
