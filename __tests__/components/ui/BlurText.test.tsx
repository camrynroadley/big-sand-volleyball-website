import { render, screen } from "@testing-library/react";
import { BlurText } from "../../../src/components/ui/BlurText";
import React from "react";

// Enhanced framer-motion mock
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    __esModule: true,
    motion: {
      span: ({ children, onAnimationComplete, ...rest }: any) => {
        React.useEffect(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, []);
        return (
          <span data-testid="blur-span" {...rest}>
            {children}
          </span>
        );
      },
    },
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = jest.fn(() => {
    this.callback([{ isIntersecting: true, target: {} } as IntersectionObserverEntry], this);
  });
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.IntersectionObserver = MockIntersectionObserver as any;

describe("BlurText", () => {
  it("renders text split by words by default", () => {
    render(<BlurText text="Hello world" />);
    const spans = screen.getAllByTestId("blur-span");
    expect(spans.length).toBe(2); // "Hello", "world"
  });

  it("renders text split by letters when animateBy='letters'", () => {
    render(<BlurText text="Hi!" animateBy="letters" />);
    const spans = screen.getAllByTestId("blur-span");
    expect(spans.length).toBe(3); // "H", "i", "!"
  });

  it("renders spans after intersection triggers inView", () => {
    render(<BlurText text="Visible now" />);
    const spans = screen.getAllByTestId("blur-span");
    spans.forEach((span) => {
      expect(span).toBeInTheDocument();
    });
  });

  it("calls onAnimationComplete on the last span", () => {
    const onComplete = jest.fn();
    render(<BlurText text="One Two" onAnimationComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1); // Only called once by the last span
  });
});
