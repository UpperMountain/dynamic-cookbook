import Recipe from "../../lib/Recipe";
import { Step } from "../../lib/graph";
import * as Ingredients from "../ingredients";
import { qty } from "../../lib/plural";

// 1:15 coffee:water ratio
export const WATER_PER_COFFEE = 15;
export const WATER_PER_CUP = 236; // ml/grams. Roughly 4 cups/qt.

interface Context {
  isGround: boolean;
  doBloom: boolean;
  water: Step;
  coffee: Step;
}

export class HeatWater implements Step {
  kind: "step" = "step";
  constructor(public grams: number) {}

  name = "Heat the water";
  get body() {
    const amt = qty(this.grams, 1, "gram", "grams");
    return `Boil ${amt} of water in an electric kettle. When you're done, wait a minute for the water to cool down.`;
  }
  until = "The water is boiling";
  timer = { until: "The water has cooled down", duration: 60 };
  requires = [];
}

export class GrindCoffee implements Step {
  kind: "step" = "step";
  constructor(public grams: number) {}

  name = "Grind the coffee";
  get body() {
    const amt = qty(this.grams, 1, "gram", "grams");
    return `Using a burr grinder, grind ${amt} of coffee on a coarse setting.\n\nPour out the ground coffee into your French press.`;
  }
  until = "Coffee is in the press";
  requires = [new Ingredients.BeanCoffee(this.grams)];
}

export class MeasureGroundCoffee implements Step {
  kind: "step" = "step";
  constructor(public grams: number) {}

  name = "Measure the coffee";
  get body() {
    const amt = qty(this.grams, 1, "gram", "grams");
    return `Measure out ${amt} of ground coffee, and add it to your French press.`;
  }
  until = "Coffee is in the press";
  requires = [new Ingredients.GroundCoffee(this.grams)];
}

export class BloomCoffee implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}

  name = "Bloom the coffee";
  get body() {
    return `Cover the coffee with twice its volume in water. Agitate for around 30 seconds.`;
  }
  until = "Coffee is covered with water";
  timer = { until: "Coffee is done blooming", duration: 30 };
  requires = [this.ctx.coffee, this.ctx.water];
}

export class BrewCoffee implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}

  name = "Brew the coffee";
  get body() {
    return `Pour the remaining water into the press. Brew for 4 minutes, occasionally knocking down the layer of coffee that forms at the top with a spoon.`;
  }
  until = "Coffee is brewing";
  timer = { until: "Coffee is done brewing", duration: 60 * 4 };
  requires = this.ctx.doBloom
    ? [new BloomCoffee(this.ctx)]
    : [this.ctx.water, this.ctx.coffee];
}

export class Serve implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}

  name = "Plunge";
  get body() {
    return `Put the plunger in the French press, and slowly press it through the coffee.\n\nServe.`;
  }
  until = "Press has been plunged";
  requires = [new BrewCoffee(this.ctx)];
}

// 1. Boil water, wait 30s for it to cool
// 2. Grind coffee
// 3. Bloom coffee (optionally) [1, 2]
// 4. Brew coffee  [1, 2, 3]
// 5. Done.

export const FrenchPressCoffee: Recipe = {
  name: "French Press Coffee",
  body: "Strong and flavorful",
  images: [],
  config: [
    {
      id: "grind",
      kind: "categorical",
      question: "Do you use pre-ground coffee?",
      default: "whole",
      options: {
        whole: "Nope, I grind fresh.",
        ground: "Yes, I use pre-ground."
      }
    },
    {
      id: "bloom",
      kind: "categorical",
      question: "Do you want to bloom before brewing?",
      default: "yes",
      options: {
        yes: "Yes, I want slightly stronger coffee",
        no: "No, I don't"
      }
    },
    {
      id: "cups",
      kind: "integer",
      question: "How many cups?",
      default: 4,
      min: 1,
      max: 8,
      step: 1
    }
  ],
  requires: ({ grind, bloom, cups }) => {
    const isGround = grind === "ground";
    const doBloom = bloom === "yes";
    const amtWater = cups * WATER_PER_CUP;
    const amtCoffee = amtWater / WATER_PER_COFFEE;

    const waterStep = new HeatWater(amtWater);
    const coffeeStep = isGround
      ? new MeasureGroundCoffee(amtCoffee)
      : new GrindCoffee(amtCoffee);

    return [
      new BrewCoffee({
        isGround,
        doBloom,
        water: waterStep,
        coffee: coffeeStep
      })
    ];
  }
};
