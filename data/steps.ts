import { Step, Node, MergeFunction, mergeApply } from "../lib/graph";
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

export class Espresso implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}

  get name() {
    return `Pull ${qty(this.count, 1, "espresso shot", "espresso shots")}`;
  }

  until = "Espresso is pulled";

  body = `Use whichever method you prefer.`;

  requires = [new Ingredients.Espresso(this.count)];

  merge: MergeFunction = mergeApply((other: Espresso) => {
    this.count += other.count;
  });
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

 - In a pan: heat the butter until it foams, slighly. No more, no less---we don't want the butter to brown.
 - In a microwave: put the butter in a microwave-safe container. Microwave for 30s. Repeatedly microwave for 15s more, until the butter is completely melted.

Set aside when it's melted.
`;

  duration = 60 * 3; // measured, microwave way

  until = "Butter is melted";

  merge: MergeFunction = mergeApply(
    (other: MeltButter) => (this.tbsp += other.tbsp)
  );

  requires = [new Ingredients.Butter(this.tbsp)];
}

export class HeatOven implements Step {
  kind: "step" = "step";
  constructor(public degrees: number) {}
  get name() {
    return `Preheat an oven to ${qty(this.degrees, 1, "degrees")}.`;
  }

  until = "Oven is heating up";
  timer = { until: "Oven has preheated", duration: 60 * 20 };

  requires = [];
  merge(other: Node) {
    if (other instanceof HeatOven && other.degrees === this.degrees) {
      return this;
    }
    return null;
  }
}

export class HeatPan implements Step {
  kind: "step" = "step";

  // the <NOUN> is on the heat
  // wait for N seconds for it to heat up
  constructor(public noun: "cast iron skillet" | "pan") {}
  wait: number = this.noun == "cast iron skillet" ? 60 * 3 : 40;

  get name() {
    return `Heat up the ${this.noun}`;
  }
  get body() {
    return `Put the ${this.noun} over medium heat.`;
  }
  get timer() {
    return { duration: this.wait, until: `The ${this.noun} is hot.` };
  }
  get until() {
    return `The ${this.noun} is on the heat`;
  }
  requires = [];

  merge(other: Node) {
    if (other instanceof HeatPan && other.noun === this.noun) {
      return this;
    }

    return null;
  }
}

export class CrushGarlic implements Step {
  kind: "step" = "step";
  constructor(public cloves: number) {}

  get name() {
    return `Crush ${qty(this.cloves, 0.5, "clove", "cloves")} of garlic.`;
  }
  body = `The easiest way is with a garlic press, if you have one. If not, mash each clove with the flat of a knife, pull off the skin, and chop finely.`;
  until = "The garlic is crushed";
  requires = [new Ingredients.Garlic(this.cloves)];
  merge: MergeFunction = mergeApply((other: CrushGarlic) => {
    this.cloves += other.cloves;
  });
}

export class ChopRosemary implements Step {
  kind: "step" = "step";
  constructor(public sprigs: number) {}

  get name() {
    return `Crush ${qty(this.sprigs, 0.5, "sprig", "sprigs")} of rosemary.`;
  }
  body = `You'll want to separate and discard the larger stems first---it's the leaves you want to eat. Then, chop the rosemary using a sharp knife. `;
  until = "The rosemary is chopped";
  requires = [new Ingredients.Rosemary(this.sprigs)];
  merge: MergeFunction = mergeApply((other: ChopRosemary) => {
    this.sprigs += other.sprigs;
  });
}
