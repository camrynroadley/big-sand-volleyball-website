import { render, screen } from "@testing-library/react";
import { Coaches } from "../../../src/components/aboutSections/Coaches";
import { Coach } from "../../../src/types/app";

jest.mock("../../../src/components/ui/Accordion", () => ({
Accordion: ({ coaches, ...props }: { coaches: Coach[] }) => (
    <div data-testid="accordion" {...props}>
      {coaches.map((coach) => (
        <div key={coach.name}>{coach.name}</div>
      ))}
    </div>
  ),
}));

interface SectionHeadingProps {
  id: string,
  label: string;
  title: string;
  description: string;
}

jest.mock("../../../src/components/ui/SectionHeading", () => ({
  SectionHeading: ({ title, label, description, id }: SectionHeadingProps) => (
    <div data-testid="section-heading" id={id}>
      <h2>{label}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

const mockCoaches: Coach[] = [
  { name: "Alex Morgan", description: "Experienced setter and coach" },
  { name: "Jamie Smith", description: "Former collegiate libero" },
];

describe("Coaches", () => {
  it("renders the section heading correctly", () => {
    render(<Coaches coaches={mockCoaches} />);

    expect(screen.getByText("COACHES")).toBeInTheDocument();
    expect(screen.getByText("Our current coaches")).toBeInTheDocument();
    expect(
      screen.getByText(/We are fortunate to have support/i)
    ).toBeInTheDocument();
  });

  it("renders the Accordion with coach names", () => {
    render(<Coaches coaches={mockCoaches} />);

    expect(screen.getByTestId("accordion")).toBeInTheDocument();
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("Jamie Smith")).toBeInTheDocument();
  });

  it("sets the aria-labelledby attribute on the Accordion", () => {
    render(<Coaches coaches={mockCoaches} />);

    const accordion = screen.getByTestId("accordion");
    expect(accordion).toHaveAttribute("aria-labelledby", "coaches-heading");
  });
});
