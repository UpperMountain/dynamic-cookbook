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

// funky imports to get the right order of the exports map
// because everything has to be an `export const`
// yep, that's a dirty hack
import { Pancakes as _Pancakes } from "./pancakes";
import { ChaiLatte as _ChaiLatte } from "./chai";
import { Steak as _Steak } from "./steak";
import { RoastedTomatoes as _RoastedTomatoes } from "./roastedTomatoes";
import { SauteedAsparagus as _SauteedAsparagus } from "./sauteedAsparagus";

export const Steak = _Steak;
export const Pancakes = _Pancakes;
export const ChaiLatte = _ChaiLatte;
export const RoastedTomatoes = _RoastedTomatoes;
export const SauteedAsparagus = _SauteedAsparagus;
