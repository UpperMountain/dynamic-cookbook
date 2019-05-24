import Recipe from "../../lib/Recipe";
import {
  Step,
  Node,
  mergeApply,
  MergeFunction,
  mergeByChildren
} from "../../lib/graph";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";
import { qty, plural } from "../../lib/plural";

interface Context {
  serves: number;
  frothStrategy: "whisk" | "machine";
  kettle: boolean;
}

const cupsFinalChai = 1;
const cupsFinalMilk = 1 / 2;

class WhiskFrothMilk implements Step {
  kind: "step" = "step";
  constructor(public cups: number) {}
  get name() {
    return `Froth ${qty(this.cups, 0.25, "cup", "cups")} of milk`;
  }
  get body() {
    return `
In a saucepan, heat ${qty(
      this.cups,
      0.25,
      "cup",
      "cups"
    )} of milk over medium heat, whisking strongly until frothy.
    `;
  }
  until = "Milk is frothy";
  requires = [new Ingredients.Milk(this.cups)];
  merge = mergeByChildren;
}

class MachineFrothMilk implements Step {
  kind: "step" = "step";
  constructor(public cups: number) {}
  get name() {
    return `Froth ${qty(this.cups, 0.25, "cup", "cups")} of milk`;
  }
  get body() {
    return `
Use an espresso machine to froth ${qty(this.cups, 0.25, "cup", "cups")} of milk.
    `;
  }
  until = "Milk is frothy";
  requires = [new Ingredients.Milk(this.cups)];
  merge = mergeByChildren;
}

class HeatChai implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  spoons = this.ctx.serves;

  name = "Heat up the chai";
  get body() {
    return `
Into a saucepan, measure ${qty(
      this.spoons,
      0.5,
      "heaping spoonful",
      "heaping spoonfuls"
    )} of chai.

Put the saucepan over medium-low heat, and warm up the spices.
    `;
  }

  until = "Chai is warming";

  requires = [new Ingredients.Chai(this.spoons)];
}

class BoilChai implements Step {
  kind: "step" = "step";
  requires: Node[] = [];
  constructor(public ctx: Context) {
    this.requires.push(new HeatChai(ctx));
    if (ctx.kettle) {
      this.requires.push(new Steps.BoilKettle(this.cups));
    }
  }
  cups = this.ctx.serves * cupsFinalChai * 2;

  name = "Boil the chai";
  get body() {
    const waterAmount = qty(this.cups, 0.25, "cup", "cups");
    const getWater = this.ctx.kettle
      ? `Add ${waterAmount} of hot water from the kettle to the saucepan with the chai.`
      : `Add ${waterAmount} of water to the saucepan with the chai.`;
    return `
${getWater}

Once the water has come to a steady boil, boil for 10 minutes.
    `;
  }

  until = "The tea is boiling" /*, sis! */;

  timer = { until: "Chai is dark in color", duration: 60 * 10 };

  merge: MergeFunction = mergeApply((other: BoilChai) => {
    this.cups += other.cups;
  });
}

class PourChai implements Step {
  kind: "step" = "step";

  requires: Step[] = [];
  constructor(public ctx: Context) {
    this.requires.push(new BoilChai(ctx));
    if (ctx.frothStrategy === "whisk") {
      this.requires.push(new WhiskFrothMilk(ctx.serves * cupsFinalMilk));
    } else if (ctx.frothStrategy === "machine") {
      this.requires.push(new MachineFrothMilk(ctx.serves * cupsFinalMilk));
    }
  }
  serves = this.ctx.serves;

  name = "Pour the chai";
  get body() {
    return `
Into ${plural(this.ctx.serves, 1, "a", "each")} mug:

- with a tea strainer, __strain__ ${qty(
      cupsFinalChai,
      0.25,
      "cup",
      "cups"
    )} of brewed chai
- pour ${qty(cupsFinalMilk, 0.25, "cup", "cups")} of steamed milk

Sprinkle cinnamon on top. Serve.
  `;
  }

  until = "Chai has been served";

  merge: MergeFunction = mergeApply((other: PourChai) => {
    this.serves += other.serves;
  });
}

export const ChaiLatte: Recipe = {
  name: "Chai Latte",
  body: "Warm, sweet, and spicy. Perfect for a cold day.",
  images: [require("../../assets/images/chai-latte-1.jpg")],
  config: [
    {
      id: "serves",
      kind: "integer",
      question: "How many servings?",
      min: 2,
      max: 8,
      default: 2
    },
    {
      id: "froth",
      kind: "categorical",
      question: "How should we froth the milk?",
      options: {
        whisk: "Whisk it on the stove (okay)",
        machine: "Using an espresso machine (much better)"
      },
      default: "machine"
    },
    {
      id: "kettle",
      kind: "categorical",
      question: "Do you have an electric kettle?",
      options: {
        true: "Yes, I have a kettle",
        false: "No, I don't"
      },
      default: "true"
    }
  ],
  requires: ({ serves, froth, kettle }) => [
    new PourChai({ serves, frothStrategy: froth, kettle: kettle == "true" })
  ]
};
