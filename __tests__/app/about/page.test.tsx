/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import AboutPage from "../../../src/app/about/page";

jest.mock("../../../src/components/aboutSections/Hero", () => ({
  Hero: () => <div data-testid="hero">Hero</div>,
}));

jest.mock("../../../src/components/aboutSections/Values", () => ({
  Values: () => <div data-testid="values">Values</div>,
}));

jest.mock("../../../src/components/aboutSections/Coaches", () => ({
  Coaches: ({ coaches }: { coaches: any[] }) => (
    <div data-testid="coaches">{`Coaches: ${coaches.length}`}</div>
  ),
}));

const mockSelect = jest.fn();
const mockFrom = jest.fn(() => ({ select: mockSelect }));

jest.mock("../../../src/utils/supabase/server", () => ({
  createClient: jest.fn(() => ({
    from: mockFrom,
  })),
}));

describe("AboutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Hero and Values sections", async () => {
    mockSelect.mockResolvedValueOnce({ data: [] });

    const Page = await AboutPage();
    render(Page);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("values")).toBeInTheDocument();
    expect(screen.queryByTestId("coaches")).not.toBeInTheDocument();
  });

  it("renders Coaches section when data is returned", async () => {
    mockSelect.mockResolvedValueOnce({
      data: [{ id: 1, name: "Coach A" }, { id: 2, name: "Coach B" }],
    });

    const Page = await AboutPage();
    render(Page);

    expect(screen.getByTestId("coaches")).toHaveTextContent("Coaches: 2");
  });
});
