import { render, screen } from "@testing-library/react";
import { Information } from "../../../src/components/homeSections/Information";

describe("Information", () => {
  it("renders the heading and subheading", () => {
    render(<Information />);

    expect(
      screen.getByText(/club information/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /learn more about us/i })
    ).toBeInTheDocument();
  });

  it("renders the informational paragraph", () => {
    render(<Information />);

    expect(
      screen.getByText(/check back regularly for new programs/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/you may sign-up for the waitlist/i)
    ).toBeInTheDocument();
  });
});
