import { Step, MergeFunction } from "../lib/dependencyTree";
import { mergeApply } from "../lib/Procedure";
import * as Ingredients from "./ingredients";

export class ChopOnion implements Step {
  kind: "step" = "step";
  constructor(public amount: number) {}

  get name() {
    return `Chop ${this.amount} onions.`;
  }

  requires = [new Ingredients.Onion(this.amount)];

  merge: MergeFunction = mergeApply(
    (other: ChopOnion) => (this.amount += other.amount)
  );
}
