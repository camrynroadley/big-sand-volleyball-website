import { render, screen } from "@testing-library/react";
import { UpcomingPrograms } from "../../../src/components/homeSections/UpcomingPrograms";

jest.mock('../../../src/components/ui/ProgramCard', () => ({
    ProgramCard: ({title}: { title: string }) => <div>{title}</div>
}))

jest.mock("../../../src/components/ui/Carousel", () => ({
  Carousel: ({ items }: { items: JSX.Element[] }) => (
    <div data-testid="carousel">{items}</div>
  ),
}));

jest.mock("../../../src/components/ui/SectionHeading", () => ({
  SectionHeading: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

jest.mock("../../../src/components/ui/FadeInOnScroll", () => ({
  FadeInOnScroll: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock usePrograms hook
jest.mock("../../../src/context/ProgramContext", () => ({
  usePrograms: jest.fn(),
}));

import { usePrograms } from "../../../src/context/ProgramContext";
import { JSX } from "react";

describe("UpcomingPrograms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a single ProgramCard if one program exists", () => {
    (usePrograms as jest.Mock).mockReturnValue([
      {
        slug: "summer-camp",
        title: "Summer Camp",
        description: "A great camp",
        image_name: "camp.jpg",
      },
    ]);

    render(<UpcomingPrograms />);

    expect(screen.getByText("Level up your game")).toBeInTheDocument();
    expect(screen.getByText("Summer Camp")).toBeInTheDocument();
  });

  it("renders a Carousel if more than one program exists", () => {
    (usePrograms as jest.Mock).mockReturnValue([
      {
        slug: "spring-clinic",
        title: "Spring Clinic",
        description: "Skills training",
        image_name: "spring.jpg",
      },
      {
        slug: "fall-league",
        title: "Fall League",
        description: "Competitive play",
        image_name: "fall.jpg",
      },
    ]);

    render(<UpcomingPrograms />);

    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.getByText("Spring Clinic")).toBeInTheDocument();
    expect(screen.getByText("Fall League")).toBeInTheDocument();
  });
});
