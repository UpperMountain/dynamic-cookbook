import Recipe from "../../lib/Recipe";
import * as Ingredients from "../ingredients";

// funky imports to get the right order of the exports map
// because everything has to be an `export const`
// yep, that's a dirty hack
import { Pasta as _Pasta } from "./pasta";
import { Pancakes as _Pancakes } from "./pancakes";

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

export const Steak: Recipe = {
  name: "Bone-In Ribeye",
  body: "Compound butter makes this steak juicy and delicious.",
  images: [
    require("../../assets/images/steak-done-1.jpg"),
    require("../../assets/images/steak-done-2.jpg"),
    require("../../assets/images/steak-done-3.jpg")
  ],
  config: [],
  requires: _ => [new Ingredients.NYI()]
};

export const Pasta = _Pasta;

export const Pancakes = _Pancakes;

export const ChaiLatte: Recipe = {
  name: "Chai Latte",
  body: "Warm, sweet, and spicy. Perfect for a cold day.",
  images: [require("../../assets/images/chai-latte-1.jpg")],
  config: [],
  requires: _ => [new Ingredients.NYI()]
};
