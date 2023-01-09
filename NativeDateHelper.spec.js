import { nativeDateHelper } from "./NativeDateHelper";

describe("NativeDateHelper", () => {
  describe("Helper tests", () => {
    it("toIso: should return an iso format", () => {
      expect(nativeDateHelper().toIso("1985", "08", "03")).toBe("1985-08-03");
    });

    it("isLeapYear: should return true for a leap year and false for none leap year", () => {
      // is leap year
      expect(nativeDateHelper().isLeapYear(2016)).toBe(true);

      // is no leap year
      expect(nativeDateHelper().isLeapYear(2019)).toBe(false);
    });
  });
});
