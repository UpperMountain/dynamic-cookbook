import Recipe from "../../lib/Recipe";
import { Step } from "../../lib/graph";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";
import { qty } from "../../lib/plural";

export class SeasonAsparagus implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}

  name = "Season the asparagus";
  get body() {
    return `Rinse off about ${qty(
      this.count,
      1,
      "spear",
      "spears"
    )} of asparagus. Roll them in some olive oil, some salt, and some pepper.`;
  }
  until = "Asparagus are seasoned";
  requires = [new Ingredients.Asparagus(this.count)];
}

export class SauteeAsparagus implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}
  asparagusCount = this.count * 5;

  name = "Sautée the asparagus";
  body = `Add the asparagus to a pan, with 1 tbsp of butter. Sauteé until tender, about 6-7 minutes.`;
  until = "The asparagus are cooking";
  timer = { until: "The asparagus are tender", duration: 60 * 7 };
  requires = [
    new SeasonAsparagus(this.asparagusCount),
    new Ingredients.Butter(1),
    new Steps.HeatPan("pan")
  ];
}

export const SauteedAsparagus: Recipe = {
  name: "Sautéed Asparagus",
  body: "A hot, crunchy side to any dish in need of a tasty vegetable.",
  images: [require("../../assets/images/sauteed-asparagus-1.jpg")],
  config: [
    {
      id: "serves",
      kind: "integer",
      question: "How many servings?",
      min: 2,
      max: 8,
      default: 2
    }
  ],
  requires: ({ serves }) => [new SauteeAsparagus(serves)]
};
