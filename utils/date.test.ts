import { formatDate } from "./date";

describe("formatDate", () => {
  it("returns readable date for ISO input", () => {
    expect(formatDate("2026-07-24")).toBe("24 jul 2026");
  });
});
