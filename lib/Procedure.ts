import { Node, Step, MergeFunction } from "./dependencyTree";
import { uniq, omit, sortBy } from "lodash";
import { walk } from "./walk";

// Function to check if two instances are the same class
function sameClass<T>(a: T, b: any): b is T {
  return b.constructor === a.constructor;
}

// Check if something's a Step
function isStep(obj: Node): obj is Step {
  return obj.kind === "step";
}

// typed 'this' param isn't actually a parameter.
// This function should be attached to a class to work.
export const mergeByChildren: MergeFunction = function(
  this: Step,
  other: Node
) {
  if (sameClass(this, other)) {
    // Merge the children
    this.requires = this.requires.concat(other.requires);
    return this;
  }

  return null;
};

// Same as mergeByChildren, but apply a function first.
export function mergeApply<T extends Node>(
  apply: (other: T) => void
): MergeFunction {
  return function(this: T, other: Node): Node | null {
    if (!sameClass(this, other)) {
      return null;
    }

    if (isStep(this) && isStep(other)) {
      this.requires = this.requires.concat(other.requires);
    }

    apply(other);

    return this;
  };
}

export function repr(node: Node, tab: number = 0): string {
  const indent = "  ".repeat(tab);

  const otherInfo: Partial<Node> = omit(node, [
    "name",
    "body",
    "kind",
    "merge", // stringifies to 'undefined' anyhow
    "requires",
    "timer",
    "duration"
  ]);
  const sortedInfo = sortBy(Object.entries(otherInfo), e => e[0]); // for consistency
  const infoString = sortedInfo
    .map(([k, v]: [string, any]) => `${k}=${JSON.stringify(v)}`) // ... sort of.
    .join(" ");

  const labels = {
    ingredient: "=",
    step: "|"
  };

  let out = `${indent}${labels[node.kind]} "${node.name}" ${infoString}\n`;

  if (node.kind == "step") {
    for (let req of node.requires) {
      out += repr(req, tab + 1);
    }
  }
  return out;
}

// Return true if something could be simplified, false otherwise.
// TODO: make this perform in less obnoxious time complexity
export function simplifyOne(root: Node): boolean {
  // Iterate over every node pair in the tree.
  for (let a of walk(root)) {
    for (let b of walk(root)) {
      // Skip the pair if they're the same thing.
      if (a === b) {
        continue;
      }

      // If merge is possible, do it.
      if (a.merge && a.merge(b)) {
        // update all dependencies on the old node.
        for (let node of walk(root)) {
          if (node.kind === "step") {
            let newReqs = node.requires.map(e => (e === b ? a : e));
            newReqs = uniq(newReqs);
            node.requires = newReqs;
          }
        }

        // we successfully simplified a node.
        return true;
      }
    }
  }

  // If execution is here, we did absolutely nothing. Return as such.
  return false;
}

export function simplify(root: Node) {
  while (simplifyOne(root)) {}
}

class SimplifyRoot implements Step {
  kind: "step" = "step";
  constructor(public requires: Node[]) {}
  get name(): string {
    throw "not an actual step";
  }
  merge = mergeByChildren;
}

export function simplifyGroup(roots: Node[]): Node[] {
  const root = new SimplifyRoot(roots);
  simplify(root);
  return root.requires;
}

/*
 * Basic overview of simplification algorithm:
 *
 * until no changes are made:
 *   for each node A in the graph:
 *     for each other node B in the graph: // big-O ouch yikes
 *       try merge(A,B)
 *       if it worked:
 *         change all references to B into A-references
 */
