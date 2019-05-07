import { PastaRecipe } from "./pasta";
import { Step } from "../dependencyTree";
import Procedure, { simplify, mergeByChildren, repr } from "../Procedure";

it("should create a Pasta without error", () => {
  new PastaRecipe(4);
});

it("should create Nodes from a Pasta without error", () => {
  const a = new PastaRecipe(4);
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
    requires = [new PastaRecipe(this.servesA), new PastaRecipe(this.servesB)];
    merge = mergeByChildren;
  }

  const root = new TwoPastas(1, 3);
  console.log("both:", repr(root));
  simplify(root);
  console.log("simple:", repr(root));

  // The recipe must merge with itself properly.
  const reprA = repr(root.requires[0]);
  const reprB = repr(new PastaRecipe(4));

  expect(reprA).toEqual(reprB);
});
