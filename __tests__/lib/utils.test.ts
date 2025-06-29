import { cn } from "../../src/lib/utils";

describe("cn utility", () => {
  it("merges multiple class strings", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
  });

  it("handles conditional classnames via clsx", () => {
    expect(cn("text-sm", { "font-bold": true, "italic": false })).toBe("text-sm font-bold");
  });

  it("merges conflicting Tailwind classes correctly", () => {
    expect(cn("p-2", "p-4")).toBe("p-4"); // tailwind-merge wins
  });

  it("handles undefined/null values", () => {
    expect(cn("text-sm", undefined, null, false, "font-bold")).toBe("text-sm font-bold");
  });

  it("returns empty string when no classes are provided", () => {
    expect(cn()).toBe("");
  });
});
