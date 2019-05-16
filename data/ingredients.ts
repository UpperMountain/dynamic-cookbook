import { Ingredient, MergeFunction } from "../lib/dependencyTree";
import { mergeApply } from "../lib/Procedure";

// Use this Ingredient to mark incomplete Recipes.
export class NYI implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor() {}
  name = "[ Not yet implemented ]";
  body = "This recipe is incomplete.";

  requires = [];

  merge: MergeFunction = mergeApply((_: NYI) => {});
}

export class Onion implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public count: number) {}

  name = "Onion";
  body = "something something shrek quote";

  merge: MergeFunction = mergeApply(
    (other: Onion) => (this.count += other.count)
  );

  requires = [];
}

export class Garlic implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cloves: number) {}

  name = "Garlic";
  body = "is it just called... a garlic? a garlic... bulb? a head?";

  merge: MergeFunction = mergeApply(
    (other: Garlic) => (this.cloves += other.cloves)
  );

  requires = [];
}

export class Spaghetti implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public serves: number) {}

  name = "Spaghetti";
  body = "It's just spaghetti.";

  merge: MergeFunction = mergeApply(
    (other: Spaghetti) => (this.serves += other.serves)
  );

  requires = [];
}
