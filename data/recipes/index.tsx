import Recipe from "../../lib/Recipe";
import * as Ingredients from "../ingredients";
import * as Steps from "../steps";

// Re-export all the recipes in /data/recipes for app use
//
// The export of this module should take the shape of:
//
// {
//    [id: string]: Recipe, // each recipe class
//    {...}
// }
//
// These recipe IDs will be passed around the UI, along with parameters
// for the step's constructor, as a way of referencing the recipe.

export { Pasta } from "./pasta";
export { Pancakes } from "./pancakes";

// Temporary recipes, to demonstrate the UI

export const Burritos: Recipe = {
  name: "Burritos",
  body: "Classic Mexican staple.",
  images: [require("../../assets/images/burritos.jpg")],
  config: [],
  requires: _ => [new Steps.SeparateEggs(2)]
};

export const ChaiLatte: Recipe = {
  name: "Chai Latte",
  body: "Warm, sweet, and spicy. Perfect for a cold day.",
  images: [require("../../assets/images/chai-latte.jpg")],
  config: [],
  requires: _ => [new Ingredients.NYI()]
};

export const Steak: Recipe = {
  name: "Steak",
  body: "Juicy and delicious.",
  images: [require("../../assets/images/steak.jpg")],
  config: [],
  requires: _ => [new Ingredients.NYI()]
};
