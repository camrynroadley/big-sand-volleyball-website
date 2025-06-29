/* eslint-disable @typescript-eslint/ban-ts-comment */
import { POST } from "../../../../src/app/api/registration/route";
import { registrationSchema } from "../../../../src/components/programSections/helpers/registrationSchema";

import { Request, Response, fetch } from "undici";

// @ts-ignore
global.Request = Request;
// @ts-ignore
global.Response = Response;
// @ts-ignore
global.fetch = fetch;


const mockInsert = jest.fn();
const mockFrom = jest.fn(() => ({ insert: mockInsert }));

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

const validBody = {
  child_first_name: "Jane",
  child_last_name: "Doe",
  parent_1_first_name: "John",
  parent_1_last_name: "Doe",
  parent_1_phone: "123-456-7890",
  parent_1_email: "john@example.com",
  grade: "6",
  agree_to_photos: true,
  agree_to_privacy: true,
  sessions: ["session-1"],
  program_slug: "spring-clinic",
};

describe("POST handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 200 on successful signup", async () => {
    mockInsert.mockResolvedValueOnce({ error: null });

    const request = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ message: "Signup successful!" });
  });

  it("returns 400 on validation failure", async () => {
    const invalidBody = { ...validBody, parent_1_email: "not-an-email" }; // invalid email

    const request = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify(invalidBody),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json).toHaveProperty("error", "Invalid input");
  });

  it("returns 500 if Supabase insert fails", async () => {
    mockInsert.mockResolvedValueOnce({
      error: { message: "Insert failed" },
    });

    const request = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "Insert failed" });
  });

  it("returns 500 on unexpected error", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      body: "invalid-json",
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toHaveProperty("error");
  });
});
