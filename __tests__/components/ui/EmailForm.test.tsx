import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EmailForm } from "../../../src/components/ui/EmailForm";

describe("Email Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  it("renders the email input and submit button", () => {
    render(<EmailForm />);
    expect(screen.getByPlaceholderText(/your email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("displays success message when submission succeeds", async () => {
    render(<EmailForm />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/thanks for signing up for the big sand volleyball club mailing list/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "This email is already subscribed." }),
    });

    render(<EmailForm />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/already subscribed/i)).toBeInTheDocument();
    });
  });
});
