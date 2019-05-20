import { Step, Node } from "../../lib/graph";
import Recipe from "../../lib/Recipe";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";

interface Context {
  separateEggs: Step | null;
  serves: number;
  castIron: boolean;
}

// TODO: write merge functions for everything in this file!
// TODO: premade mix

class WetIngredients implements Step {
  kind: "step" = "step";

  requires: Node[] = [];

  constructor(public ctx: Context) {
    this.requires.push(new Ingredients.Milk(ctx.serves * (1.25 / 4)));
    if (ctx.separateEggs !== null) {
      this.requires.push(ctx.separateEggs);
    } else {
      this.requires.push(new Ingredients.Egg(ctx.serves * (2 / 4)));
    }
    this.requires.push(new Steps.MeltButter(ctx.serves * (2 / 4)));
  }

  name = "Mix together the wet ingredients";

  get body() {
    return `
Before starting, make sure your melted butter has cooled. You
don't want to cook your eggs with the heat from the butter.

In a bowl, beat together the milk, 
${this.ctx.separateEggs ? "egg yolks" : "eggs"}, 
and melted butter.
    `;
  }

  until = "Ingredients are well combined";
}

class DryIngredients implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}

  name = "Mix together the dry ingredients";
  body = `
In a bowl, sift together the flour, sugar, and baking powder.
  `;

  until = "Dry ingredients are mixed together";

  requires = [
    new Ingredients.Flour(this.ctx.serves * (2 / 4)),
    new Ingredients.Sugar(this.ctx.serves * (2 / 4)),
    new Ingredients.BakingPowder(this.ctx.serves * (2 / 4))
  ];
}

class MixIngredients implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  name = "Mix the wet and dry ingredients";
  body = `
A large spoonful at a time, add the dry ingredients into the bowl with 
the wet, while mixing gently. 

Don't mix too vigorously---it's okay to have some lumps, as they lead 
to fluffier pancakes.
  `;
  until = "Wet and dry ingredients are mixed";
  requires = [new WetIngredients(this.ctx), new DryIngredients(this.ctx)];
}

class BeatEggWhites implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {
    if (!ctx.separateEggs) {
      throw "BeatEggWhites: must have separated eggs in `ctx`";
    }
  }
  name = "Beat the egg whites";
  body = `Using an egg beater or whisk, beat the egg whites. Stop at soft peaks.`;
  until = "Egg whites are beaten";
  requires = [this.ctx.separateEggs as Step];
}

class FoldEggWhites implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  name = "Fold in the egg whites";
  body = `
Add the egg whites to the bowl with the batter.

Very gently, *fold* in the beaten egg whites. They need to be 
incorporated evenly, without letting the air out.
  `;
  until = "Egg whites are incorporated";
  requires = [new BeatEggWhites(this.ctx), new MixIngredients(this.ctx)];
}

class HeatPan implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  get name() {
    if (this.ctx.castIron) {
      return "Heat up the cast iron skillet";
    } else {
      return "Heat up the pan";
    }
  }
  get body() {
    const pan = this.ctx.castIron ? "skillet" : "pan";
    return `Put the ${pan} over medium heat.`;
  }
  get timer() {
    if (this.ctx.castIron) {
      return { duration: 60 * 5, until: "The cast iron is hot" };
    } else {
      return { duration: 60, until: "The pan is hot" };
    }
  }
  get until() {
    return `The ${this.ctx.castIron ? "skillet" : "pan"} is hot`;
  }
  requires = [];
}

class Frying implements Step {
  // number of pancakes per batch
  static BATCH_SIZE = 2;

  kind: "step" = "step";
  requires: Node[] = [];
  first: boolean = false;
  constructor(public count: number, public ctx: Context) {
    // Are we the first step?
    if (count <= Frying.BATCH_SIZE) {
      this.first = true;
    }

    if (this.first) {
      // Heat the pan once
      this.requires.push(new HeatPan(this.ctx));

      this.requires.push(new Ingredients.Butter(1 / 2));

      if (this.ctx.separateEggs) {
        this.requires.push(new FoldEggWhites(this.ctx));
      } else {
        this.requires.push(new MixIngredients(this.ctx));
      }
    } else {
      // Fry the rest, in batches
      this.requires.push(new Frying(this.count - Frying.BATCH_SIZE, this.ctx));
    }
  }

  name = "Fry the pancakes";
  get body() {
    const pan = this.ctx.castIron ? "cast iron skillet" : "pan";
    return `
${
  this.first
    ? ""
    : `Clean out the ${pan} with a paper towel, so the butter doesn't burn.`
}
Add a hunk of butter to the hot ${pan}, and let it melt.

Add three palm-sized dollops of batter into the pan. Add five 
or six blueberries to each pancake.

Fry them until
bubbles start to break through the top side, then flip.
  `;
  }
  until = "Pancakes are added";
  timer = { duration: 60 * 2, until: "Both sides are golden brown" };
}

export const Pancakes: Recipe = {
  name: "Pancakes",
  body: "You know what pancakes are.",
  config: [
    {
      id: "serves",
      kind: "integer",
      question: "How many servings?",
      min: 1,
      max: null,
      default: 4
    },
    {
      id: "skillet",
      kind: "categorical",
      question: "Do you have a cast iron skillet?",
      options: { true: "Yes, I do", false: "Nope, I just have a pan" },
      default: "false"
    },
    {
      id: "premade",
      kind: "categorical",
      question: "Do you want to use boxed pancake mix?",
      options: {
        homemeade: "No, I'd like to make my own",
        premade: "Yes, I have premade mix"
      },
      default: "homemade"
    },
    {
      id: "eggWhites",
      kind: "categorical",
      question: "How much time do you have?",
      options: {
        separated: "I want them fluffy, and have a lot of time",
        notSeparated: "I want pancakes __NOW__"
      },
      default: "separated"
    }
  ],
  requires: ({ serves, skillet, eggWhites }) => [
    new Frying(serves, {
      separateEggs:
        eggWhites === "separated" ? new Steps.SeparateEggs(4 / serves) : null,
      serves,
      castIron: skillet === "true"
    })
  ],

  images: [require("../../assets/images/pancakes.jpg")]
};
