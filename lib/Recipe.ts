import Procedure from "./Procedure";
import { Asset } from "expo";
import * as AllRecipes from "../data/recipes";

// Recipe represents something the user can make.
// We should take photos of all of these, and include them.

export default interface Recipe {
  // Requirements for the recipe.
  // Call this with a map of { parameter.id: its value }
  requires: (config: { [key: string]: any }) => Procedure[];

  // List of parameter definitions for the recipe.
  config: ParameterDef[];

  // Name/body to show in the UI.
  name: string;
  body?: string;

  // List of photos of this Recipe, when it's cooked.
  images: Asset[];
}

// Serializable description of a recipe (with configuration)
// usable in routing/persistence/etc.
export interface RecipeSpec {
  // name of the recipe in the exported `Recipes` map
  id: string;

  // That recipe's configuration. Used to generate the initial dependencies.
  config: { [key: string]: any };
}

interface ParameterBase {
  // internal parameter ID
  id: string;

  // User-facing name of the parameter.
  // Phrased as e.g. "How many servings?" "What kind of pasta?"
  question: string;

  // Which type of parameter is it
  kind: string;
}

export interface CategoricalParameter extends ParameterBase {
  kind: "categorical";

  // mapping of { identifier: display name }
  options: { [key: string]: string };

  // identifier of the default
  default: string;
}

export interface IntegerParameter extends ParameterBase {
  kind: "integer";

  // bounds on the value, if no limit then null.
  min: number | null;
  max: number | null;

  // The default
  default: number;
}

export type ParameterDef = IntegerParameter | CategoricalParameter;

// export recipe list from /data/recipes
export const Recipes: { [key: string]: Recipe } = AllRecipes;
