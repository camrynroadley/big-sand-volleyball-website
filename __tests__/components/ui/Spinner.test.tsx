import { render, screen } from "@testing-library/react";
import { Spinner } from "../../../src/components/ui/Spinner";

describe("Spinner", () => {
  it("renders the spinner container", () => {
    render(<Spinner />);
    expect(screen.getByTestId("spinner-container")).toBeInTheDocument();
  });

  it("renders a spinning inner circle with correct classes", () => {
    render(<Spinner />);
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      "w-8",
      "h-8",
      "border-4",
      "border-gray-300",
      "border-t-red-500",
      "rounded-full",
      "animate-spin"
    );
  });
});
