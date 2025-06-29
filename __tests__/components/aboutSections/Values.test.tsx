/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Values } from "../../../src/components/aboutSections/Values";
import valuesData from "../../../src/stubs/valuesData.json";

jest.mock("../../../src/components/ui/FadeInOnScroll", () => ({
  FadeInOnScroll: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="fade-in">{children}</div>
  ),
}));

jest.mock("../../../src/components/ui/SectionHeading", () => ({
  SectionHeading: ({ id, label, title, description }: any) => (
    <div data-testid="section-heading" id={id}>
      <h2>{label}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("../../../src/components/ui/FloatingCard", () => ({
  CardContainer: ({ children, ...props }: any) => (
    <div data-testid="card-container" {...props}>
      {children}
    </div>
  ),
  CardBody: ({ children }: any) => <div data-testid="card-body">{children}</div>,
  CardItem: ({ children, ...props }: any) => (
    <div data-testid="card-item" {...props}>
      {children}
    </div>
  ),
}));

describe("Values", () => {
  it("renders the section heading with correct content", () => {
    render(<Values />);

    expect(screen.getByTestId("section-heading")).toBeInTheDocument();
    expect(screen.getByText("VALUES")).toBeInTheDocument();
    expect(screen.getByText("Our focus areas")).toBeInTheDocument();
    expect(
      screen.getByText(/We focus on developing these skills/i)
    ).toBeInTheDocument();
  });

  it("renders a card for each value", () => {
    render(<Values />);

    valuesData.forEach((value) => {
      expect(screen.getByText(value.name)).toBeInTheDocument();
      expect(screen.getByText(value.description)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("card-container")).toHaveLength(valuesData.length);
  });

  it("sets correct aria-labelledby attributes on cards", () => {
    render(<Values />);

    valuesData.forEach((_, index) => {
      const id = `value-title-${index}`;
      const container = screen.getAllByTestId("card-container")[index];
      expect(container).toHaveAttribute("aria-labelledby", id);
    });
  });

  it("renders FadeInOnScroll wrappers", () => {
    render(<Values />);
    expect(screen.getAllByTestId("fade-in")).toHaveLength(1 + valuesData.length); // 1 for heading + N cards
  });
});
