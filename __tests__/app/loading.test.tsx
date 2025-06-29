import { render, screen } from "@testing-library/react";
import Loading from "../../src/app/loading";

jest.mock("../../src/components/ui/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe("Loading", () => {
  it("renders Spinner", () => {
    render(<Loading />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
