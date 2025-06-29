/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import ProgramPage from "../../../src/app/programs/[slug]/page";
import { usePrograms } from "../../../src/context/ProgramContext";
import { useParams } from "next/navigation";

jest.mock("../../../src/context/ProgramContext", () => ({
  usePrograms: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../../src/components/programSections/Hero", () => ({
  Hero: ({ program }: { program: any }) => (
    <div data-testid="hero">{program.title}</div>
  ),
}));

jest.mock("../../../src/components/programSections/Information", () => ({
  Information: ({ program }: { program: any }) => (
    <div data-testid="information">{program.title}</div>
  ),
}));

jest.mock("../../../src/components/programSections/Form", () => ({
  Form: ({ program }: { program: any }) => (
    <form data-testid="form">{program.title}</form>
  ),
}));

describe("Program Page", () => {
  const mockProgram = {
    slug: "spring-camp",
    title: "Spring Camp",
    description: "Training session",
    cost: "$100",
    level: "Beginner",
    location: "Court A",
    target: "Grades 6-8",
    payment_instructions: "Send e-transfer to example@email.com",
    image_name: "spring.jpg",
    sessions: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders program content when a matching slug exists", () => {
    (usePrograms as jest.Mock).mockReturnValue([mockProgram]);
    (useParams as jest.Mock).mockReturnValue({ slug: "spring-camp" });

    render(<ProgramPage />);

    expect(screen.getByRole("main")).toHaveAttribute(
      "aria-label",
      "Spring Camp Program Page"
    );
    expect(screen.getByTestId("hero")).toHaveTextContent("Spring Camp");
    expect(screen.getByTestId("information")).toHaveTextContent("Spring Camp");
    expect(screen.getByTestId("form")).toHaveTextContent("Spring Camp");
  });

  it("renders nothing if program is not found", () => {
    (usePrograms as jest.Mock).mockReturnValue([
      { ...mockProgram, slug: "other-program" },
    ]);
    (useParams as jest.Mock).mockReturnValue({ slug: "non-existent" });

    render(<ProgramPage />);

    expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
    expect(screen.queryByTestId("information")).not.toBeInTheDocument();
    expect(screen.queryByTestId("form")).not.toBeInTheDocument();
  });
});
