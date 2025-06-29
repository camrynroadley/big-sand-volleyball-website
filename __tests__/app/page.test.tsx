import { render, screen } from "@testing-library/react";
import HomePage from "../../src/app/page";

jest.mock("../../src/components/homeSections/Hero", () => ({
  Hero: () => <div data-testid="hero">Hero Section</div>,
}));

jest.mock("../../src/components/homeSections/UpcomingPrograms", () => ({
  UpcomingPrograms: () => <div data-testid="upcoming-programs">Programs Section</div>,
}));

describe("Home Page", () => {
  it("renders Hero and UpcomingPrograms components inside main", () => {
    render(<HomePage />);

    const main = screen.getByRole("main", { name: "Home Page" });
    expect(main).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("upcoming-programs")).toBeInTheDocument();
  });
});
