import { Step, MergeFunction, mergeApply } from "../lib/graph";
import * as Ingredients from "./ingredients";
import { qty, plural } from "../lib/plural";

export class ChopOnion implements Step {
  kind: "step" = "step";
  constructor(public amount: number) {}

  get name() {
    return `Chop ${qty(this.amount, 0.25, "onion", "onions")}.`;
  }

  until = "Onions are chopped";

  requires = [new Ingredients.Onion(this.amount)];

  merge: MergeFunction = mergeApply(
    (other: ChopOnion) => (this.amount += other.amount)
  );
}

export class BoilKettle implements Step {
  kind: "step" = "step";
  constructor(public cups: number) {}

  get name() {
    return `Boil ${qty(
      this.cups,
      0.25,
      "cup",
      "cups"
    )} of water in an electric kettle.`;
  }

  until = "Kettle is heating up";

  timer = { until: "Electric kettle is boiling", duration: 60 * 3 };

  merge: MergeFunction = mergeApply((other: BoilKettle) => {
    this.cups += other.cups;
  });

  requires = [];
}

export class SeparateEggs implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}

  get name() {
    return `Separate ${qty(this.count, 1, "egg", "eggs")}.`;
  }

  body = `
 Crack the egg on a flat surface, separating both halves of the shell. __Do not__ dump out the egg.
 
 Over a bowl, repeatedly pour the egg back and forth between both halves of the shell, letting the white fall into the bowl, while keeping the yolk in one of the halves.
 
 Once the white and yolk are separated, pour the yolk into another bowl.
 
 Throw out the shell.
`;

  until = `${plural(this.count, 1, "Egg is", "Eggs are")} separated`;

  requires = [new Ingredients.Egg(this.count)];

  merge: MergeFunction = mergeApply(
    (other: SeparateEggs) => (this.count += other.count)
  );
}

export class MeltButter implements Step {
  kind: "step" = "step";
  constructor(public tbsp: number) {}

  get name() {
    return `Melt ${qty(
      this.tbsp,
      0.25,
      "tablespoon",
      "tablespoons"
    )} of butter.`;
  }

  body = `
You can melt butter either in a pan, or in a microwave:

 - In a pan: heat the butter until it foams, slighly. No more, 
   no less---we don't want the butter to brown.
 - In a microwave: put the butter in a microwave-safe container. 
   Microwave for 30s. Repeatedly microwave for 15s more, until the 
   butter is completely melted.

Set aside when it's melted.
`;

  duration = 60 * 3; // measured, microwave way

  until = "Butter is melted";

  merge: MergeFunction = mergeApply(
    (other: MeltButter) => (this.tbsp += other.tbsp)
  );

  requires = [new Ingredients.Butter(this.tbsp)];
}
