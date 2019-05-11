import { Step } from "../lib/dependencyTree";
import Procedure from "../lib/Procedure";
import * as Ingredients from "./ingredients";

export class ChopOnion implements Procedure {
  constructor(public amount: number) {}
  getNode(): Step {
    return {
      kind: "step",
      name: `Chop ${this.amount} onions.`,
      requires: this.requires.map(e => e.getNode())
    };
  }
  requires = [new Ingredients.Onion(this.amount)];
  merge(other: Procedure) {
    if (other instanceof ChopOnion) {
      this.amount += other.amount;
      this.requires = this.requires.concat(other.requires);
      return this;
    }
    return null;
  }
}
