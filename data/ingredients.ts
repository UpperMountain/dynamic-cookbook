import { Ingredient, MergeFunction, mergeApply } from "../lib/graph";
import { qty } from "../lib/plural";

// Use this Ingredient to mark incomplete Recipes.
export class NYI implements Ingredient {
  kind: "ingredient" = "ingredient";

  name = "[ Not yet implemented ]";
  body = "This recipe is incomplete.";

  requires = [];

  merge: MergeFunction = mergeApply((_: NYI) => {});
}

export class Onion implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public count: number) {}

  name = "Onion";
  get body() {
    return qty(this.count, 0.25, "onion", "onions");
  }

  merge: MergeFunction = mergeApply(
    (other: Onion) => (this.count += other.count)
  );

  requires = [];
}

export class Chai implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public spoons: number) {}
  name = "Chai";
  get body() {
    return qty(this.spoons, 0.25, "spoonful", "spoonfuls");
  }

  merge: MergeFunction = mergeApply((other: Chai) => {
    this.spoons += other.spoons;
  });
}

export class Milk implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cups: number) {}

  name = "Milk";
  get body() {
    return qty(this.cups, 0.25, "cup", "cups");
  }

  merge: MergeFunction = mergeApply((other: Milk) => (this.cups += other.cups));
}

export class Egg implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public count: number) {}

  name = "Egg";
  get body() {
    return qty(this.count, 1, "egg", "eggs");
  }

  merge: MergeFunction = mergeApply(
    (other: Egg) => (this.count += other.count)
  );
}

export class BakingPowder implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public tsp: number) {}

  name = "Baking Powder";
  get body() {
    return qty(this.tsp, 0.25, "tsp");
  }

  merge: MergeFunction = mergeApply(
    (other: BakingPowder) => (this.tsp += other.tsp)
  );
}

export class Flour implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cups: number) {}

  name = "Flour";
  get body() {
    return qty(this.cups, 0.25, "cup", "cups");
  }

  merge: MergeFunction = mergeApply(
    (other: Flour) => (this.cups += other.cups)
  );
}

export class Sugar implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public tbsp: number) {}

  name = "Sugar";
  get body() {
    return qty(this.tbsp, 0.25, "tbsp");
  }

  merge: MergeFunction = mergeApply(
    (other: Sugar) => (this.tbsp += other.tbsp)
  );
}

export class Blueberries implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public count: number) {}

  name = "Blueberries";
  get body() {
    return qty(this.count, 1, "blueberry", "blueberries");
  }

  merge: MergeFunction = mergeApply(
    (other: Blueberries) => (this.count += other.count)
  );
}

export class Butter implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public tbsp: number) {}

  name = "Butter";
  get body() {
    return qty(this.tbsp, 0.25, "tbsp");
  }

  merge: MergeFunction = mergeApply(
    (other: Butter) => (this.tbsp += other.tbsp)
  );
}

export class Garlic implements Ingredient {
  kind: "ingredient" = "ingredient";

  constructor(public cloves: number) {}

  name = "Garlic";
  get body() {
    return qty(this.cloves, 1, "clove", "cloves");
  }

  merge: MergeFunction = mergeApply(
    (other: Garlic) => (this.cloves += other.cloves)
  );
}

export class Spaghetti implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public serves: number) {}

  name = "Spaghetti";
  get body() {
    return `Enough for ${qty(this.serves, 1)}`;
  }

  merge: MergeFunction = mergeApply(
    (other: Spaghetti) => (this.serves += other.serves)
  );
}

export class Espresso implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public count: number) {}
  name = "Coffee (for espresso)";
  get body() {
    return `Enough for ${qty(this.count, 1, "shot", "shots")}`;
  }

  merge: MergeFunction = mergeApply((other: Espresso) => {
    this.count += other.count;
  });
}

export class BoneInRibeye implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public count: number) {}
  name = "Bone-in Ribeye";
  get body() {
    return `${qty(this.count, 1, "steak", "steaks")}, 1.75 pounds each.`;
  }

  merge: MergeFunction = mergeApply((other: BoneInRibeye) => {
    this.count += other.count;
  });
}

export class Rosemary implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public sprigs: number) {}
  name = "Rosemary";
  get body() {
    return qty(this.sprigs, 0.5, "sprig", "sprigs");
  }
  merge: MergeFunction = mergeApply((other: Rosemary) => {
    this.sprigs += other.sprigs;
  });
}

export class CherryTomatoes implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public count: number) {}
  name = "Cherry Tomatoes";
  get body() {
    return `about ${qty(this.count, 1)}`;
  }
  merge: MergeFunction = mergeApply((other: CherryTomatoes) => {
    this.count += other.count;
  });
}

export class Asparagus implements Ingredient {
  kind: "ingredient" = "ingredient";
  constructor(public count: number) {}
  name = "Asparagus";
  get body() {
    return `about ${qty(this.count, 1)} spears`;
  }
  merge: MergeFunction = mergeApply((other: CherryTomatoes) => {
    this.count += other.count;
  });
}
