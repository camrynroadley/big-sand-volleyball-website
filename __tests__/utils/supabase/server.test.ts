import { createClient } from "../../../src/utils/supabase/server";

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("createClient", () => {
  const mockGetAll = jest.fn();
  const mockSet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
  });

  it("calls createServerClient with expected arguments", async () => {
    const { createServerClient } = require("@supabase/ssr");
    const { cookies } = require("next/headers");

    cookies.mockResolvedValue({
      getAll: mockGetAll,
      set: mockSet,
    });

    await createClient();

    expect(createServerClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "service-role-key",
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      })
    );
  });

  it("setAll gracefully ignores Server Component context errors", async () => {
    const { createServerClient } = require("@supabase/ssr");
    const { cookies } = require("next/headers");

    const mockCookieStore = {
      getAll: jest.fn(),
      set: jest.fn(() => {
        throw new Error("cannot set cookie");
      }),
    };

    cookies.mockResolvedValue(mockCookieStore);

    await createClient();

    const options = {
      cookies: {
        getAll: mockCookieStore.getAll,
        setAll: expect.any(Function),
      },
    };

    expect(createServerClient).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      })
    );

    // Try calling setAll manually to confirm it doesn't throw
    const callArgs = createServerClient.mock.calls[0][2];
    expect(() =>
      callArgs.cookies.setAll([{ name: "foo", value: "bar", options: {} }])
    ).not.toThrow();
  });
});
