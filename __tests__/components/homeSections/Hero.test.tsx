/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Hero } from "../../../src/components/homeSections/Hero";

jest.mock("../../../src/components/ui/BlurText", () => ({
  BlurText: ({ text }: { text: string }) => <div>{text}</div>,
}));
jest.mock("../../../src/components/ui/FadeIn", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock("../../../src/components/ui/EmailForm", () => ({
  EmailForm: () => <form data-testid="email-form" />,
}));
jest.mock("../../../src/components/ui/Spinner", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt, onLoadingComplete, ...rest } = props;
    return (
      <img
        alt={alt}
        {...rest}
        data-testid="mock-image"
        onLoad={onLoadingComplete}
      />
    );
  },
}));

describe("Hero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial spinner before images load", () => {
    render(<Hero />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders text and email form", async () => {
    render(<Hero />);
    expect(screen.getByText("For the love of the game.")).toBeInTheDocument();
    expect(
      screen.getByText(/Big Sand Volleyball Club has offered club volleyball/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("email-form")).toBeInTheDocument();
  });

  it("renders all three images", () => {
    render(<Hero />);
    const images = screen.getAllByTestId('mock-image');
    expect(images.length).toBe(3);
  });
});
