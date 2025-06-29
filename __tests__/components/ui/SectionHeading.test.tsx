import { render, screen } from "@testing-library/react";
import { SectionHeading } from "../../../src/components/ui/SectionHeading";

jest.mock("../../../src/components/ui/BlurText", () => ({
  BlurText: ({ text }: { text: string }) => <span>{text}</span>,
}));

jest.mock("../../../src/components/ui/FadeInOnScroll", () => ({
  FadeInOnScroll: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("SectionHeading", () => {
  it("renders the label, title, and description", () => {
    render(
      <SectionHeading
        id="test-section"
        label="UPCOMING PROGRAMS"
        title="Level up your game"
        description="Check back regularly for new programs and sessions."
      />
    );

    expect(screen.getByText("UPCOMING PROGRAMS")).toBeInTheDocument();
    expect(screen.getByText("Level up your game")).toBeInTheDocument();
    expect(
      screen.getByText(/check back regularly for new programs/i)
    ).toBeInTheDocument();

    // Assert the element with the ID exists
    const section = document.getElementById("test-section");
    expect(section).toBeInTheDocument();
  });
});
