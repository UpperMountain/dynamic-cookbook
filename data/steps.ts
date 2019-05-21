import { Step, MergeFunction, mergeApply } from "../lib/graph";
import * as Ingredients from "./ingredients";

export class ChopOnion implements Step {
  kind: "step" = "step";
  constructor(public amount: number) {}

  get name() {
    return `Chop ${this.amount} onions.`;
  }

  until = "Onions are chopped";

  requires = [new Ingredients.Onion(this.amount)];

  merge: MergeFunction = mergeApply(
    (other: ChopOnion) => (this.amount += other.amount)
  );
}

export class SeparateEggs implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}

  get name() {
    return `Separate ${this.count} eggs.`;
  }

  body = `
 Crack the egg on a flat surface, separating both halves of the shell. __Do not__ dump out the egg.
 
 Over a bowl, repeatedly pour the egg back and forth between both halves of the shell, letting the white fall into the bowl, while keeping the yolk in one of the halves.
 
 Once the white and yolk are separated, pour the yolk into another bowl.
 
 Throw out the shell.
`;

  until = "Eggs are separated";

  requires = [new Ingredients.Egg(this.count)];

  merge: MergeFunction = mergeApply(
    (other: SeparateEggs) => (this.count += other.count)
  );
}

export class MeltButter implements Step {
  kind: "step" = "step";
  constructor(public tbsp: number) {}

  get name() {
    return `Melt ${this.tbsp} tablespoons of butter.`;
  }

  body = `
You can melt butter either in a pan, or in a microwave:

 - In a pan: heat the butter until it foams, slighly. No more, 
   no less---we don't want the butter to brown
 - In a microwave: put the butter in a microwave-safe container. 
   Microwave for 30s. Repeatedly microwave for 10s more, until the 
   butter is completely melted.

Set aside when it's melted.
`;

  until = "Butter is melted";

  requires = [new Ingredients.Butter(this.tbsp)];
}
