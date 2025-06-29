import { render, screen, fireEvent } from "@testing-library/react";
import { Hero } from "@/components/aboutSections/Hero";

jest.mock("../../../public/images/about_1.jpg", () => ({
  default: "/test-image-1.jpg",
}));

jest.mock("../../../public/images/about_2.jpg", () => ({
  default: "/test-image-2.jpg",
}));

jest.mock("../../../public/images/about_3.jpg", () => ({
  default: "/test-image-3.jpg",
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
        onLoad={onLoadingComplete} // use onLoad for manual control in tests
      />
    );
  },
}));

jest.mock("@/components/ui/BlurText", () => ({
  BlurText: (props: any) => (
    <div data-testid="blur-text" aria-label={props["aria-label"]}>
      {props.text}
    </div>
  ),
}));

jest.mock("@/components/ui/EmailForm", () => ({
  EmailForm: () => <form data-testid="email-form" />,
}));

jest.mock("@/components/ui/FadeInOnScroll", () => ({
  FadeInOnScroll: ({ children }: any) => (
    <div data-testid="fade-in">{children}</div>
  ),
}));

jest.mock("@/components/ui/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe("Hero", () => {
  it("renders the hero section with heading and description", () => {
    render(<Hero />);

    expect(
      screen.getByLabelText("Hero Section: Big Sand Volleyball Home Page")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Join the Big Sand family")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Big Sand Volleyball is a youth volleyball/i)
    ).toBeInTheDocument();
  });

  it("renders the email form inside FadeInOnScroll", () => {
    render(<Hero />);
    expect(screen.getByTestId("fade-in")).toContainElement(
      screen.getByTestId("email-form")
    );
  });

  it("shows Spinner while images are still loading", () => {
    // Override mock to delay image loading
    jest.resetModules();
    const onLoadFns: Function[] = [];

    jest.doMock("next/image", () => (props: any) => {
      onLoadFns.push(props.onLoadingComplete);
      return <img alt={props.alt} data-testid="mock-image" />;
    });

    const { Hero: DelayedHero } = require("@/components/aboutSections/Hero");

    const { queryByTestId } = render(<DelayedHero />);
    expect(queryByTestId("spinner")).toBeInTheDocument();

    // Simulate all images loading
    onLoadFns.forEach((fn) => fn());
    expect(queryByTestId("spinner")).not.toBeInTheDocument();
  });

  it("renders three images with correct alt text", () => {
    render(<Hero />);
    expect(
      screen.getByAltText("Volleyball player wearing a t-shirt with the Big Sand logo")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Group of girls practicing volleyball")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Two girls playing volleyball")
    ).toBeInTheDocument();
  });
});
