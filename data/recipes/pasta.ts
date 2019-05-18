import { Step, MergeFunction, mergeApply } from "../../lib/graph";
import Recipe from "../../lib/Recipe";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";

export class PastaSauce implements Step {
  kind: "step" = "step";
  constructor(public serves: number) {}

  name = "Start the sauce";
  body = `
Throw the garlic in a pan with some oil. Over medium heat, cook until the
garlic starts to brown.

Add onion, oregano, and some salt. Cook until the onion is soft.

Add the tomatoes (with the juicy stuff) and cook for about 20 minutes, or
until the sauce is reduced.
      `;
  timer = { duration: 1200, until: "Sauce is reduced slightly" };

  until = "Sauce is started";

  // this is technically a whole clove of garlic, but it's also a proof-of-concept example
  requires = [
    new Ingredients.Garlic(2 * this.serves),
    new Steps.ChopOnion(0.5 * this.serves)
  ];

  merge: MergeFunction = mergeApply(
    (other: PastaSauce) => (this.serves += other.serves)
  );
}

export class CookPasta implements Step {
  kind: "step" = "step";
  constructor(public serves: number) {}
  name = "Start the pasta";
  until = "Pasta is cooking";
  body = `
Once the water comes to a boil, throw in the pasta.

Boil it for the time written on the box (generally 9-10 minutes) or until
[it's al dente](al-dente).
    `;
  timer = { duration: 540, until: "Pasta is al dente" };

  requires = [new Ingredients.Spaghetti(this.serves)];

  merge: MergeFunction = mergeApply(
    (other: CookPasta) => (this.serves += other.serves)
  );
}

export class Combine implements Step {
  kind: "step" = "step";
  constructor(public serves: number) {}

  name = "Combine the sauce and the pasta";
  until = "Sauce and pasta are combined";
  body = `
When the pasta is done, strain the water out of the pot. Throw in some butter.

When the sauce is done, take it off the heat.

Pour the sauce over the pasta, and shake the pot around until covered.`;

  requires = [new CookPasta(this.serves), new PastaSauce(this.serves)];

  merge: MergeFunction = mergeApply(
    (other: Combine) => (this.serves += other.serves)
  );
}

export const Pasta: Recipe = {
  name: "Pasta",
  body: "Simple, easy pasta.",
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
      id: "sauce",
      kind: "categorical",
      question: "What kind of sauce?",
      options: { premade: "From a jar", homemade: "Make my own" },
      default: "homemade"
    }
  ],
  requires: ({ serves }) => [new Combine(serves)],

  images: [
    require("../../assets/images/pasta.jpg"),
    require("../../assets/images/other-pasta.jpg")
  ]
};
