import { Step, Ingredient, Node, mergeByChildren } from "../lib/graph";

// Example procedures, for testing.
export class ProcedureRoot implements Ingredient {
  kind: "ingredient" = "ingredient";
  amount = 1;

  get name() {
    return `root procedure amount=${this.amount}`;
  }
  body = "";

  requires = [];

  merge(other: Node) {
    if (other instanceof ProcedureRoot) {
      this.amount += other.amount;
      return this;
    }
    return null;
  }
}

export class ProcedureA implements Step {
  kind: "step" = "step";

  name = "step from Procedure A";
  until = "procA done";
  duration = 50;

  merge = mergeByChildren;

  requires = [new ProcedureRoot(), new ProcedureRoot(), new ProcedureRoot()];
}

export class ProcedureB implements Step {
  kind: "step" = "step";
  name = "step from Procedure B";
  until = "procB done";

  body = "heavier";
  timer = { duration: 100, until: "something happens" };

  merge = mergeByChildren;
  requires = [new ProcedureRoot(), new ProcedureRoot()];
}

export class ProcedureAll implements Step {
  kind: "step" = "step";
  name = "root recipe";
  until = "ProcAll done";
  merge = mergeByChildren;
  requires = [new ProcedureA(), new ProcedureA(), new ProcedureB()];

  // for testing: expected node count simplified and unsimplified;
  static unsimplifiedNodeCount = 12;
  static simplifiedNodeCount = 4;
}
