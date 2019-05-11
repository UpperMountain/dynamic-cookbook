import Recipe from "../../lib/Recipe";
import * as Ingredients from "../ingredients";

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

// Temporary recipes, to demonstrate the UI

export const Burritos: Recipe = {
  name: "Burritos",
  body: "Classic Mexican staple.",
  images: [require("../../assets/images/burritos.jpg")],
  requires: _ => [new Ingredients.NYI()],
  defaults: {}
};

export const ChaiLatte: Recipe = {
  name: "Chai Latte",
  body: "Warm, sweet, and spicy. Perfect for a cold day.",
  images: [require("../../assets/images/chai-latte.jpg")],
  requires: _ => [new Ingredients.NYI()],
  defaults: {}
};

export const Pancakes: Recipe = {
  name: "Pancakes",
  body: "Easy and tasty breakfast.",
  images: [require("../../assets/images/pancakes.jpg")],
  requires: _ => [new Ingredients.NYI()],
  defaults: {}
};

export const Steak: Recipe = {
  name: "Steak",
  body: "Juicy and delicious.",
  images: [require("../../assets/images/steak.jpg")],
  requires: _ => [new Ingredients.NYI()],
  defaults: {}
};
