import { render, screen } from "@testing-library/react";
import { ProgramInfoText } from "../../../src/components/ui/ProgramInfoText";
import React from "react";

describe("ProgramInfoText", () => {
  const mockProps = {
    label: "Program Level",
    info: "Beginner to Intermediate",
  };

  it("renders the label with red text and bold font", () => {
    render(<ProgramInfoText {...mockProps} />);
    const label = screen.getByText(mockProps.label);

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("text-[#DF0000]", "font-semibold");
  });

  it("renders the info text", () => {
    render(<ProgramInfoText {...mockProps} />);
    expect(screen.getByText(mockProps.info)).toBeInTheDocument();
  });

  it("has a wrapper div with border and padding", () => {
    render(<ProgramInfoText {...mockProps} />);
    const wrapper = screen.getByText(mockProps.label).parentElement;

    expect(wrapper).toHaveClass("border", "p-6", "mb-4", "rounded-sm");
  });
});
