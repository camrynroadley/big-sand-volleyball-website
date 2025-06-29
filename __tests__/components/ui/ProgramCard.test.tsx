import { render, screen, fireEvent } from "@testing-library/react";
import { ProgramCard } from "../../../src/components/ui/ProgramCard";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("ProgramCard", () => {
  const mockProps = {
    slug: "summer-camp",
    title: "Summer Camp",
    description: "Join us for a fun and skill-building summer camp!",
    imagePath: "summer-camp",
  };

  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders title, description, and image", () => {
    render(<ProgramCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    const image = screen.getByAltText(mockProps.title);
    expect(image).toHaveAttribute("src", expect.stringContaining(mockProps.imagePath));
  });

  it("calls router.push when button is clicked", () => {
    render(<ProgramCard {...mockProps} />);

    const button = screen.getByRole("button", { name: /learn more/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith(`/programs/${mockProps.slug}`);
  });
});
