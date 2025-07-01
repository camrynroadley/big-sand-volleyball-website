import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "../../../src/components/programSections/Form";
import { formContent } from "../../../src/components/programSections/helpers/formContent";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        message: "Subscribed!",
      }),
  })
) as jest.Mock;

const mockProgram = {
  slug: "spring-camp",
  sessions: [
    { id: 1, isFull: false },
    { id: 2, isFull: true },
  ],
};

describe("Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all visible form inputs", () => {
    render(<Form program={mockProgram} />);

    formContent.forEach((field) => {
      if (field.type !== "checkbox") {
        expect(screen.getByLabelText(field.label)).toBeInTheDocument();
      } else {
        expect(screen.getByText(field.label)).toBeInTheDocument();
      }
    });

    expect(screen.getByText("Sessions:")).toBeInTheDocument();
    expect(screen.getByText("Session 1")).toBeInTheDocument();
    expect(screen.getByText("Waitlist Session 2")).toBeInTheDocument();
  });

  it("shows error if sessions are not selected", async () => {
    render(<Form program={mockProgram} />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it("submits successfully with valid data", async () => {
    render(<Form program={mockProgram} />);

    // Fill required fields...
    fireEvent.change(screen.getByLabelText("Child First Name *"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText("Child Last Name *"), {
      target: { value: "Smith" },
    });
    fireEvent.change(
      screen.getByLabelText("Parent or Guardian 1 First Name *"),
      {
        target: { value: "John" },
      }
    );
    fireEvent.change(
      screen.getByLabelText("Parent or Guardian 1 Last Name *"),
      {
        target: { value: "Doe" },
      }
    );
    fireEvent.change(
      screen.getByLabelText("Parent or Guardian 1 Phone Number *"),
      {
        target: { value: "1234567890" },
      }
    );
    fireEvent.change(screen.getByLabelText("Parent or Guardian 1 Email *"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Grade *"), {
      target: { value: "6" },
    });

    // Checkboxes
    fireEvent.click(
      screen.getByRole("checkbox", { name: /collection of this information/i })
    );
    fireEvent.click(screen.getByText("Session 1"));

    fireEvent.click(screen.getByText("Submit"));

    const successMessage = await screen.findByText(/Thank you for signing up/i);
    expect(successMessage).toBeInTheDocument();
  });
});
