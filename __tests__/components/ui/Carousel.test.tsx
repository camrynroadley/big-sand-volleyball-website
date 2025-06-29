import { render, screen, fireEvent, act } from "@testing-library/react";
import { Carousel } from "../../../src/components/ui/Carousel";
import React from "react";

jest.mock("framer-motion", () => {
  const original = jest.requireActual("framer-motion");
  return {
    ...original,
    motion: {
      ...original.motion,
      div: (props: any) => <div {...props} />,
      button: (props: any) => <button {...props} />,
    },
    useMotionValue: () => 0,
    useTransform: () => 0,
  };
});

const mockItems = [
  <div key="1">Item 1</div>,
  <div key="2">Item 2</div>,
  <div key="3">Item 3</div>,
];

jest.useFakeTimers();

describe("Carousel", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders all slides and nav dots", () => {
    render(<Carousel items={mockItems} />);
    const slides = screen.getAllByRole("group", { hidden: true });
    const tabs = screen.getAllByRole("tab");
    expect(slides.length).toBe(3);
    expect(tabs.length).toBe(3);
  });

  it("updates current slide when nav dot is clicked", () => {
    render(<Carousel items={mockItems} />);
    const tabButtons = screen.getAllByRole("tab");
    fireEvent.click(tabButtons[1]);
    expect(tabButtons[1]).toHaveAttribute("aria-selected", "true");
  });

  it("advances slides with autoplay", () => {
    render(<Carousel items={mockItems} autoplay autoplayDelay={1000} />);
    const tabs = screen.getAllByRole("tab");

    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(tabs[2]).toHaveAttribute("aria-selected", "true");
  });

  it("pauses autoplay on hover when pauseOnHover is true", () => {
    render(<Carousel items={mockItems} autoplay autoplayDelay={1000} pauseOnHover />);
    const container = screen.getByRole("region", { name: /carousel/i });
    const tabs = screen.getAllByRole("tab");

    fireEvent.mouseEnter(container);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Still on first slide due to pause
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.mouseLeave(container);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("responds to arrow key navigation", () => {
    render(<Carousel items={mockItems} />);
    const tabs = screen.getAllByRole("tab");

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });
});
