import { Step, Ingredient } from "../lib/dependencyTree";
import Procedure, { mergeByChildren } from "../lib/Procedure";

// Example procedures, for testing.
export class ProcedureRoot implements Procedure {
  amount = 1;

  getNode(): Ingredient {
    return {
      id: "TestIngredient1",
      kind: "ingredient",
      name: `root procedure amount=${this.amount}`,
      body: "",
      amount: this.amount
    };
  }

  merge(other: Procedure) {
    if (other instanceof ProcedureRoot) {
      this.amount += other.amount;
      return this;
    }
    return null;
  }

  requires = [];
}

export class ProcedureA implements Procedure {
  getNode(): Step {
    return {
      kind: "step",
      name: "step from Procedure A",
      body: "",
      requires: this.requires.map(e => e.getNode())
    };
  }

  merge = mergeByChildren;
  requires = [new ProcedureRoot(), new ProcedureRoot(), new ProcedureRoot()];
}

export class ProcedureB implements Procedure {
  getNode(): Step {
    return {
      kind: "step",
      name: "step from Procedure B",
      body: "",
      requires: this.requires.map(e => e.getNode())
    };
  }

  merge = mergeByChildren;
  requires = [new ProcedureRoot(), new ProcedureRoot()];
}

export class ProcedureAll implements Procedure {
  getNode(): Step {
    return {
      kind: "step",
      name: "root recipe",
      body: "",
      requires: this.requires.map(e => e.getNode())
    };
  }
  merge = mergeByChildren;
  requires = [new ProcedureA(), new ProcedureA(), new ProcedureB()];

  // for testing: expected node count simplified and unsimplified;
  static unsimplifiedNodeCount = 12;
  static simplifiedNodeCount = 4;
}
