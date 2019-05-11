import { Ingredient } from "../lib/dependencyTree";
import Procedure from "../lib/Procedure";

// Use this Ingredient to mark incomplete Recipes.
export class NYI implements Procedure {
  constructor() {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "[ Not yet implemented ]",
      body: "This recipe is incomplete.",
      amount: 0
    };
  }
  requires = [];
  merge(other: Procedure) {
    if (other instanceof NYI) {
      return this;
    }
    return null;
  }
}

export class Onion implements Procedure {
  constructor(public count: number) {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "Onion",
      body: "something something shrek quote",
      amount: this.count
    };
  }

  merge(other: Procedure) {
    if (other instanceof Onion) {
      this.count += other.count;
      return this;
    }

    return null;
  }

  requires = [];
}

export class Garlic implements Procedure {
  constructor(public cloves: number) {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "Garlic",
      body: "is it just called... a garlic? a garlic... bulb? a head?",
      amount: Math.ceil(this.cloves / 4)
    };
  }

  merge(other: Procedure) {
    if (other instanceof Garlic) {
      this.cloves += other.cloves;
      return this;
    }

    return null;
  }

  requires = [];
}

export class Spaghetti implements Procedure {
  constructor(public serves: number) {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "Spaghetti",
      body: "It's just spaghetti.",
      amount: this.serves * 12
    };
  }

  merge(other: Procedure) {
    if (other instanceof Spaghetti) {
      this.serves += other.serves;
      return this;
    }

    return null;
  }

  requires = [];
}
