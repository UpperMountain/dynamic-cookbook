import { Combine } from "./pasta";
import { Step } from "../../lib/dependencyTree";
import Procedure, {
  simplify,
  mergeByChildren,
  repr
} from "../../lib/Procedure";

it("should create a Pasta without error", () => {
  new Combine(4);
});

it("should create Nodes from a Pasta without error", () => {
  const a = new Combine(4);
  a.getNode();
});

it("should work with simplify()", () => {
  class TwoPastas implements Procedure {
    constructor(public servesA: number, public servesB: number) {}
    getNode(): Step {
      return {
        kind: "step",
        name: "Two pastas, hopefully merged",
        body: "",
        requires: this.requires.map(e => e.getNode())
      };
    }
    requires = [new Combine(this.servesA), new Combine(this.servesB)];
    merge = mergeByChildren;
  }

  const root = new TwoPastas(1, 3);
  simplify(root);

  // The recipe must merge with itself properly.
  const reprA = repr(root.requires[0]);
  const reprB = repr(new Combine(4));

  expect(reprA).toEqual(reprB);
});
