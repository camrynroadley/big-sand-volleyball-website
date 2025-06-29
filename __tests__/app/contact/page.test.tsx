import { render, screen } from "@testing-library/react";
import ContactPage from "../../../src/app/contact/page";

jest.mock("../../../src/components/ui/BlurText", () => ({
  BlurText: ({ text }: { text: string }) => <h1>{text}</h1>,
}));

jest.mock("../../../src/components/ui/FadeIn", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("ContactPage", () => {
  it("renders the heading, title, and email link", () => {
    render(<ContactPage />);

    expect(screen.getByText("Questions?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Email us today/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Email Peter Roadley/i })
    ).toHaveAttribute(
      "href",
      "mailto:bigsandvolleyballwinnipeg@gmail.com"
    );
  });

  it("has appropriate ARIA structure", () => {
    render(<ContactPage />);

    expect(screen.getByRole("main", { name: "Contact Page" })).toBeInTheDocument();
    expect(
      screen.getByLabelText("Contact information")
    ).toHaveTextContent("Please send your messages to Peter Roadley");
  });
});
