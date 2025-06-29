import { render, screen } from "@testing-library/react";
import RootLayout from "../../src/app/layout";
import { createClient } from "../../src/utils/supabase/server";

jest.mock("../../src/utils/supabase/server", () => ({
  createClient: jest.fn(),
}));

jest.mock("../../src/components/ui/Navbar", () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

jest.mock("../../src/components/ui/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

jest.mock("../../src/context/ProgramContext", () => ({
  ProgramProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="program-provider">{children}</div>
  ),
}));

jest.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "mock-font-class" }),
}));

describe("Layout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders layout with Navbar, children, and Footer", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: jest.fn().mockResolvedValue({ data: [{ id: 1, slug: "test" }] }),
      }),
    });

    const Page = await RootLayout({ children: <div>Test Page Content</div> });
    render(Page);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("program-provider")).toBeInTheDocument();
    expect(screen.getByText("Test Page Content")).toBeInTheDocument();
  });

  it("handles missing Supabase data gracefully", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: () => ({
        select: jest.fn().mockResolvedValue({ data: null }),
      }),
    });

    const Page = await RootLayout({ children: <div>No Programs</div> });
    render(Page);

    expect(screen.getByText("No Programs")).toBeInTheDocument();
    expect(screen.getByTestId("program-provider")).toBeInTheDocument();
  });
});
