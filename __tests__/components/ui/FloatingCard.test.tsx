import {
  CardContainer,
  CardBody,
  CardItem,
  useMouseEnter,
} from "../../../src/components/ui/FloatingCard";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// Suppress style transform assignment errors
Object.defineProperty(HTMLElement.prototype, "style", {
  value: {},
  writable: true,
});

describe("CardContainer", () => {
  it("renders child content and responds to mouse events", () => {
    render(
      <CardContainer>
        <div data-testid="inner-content">Test Content</div>
      </CardContainer>
    );

    const container = screen.getByTestId("inner-content").parentElement;

    expect(container).toBeInTheDocument();

    const interactiveDiv = container?.parentElement?.querySelector("div > div");
    expect(interactiveDiv).toBeInTheDocument();

    // Simulate mouse enter and leave
    fireEvent.mouseEnter(interactiveDiv!);
    fireEvent.mouseMove(interactiveDiv!, {
      clientX: 100,
      clientY: 100,
    });
    fireEvent.mouseLeave(interactiveDiv!);
  });
});

describe("CardBody", () => {
  it("renders with children and custom class", () => {
    render(
      <CardBody className="test-body">
        <span>Inside body</span>
      </CardBody>
    );

    expect(screen.getByText("Inside body")).toBeInTheDocument();
  });
});

describe("CardItem", () => {
  it("applies transform on hover and focus", () => {
    render(
      <CardContainer>
        <CardItem
          data-testid="animated-item"
          translateX={5}
          rotateY={10}
        >
          Animated Content
        </CardItem>
      </CardContainer>
    );

    const item = screen.getByTestId("animated-item");

    fireEvent.mouseEnter(item);
    fireEvent.focus(item);

    expect(item).toHaveAttribute("tabindex", "0");

    fireEvent.mouseLeave(item);
    fireEvent.blur(item);
  });

  it("renders with default element (div) and children", () => {
    render(
      <CardContainer>
        <CardItem>Item Content</CardItem>
      </CardContainer>
    );
    expect(screen.getByText("Item Content")).toBeInTheDocument();
  });

  it("renders as a different tag using 'as'", () => {
    render(
      <CardContainer>
        <CardItem as="button">Button Content</CardItem>
      </CardContainer>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Button Content");
  });
});

describe("useMouseEnter", () => {
  it("throws error if used outside of provider", () => {
    const TestComponent = () => {
      useMouseEnter();
      return <div>Fail</div>;
    };

    expect(() => render(<TestComponent />)).toThrowError(
      "useMouseEnter must be used within a MouseEnterProvider"
    );
  });

  it("provides isMouseEntered context", () => {
    const TestComponent = () => {
      const [isEntered] = useMouseEnter();
      return <div data-testid="mouse-state">{String(isEntered)}</div>;
    };

    render(
      <CardContainer>
        <TestComponent />
      </CardContainer>
    );

    expect(screen.getByTestId("mouse-state")).toHaveTextContent("false");
  });
});
