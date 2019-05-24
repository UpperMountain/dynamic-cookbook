import {
  Step,
  Node,
  MergeFunction,
  mergeByChildren,
  mergeApply
} from "../../lib/graph";
import Recipe from "../../lib/Recipe";
import { qty, plural } from "../../lib/plural";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";

// How many people did the test feed?
const PARTY = 6;

interface Context {
  separateEggs: Steps.SeparateEggs | null;
  serves: number;
  castIron: boolean;
}

// TODO: premade mix

class WetIngredients implements Step {
  kind: "step" = "step";

  requires: Node[] = [];

  cupsMilk = this.ctx.serves * (1.6 / PARTY);
  numEggs = this.ctx.serves * (2 / PARTY);
  tbspButter = this.ctx.serves * (2 / PARTY);

  constructor(public ctx: Context) {
    this.requires.push(new Ingredients.Milk(this.cupsMilk));
    if (ctx.separateEggs !== null) {
      this.requires.push(ctx.separateEggs);
    } else {
      this.requires.push(new Ingredients.Egg(this.numEggs));
    }
    this.requires.push(new Steps.MeltButter(this.tbspButter));
  }

  name = "Mix together the wet ingredients";

  get body() {
    const eggNoun = this.ctx.separateEggs ? "egg yolk" : "egg";
    return `
Before starting, __make sure your melted butter has cooled__. You don't want to cook your eggs with the heat from the butter.

In a bowl, beat together:

- ${qty(this.cupsMilk, 0.25, "cup", "cups")} milk
- ${qty(this.numEggs, 1, eggNoun, `${eggNoun}s`)}
- ${qty(this.tbspButter, 0.25, "tbsp")} melted butter

`;
  }

  until = "Ingredients are well combined";

  merge: MergeFunction = mergeApply((other: WetIngredients) => {
    this.cupsMilk += other.cupsMilk;
    this.numEggs += other.numEggs;
    this.tbspButter += other.tbspButter;
  });
}

class DryIngredients implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  cupsFlour = this.ctx.serves * (2 / PARTY);
  tbspSugar = this.ctx.serves * (4 / PARTY);
  tspBakingPowder = this.ctx.serves * (2 / PARTY);

  name = "Mix together the dry ingredients";

  get body() {
    return `
Into a bowl, sift and mix together:

- ${qty(this.cupsFlour, 0.25, "cup", "cups")} of flour
- ${qty(this.tbspSugar, 0.25, "tbsp")} of sugar
- ${qty(this.tspBakingPowder, 0.25, "tsp")} of baking powder
    `;
  }

  until = "Dry ingredients are mixed together";

  requires = [
    new Ingredients.Flour(this.cupsFlour),
    new Ingredients.Sugar(this.tbspSugar),
    new Ingredients.BakingPowder(this.tspBakingPowder)
  ];

  merge: MergeFunction = mergeApply((other: DryIngredients) => {
    this.cupsFlour += other.cupsFlour;
    this.tbspSugar += other.tbspSugar;
    this.tspBakingPowder += other.tspBakingPowder;
  });
}

class MixIngredients implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  name = "Mix the wet and dry ingredients";
  body = `
Gradually add the dry ingredients into the bowl with the wet, while mixing gently. 

Don't mix too vigorously---it's okay to have some lumps, as they lead to fluffier pancakes.
  `;
  until = "Wet and dry ingredients are mixed";
  requires = [new WetIngredients(this.ctx), new DryIngredients(this.ctx)];
  merge = mergeByChildren; // ignore context, it's never used again
}

class BeatEggWhites implements Step {
  kind: "step" = "step";

  count: number;
  constructor(public ctx: Context) {
    if (!ctx.separateEggs) {
      throw "BeatEggWhites: must have separated eggs in `ctx`";
    }
    this.count = ctx.separateEggs.count;
  }

  get name() {
    return `Beat the egg ${plural(this.count, 1, "white", "whites")}`;
  }
  get body() {
    return `Using an egg beater or whisk, beat the egg ${plural(
      this.count,
      1,
      "white",
      "whites"
    )}. Stop at soft peaks.`;
  }
  get until() {
    return `Egg ${plural(this.count, 1, "white is", "whites are")} beaten`;
  }

  requires = [this.ctx.separateEggs as Step];

  merge: MergeFunction = mergeApply((other: BeatEggWhites) => {
    this.count += other.count;
  });
}

class FoldEggWhites implements Step {
  kind: "step" = "step";
  constructor(public ctx: Context) {}
  name = "Fold in the egg whites";
  body = `
Add the egg whites to the bowl with the batter.

Very gently, __fold__ in the beaten egg whites. They need to be 
incorporated evenly, without letting the air out.
  `;
  until = "Egg whites are incorporated";
  duration = 60 * 3; // this takes a while
  requires = [new BeatEggWhites(this.ctx), new MixIngredients(this.ctx)];
  merge = mergeByChildren; // ignore context, it's never used again
}

class HeatPan implements Step {
  kind: "step" = "step";

  noun: string; // the <NOUN> is on the heat
  constructor(public ctx: Context) {
    this.noun = this.ctx.castIron ? "skillet" : "pan";
  }
  get name() {
    if (this.ctx.castIron) {
      return "Heat up the cast iron skillet";
    } else {
      return "Heat up the pan";
    }
  }
  get body() {
    return `Put the ${this.noun} over medium-low heat.`;
  }
  get timer() {
    if (this.ctx.castIron) {
      return { duration: 60 * 5, until: "The cast iron is hot" };
    } else {
      return { duration: 60, until: "The pan is hot" };
    }
  }
  get until() {
    return `The ${this.noun} is on the heat`;
  }
  requires = [];

  merge(other: Node) {
    if (other instanceof HeatPan && other.ctx.castIron === this.ctx.castIron) {
      return this;
    }

    return null;
  }
}

class Frying implements Step {
  // number of pancakes per batch
  static BATCH_SIZE = 1;

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

  get name() {
    const total = this.ctx.serves;
    const current = total - this.count;
    return `Fry the pancakes (${total - current} of ${total})`;
  }

  get body() {
    const pan = this.ctx.castIron ? "cast iron skillet" : "pan";
    const secondaryText = `__Clean out the ${pan} with a paper towel, so the butter doesn't burn.__`;
    return `
${this.first ? "" : secondaryText + "\n"}
Add a hunk of butter to the hot ${pan}, and let it melt.

Add ${
      Frying.BATCH_SIZE
    } fist-sized dollop of batter into the pan. Add toppings to each pancake.

Fry until bubbles start to break through the top side, then flip. You can always look underneath to see if a side is done.
  `;
  }
  until = "Pancakes are added";
  timer = { duration: 60 * 2, until: "Both sides are golden brown" };

  // this does not merge.
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
        homemade: "No, I'd like to make my own",
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
        eggWhites === "separated"
          ? new Steps.SeparateEggs(serves * (2 / PARTY))
          : null,
      serves,
      castIron: skillet === "true"
    })
  ],

  images: [require("../../assets/images/pancakes-1.jpg")]
};
