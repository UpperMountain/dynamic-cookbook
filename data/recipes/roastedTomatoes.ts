import Recipe from "../../lib/Recipe";
import { Step } from "../../lib/graph";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";
import { qty } from "../../lib/plural";

export class SeasonTomatoes implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}

  name = "Season the tomatoes";
  get body() {
    return `Rinse off about ${qty(
      this.count,
      1,
      "cherry tomato",
      "cherry tomatoes"
    )}. Roll them in some olive oil, some salt, and some pepper.`;
  }
  until = "Tomatoes are seasoned";
  requires = [new Ingredients.CherryTomatoes(this.count)];
}

export class RoastTomatoes implements Step {
  kind: "step" = "step";
  constructor(public count: number) {}
  tomatoCount = this.count * 10;

  name = "Roast the tomatoes";
  body = `Add the seasoned tomatoes to a roasting pan, with 2 tbsp of butter. Put the tomatoes in the oven at 350 degrees for 20-30 minutes, until their skin breaks.`;
  until = "The tomatoes are in the oven";
  timer = { until: "The tomatoes have broken skin", duration: 60 * 20 };
  requires = [
    new SeasonTomatoes(this.tomatoCount),
    new Ingredients.Butter(2),
    new Steps.HeatOven(350)
  ];
}

export const RoastedTomatoes: Recipe = {
  name: "Roasted Tomatoes",
  body: "Hot and juicy, these tomatoes go well with almost anything.",
  images: [require("../../assets/images/roasted-tomatoes-1.jpg")],
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
  requires: ({ serves }) => [new RoastTomatoes(serves)]
};
