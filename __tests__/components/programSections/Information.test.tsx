import { render, screen } from "@testing-library/react";
import { Information } from "../../../src/components/programSections/Information";
import { Program } from "../../../src/types/app";

jest.mock("../../../src/components/ui/ProgramInfoText", () => ({
  ProgramInfoText: ({ label, info }: { label: string; info: string }) => (
    <div data-testid="program-info">
      <strong>{label}:</strong> <span>{info}</span>
    </div>
  ),
}));

describe("Information", () => {
  const mockProgram: Program = {
    slug: "mock-program",
    title: "Mock Program",
    description: "Description",
    cost: "$100",
    level: "Beginner",
    location: "Beach Court",
    target: "Grades 6–8",
    payment_instructions: "Send e-transfer to email@example.com",
    image_name: "program.jpg",
    cap: 24,
    sessions: [],
  };

  it("renders all ProgramInfoText components with correct props", () => {
    render(<Information program={mockProgram} />);

    expect(screen.getByText(/WHO:/i)).toBeInTheDocument();
    expect(screen.getByText(/Grades 6–8/i)).toBeInTheDocument();

    expect(screen.getByText(/COST:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();

    expect(screen.getByText(/HOW:/i)).toBeInTheDocument();
    expect(screen.getByText(/e-transfer/i)).toBeInTheDocument();

    expect(screen.getByText(/WHERE:/i)).toBeInTheDocument();
    expect(screen.getByText(/Beach Court/i)).toBeInTheDocument();

    expect(screen.getByText(/LEVEL:/i)).toBeInTheDocument();
    expect(screen.getByText(/Beginner/i)).toBeInTheDocument();
  });

  it("renders 5 ProgramInfoText items", () => {
    render(<Information program={mockProgram} />);
    const items = screen.getAllByTestId("program-info");
    expect(items).toHaveLength(5);
  });
});
