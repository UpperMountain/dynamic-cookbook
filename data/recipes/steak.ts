import Recipe from "../../lib/Recipe";
import { Step } from "../../lib/graph";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";
import { qty, plural } from "../../lib/plural";

interface Context {
  serves: number;
  doneness: "rare" | "medRare" | "medium";
}

// TODO: merge functions

export class CookGarlic implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}

  tbspButter = this.ctx.serves * 2;
  clovesGarlic = Math.sqrt(this.ctx.serves) * 4;

  name = "Cook the garlic in butter";
  get body() {
    return `Over medium-low heat, melt ${qty(
      this.tbspButter,
      0.25,
      "tbsp"
    )} of butter over ${qty(
      this.clovesGarlic,
      0.5,
      "clove",
      "cloves"
    )} of crushed garlic. Cook until fragrant---stop as the garlic turns transparent, before it starts turning brown.`;
  }
  until = "Garlic and butter is on the heat";
  timer = { until: "Garlic is fragrant", duration: 60 * 3 };
  requires = [
    new Steps.CrushGarlic(this.clovesGarlic),
    new Ingredients.Butter(this.tbspButter),
    new Steps.HeatPan("pan")
  ];
}

export class CookRosemary implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  sprigs = this.ctx.serves * 1;

  name = "Add rosemary to the compound butter";
  get body() {
    return `Add ${qty(
      this.sprigs,
      0.5,
      "sprig",
      "sprigs"
    )} of chopped rosemary to the pan. Cook until it darkens slightly.`;
  }
  until = "Rosemary is on the heat";
  timer = { until: "Rosemary has darkened very slightly", duration: 60 * 1 };

  requires = [new CookGarlic(this.ctx), new Steps.ChopRosemary(this.sprigs)];
}

export class CombineButter implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  tbspButter = this.ctx.serves * 4;
  name = "Incorporate the rest of the butter";
  get body() {
    return `In a small bowl, combine the butter/garlic/rosemary mixture with ${qty(
      this.tbspButter,
      0.25,
      "tbsp"
    )} of extra butter. Mash it up with a fork until well combined.`;
  }
  until = "Butter is well combined";
  requires = [
    new CookRosemary(this.ctx),
    new Ingredients.Butter(this.tbspButter)
  ];
}

export class CompoundButter implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}

  name = "Chill the compound butter";
  get body() {
    return `Leave the compound butter in the fridge to set up.`;
  }
  until = "Butter is in the fridge";
  timer = { until: "Compound butter is solid", duration: 10 * 60 };
  requires = [new CombineButter(this.ctx)];
}

export class SeasonSteaks implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  count = this.ctx.serves;

  get name() {
    return `Season the ${plural(this.count, 1, "steak", "steaks")}.`;
  }
  get body() {
    return `Rub a generous amount of salt and pepper into all sides of ${qty(
      this.count,
      1,
      "the steak",
      "each steak"
    )}. When done, let rest for 45 minutes.`;
  }
  get until() {
    return `The ${plural(this.count, 1, "steak is", "steaks are")} seasoned.`;
  }
  timer = { until: "Steaks have rested", duration: 60 * 45 };
  requires = [new Ingredients.BoneInRibeye(this.count)];
}

export class CookSteaks implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  name = "Cook the steaks";
  get body() {
    return `Put the steaks in the oven for two hours, or until a thermometer reads around 125 degrees.`;
  }
  until = "The steaks are in the oven";
  timer = { until: "The steaks are 125 degrees inside", duration: 60 * 60 * 2 };

  requires = [new Steps.HeatOven(250), new SeasonSteaks(this.ctx)];
}

export class RestSteaks implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  get name() {
    return `Rest the ${plural(this.ctx.serves, 1, "steak", "steaks")}.`;
  }
  get body() {
    return `Cover with tinfoil and a paper towel. Rest for at least 20 minutes.`;
  }
  until = "Steaks are resting";
  timer = { until: "Steaks are done resting", duration: 60 * 20 };
  requires = [new CookSteaks(this.ctx)];
}

export class SearSteaks implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  get name() {
    return `Sear the ${plural(this.ctx.serves, 1, "steak", "steaks")}.`;
  }
  get body() {
    const sideTime = { rare: 15, medRare: 20, medium: 30 }[this.ctx.doneness];
    return `Make the pan __extremely__ hot. Melt 1 tbsp of the compound butter in the pan. Add a steak. Cook for ${sideTime} seconds a side.
      
      ${this.ctx.serves > 1 ? "Repeat for each steak." : ""}`;
  }
  until = "Outside of steak looks brown";
  requires = [new RestSteaks(this.ctx), new Steps.HeatPan("cast iron skillet")];
}

export class Slather implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  get name() {
    return `Slather the ${plural(this.ctx.serves, 1, "steak", "steaks")}.`;
  }
  get body() {
    return `Right before you serve, add a dollop of compound butter to the top of ${plural(
      this.ctx.serves,
      1,
      "the steak",
      "each steak"
    )}.`;
  }
  until = "Steak has been slathered";
  requires = [new SearSteaks(this.ctx), new CompoundButter(this.ctx)];
}

export const Steak: Recipe = {
  name: "Bone-In Ribeye",
  body: "Compound butter makes this steak juicy and delicious.",
  images: [
    require("../../assets/images/steak-done-1.jpg"),
    require("../../assets/images/steak-done-2.jpg"),
    require("../../assets/images/steak-done-3.jpg")
  ],
  config: [
    {
      id: "serves",
      kind: "integer",
      question: "How many steaks are you cooking?",
      min: 1,
      max: 6,
      default: 1
    },
    {
      id: "doneness",
      kind: "categorical",
      question: "How would you prefer to cook the steak?",
      options: {
        rare: "Rare",
        medRare: "Medium-rare",
        med: "Medium"
      },
      default: "rare"
    }
  ],
  requires: ({ serves, doneness }) => [new Slather({ serves, doneness })]
};
