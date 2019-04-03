import shadow from "./shadow";

for (const x of [0, 0.2, 0.5, 1]) {
  describe(`shadow(${x})`, () => {
    it("should return an android elevation value", () => {
      const s = shadow(x);
      expect(s.elevation).toBeDefined();
    });

    it("should return ios shadow styles", () => {
      const s = shadow(x);
      expect(s.shadowColor).toBeDefined();
      expect(s.shadowRadius).toBeDefined();
      expect(s.shadowOpacity).toBeDefined();
      expect(s.shadowOffset).toBeDefined();
    });
  });
}
