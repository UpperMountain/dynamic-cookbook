import { Ingredient, MergeFunction, mergeApply } from "../lib/graph";

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

export class Chai implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public spoons: number) {}
  name = "Chai";
  body = "This stuff smells AMAZING";

  merge: MergeFunction = mergeApply((other: Chai) => {
    this.spoons += other.spoons;
  });
}

export class Milk implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cups: number) {}

  name = "Milk";

  merge: MergeFunction = mergeApply((other: Milk) => (this.cups += other.cups));
}

export class Egg implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public count: number) {}

  name = "Egg";

  merge: MergeFunction = mergeApply(
    (other: Egg) => (this.count += other.count)
  );
}

export class BakingPowder implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public tsp: number) {}

  name = "Baking Powder";

  merge: MergeFunction = mergeApply(
    (other: BakingPowder) => (this.tsp += other.tsp)
  );
}

export class Flour implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cups: number) {}

  name = "Flour";

  merge: MergeFunction = mergeApply(
    (other: Flour) => (this.cups += other.cups)
  );
}

export class Sugar implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public tbsp: number) {}

  name = "Sugar";

  merge: MergeFunction = mergeApply(
    (other: Sugar) => (this.tbsp += other.tbsp)
  );
}

export class Blueberries implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public count: number) {}

  name = "Blueberries";

  merge: MergeFunction = mergeApply(
    (other: Blueberries) => (this.count += other.count)
  );
}

export class Butter implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public tbsp: number) {}

  name = "Butter";

  merge: MergeFunction = mergeApply(
    (other: Butter) => (this.tbsp += other.tbsp)
  );
}

export class Garlic implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cloves: number) {}

  name = "Garlic";
  body = "is it just called... a garlic? a garlic... bulb? a head?";

  merge: MergeFunction = mergeApply(
    (other: Garlic) => (this.cloves += other.cloves)
  );
}

export class Spaghetti implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public serves: number) {}

  name = "Spaghetti";
  body = "It's just spaghetti.";

  merge: MergeFunction = mergeApply(
    (other: Spaghetti) => (this.serves += other.serves)
  );
}
