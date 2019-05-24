import { qty, plural } from "./plural";

describe("qty()", () => {
  it("works without exploding", () => {
    qty(14, 1, "apple", "apples");
  });

  it("passes snapshot tests", () => {
    expect([
      qty(12, 1, "potato", "potatoes"),
      qty(1, 1, "potato", "potatoes"),
      qty(1.234422222, 1, "tsp"),
      qty(124.3443, 0.5),
      qty(12.5, 1, "potato", "potatoes"),
      qty(-12.5, 1, "potato", "potatoes"),
      qty(-12.344343434, 0.25, "potato", "potatoes"),
      qty(-12.344343434, 0.5, "potato", "potatoes")
    ]).toMatchSnapshot();
  });
});

describe("plural()", () => {
  it("works without exploding", () => {
    plural(14, 1, "apple", "apples");
  });

  it("passes snapshot tests", () => {
    expect([
      plural(12, 1, "potato", "potatoes"),
      plural(1, 1, "potato", "potatoes"),
      plural(12.5, 1, "potato", "potatoes"),
      plural(-12.5, 1, "potato", "potatoes"),
      plural(1.2, 1, "potato", "potatoes"),
      plural(1, 0.5, "potato", "potatoes")
    ]).toMatchSnapshot();
  });
});
