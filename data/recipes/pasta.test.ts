import { Combine } from "./pasta";
import { Step, simplify, repr } from "../../lib/graph";

it("should create a Pasta without error", () => {
  new Combine(4);
});

it("should get attributes from a Pasta without error", () => {
  const a = new Combine(4);
  const _name = a.name;
});

it("should work with simplify()", () => {
  class TwoPastas implements Step {
    kind: "step" = "step";
    constructor(public servesA: number, public servesB: number) {}
    name = "Two pastas, hopefully merged";

    requires = [new Combine(this.servesA), new Combine(this.servesB)];
  }

  const root = new TwoPastas(1, 3);
  simplify(root);

  // The recipe must merge with itself properly.
  const reprA = repr(root.requires[0]);
  const reprB = repr(new Combine(4));

  // console.log("merged:\n", reprA);
  // console.log("not merged:\n", reprB);

  expect(reprA).toEqual(reprB);
});
