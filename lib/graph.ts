import { uniq, omit, sortBy } from "lodash";

// A duration, in minutes.
export type Duration = number;

// A user-facing timer.
export interface Timer {
  duration: Duration;
  until: string; // "Reduced by 1/3"
}

export interface OnGoingTimer extends Timer {
  elapsed: Duration;
}

export interface Described {
  // for display in the UI
  name: Readonly<string>;
  body?: Readonly<string>;
}

// Merge behavior for two Nodes, attached to a node of type T.
// If the merge can be carried out, return the new Node.
// If the merge cannot be carried out, return null.
export type MergeFunction = (other: Node) => Node | null;

export interface Ingredient extends Described {
  kind: "ingredient";
  id?: string;
  amount?: number;
  merge?: MergeFunction;
}

export interface Step extends Described {
  kind: "step";

  // "Onions are soft"
  until: string;

  // timers
  duration?: Duration; // active time during the step
  timer?: Timer; // passive time after the step

  // dependencies
  requires: Node[];

  merge?: MergeFunction;
}

// union type discriminated on `kind`
export type Node = Ingredient | Step;

// Check if a Node is a Step
export function isStep(obj: Node): obj is Step {
  return obj.kind === "step";
}

// check if a Node is an Ingredient
export function isIngredient(obj: Node): obj is Ingredient {
  return obj.kind === "ingredient";
}

// Function to check if any two objects are instances of the same class
function sameClass<T>(a: T, b: any): b is T {
  return b.constructor === a.constructor;
}

export function totalTime(node: Node): Duration {
  if (isIngredient(node)) {
    // Ingredients take no time to complete
    return 0;
  } else if (isStep(node)) {
    let time = 0;
    if (node.duration) {
      time += node.duration;
    }
    if (node.timer) {
      time += node.timer.duration;
    }
    return time;
  }

  const _exhaustive: never = node;
  return 0;
}

// A MergeFunction which merges children when it encounters a Node of the same class.
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

// mergeApply() creates a merge function which merges children, then applies `apply`, for other Nodes of the same class.
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

/* repr() returns a string representation of a Node.
 *
 * Note: it duplicates requirements with multiple dependents.
 */
export function repr(node: Node, tab: number = 0): string {
  const indent = "  ".repeat(tab);

  const otherInfo: Partial<Node> = omit(node, [
    "ctx", // sometimes has a lot of junk
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

/* Attempt to merge two requirements. Return true if successful, false otherwise.
 *
 * Basic overview of simplification algorithm:
 *
 * until no changes are made:
 *   for each node A in the graph:
 *     for each other node B in the graph: // big-O ouch yikes
 *       try merge(A,B)
 *       if it worked:
 *         change all references to B into A-references
 */
export function simplifyOne(root: Node): boolean {
  // TODO: make this perform in less obnoxious time complexity

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

// Repeatedly call simplifyOne() until it can't merge anything.
export function simplify(root: Node) {
  while (simplifyOne(root)) {}
}

class SimplifyRoot implements Step {
  kind: "step" = "step";
  constructor(public requires: Node[]) {}
  get name(): string {
    throw "not an actual step";
  }
  until = "";
}

// Simplify a group of Nodes.
export function simplifyGroup(roots: Node[]): Node[] {
  const root = new SimplifyRoot(roots);
  simplify(root);
  return root.requires;
}

// Traverse every requirement for a given Node
export function* walk(
  root: Node,
  visited: Set<Node> = new Set()
): IterableIterator<Node> {
  yield root;
  if (root.kind === "ingredient") {
    return;
  }
  for (let req of root.requires) {
    if (!visited.has(req)) {
      visited.add(req);
      yield* walk(req, visited);
    }
  }
}

// Walks a group of nodes.
export function* walkGroup(roots: Node[]): IterableIterator<Node> {
  const root = new SimplifyRoot(roots);
  const walker = walk(root);
  walker.next(); // skip the root (first item)
  yield* walker;
}

// Traverse every requirement for a given Node which satisfies a predicate
export function* walkWhere(root: Node, predicate: (el: Node) => boolean) {
  for (let item of walk(root)) {
    if (predicate(item)) {
      yield item;
    }
  }
}

// Counts the requirements for a node.
export function nodeCount(root: Node): number {
  let count = 0;
  for (let _ of walk(root)) {
    count += 1;
  }
  return count;
}

// Counts the requirements for a group of nodes.
export function nodeCountGroup(roots: Node[]): number {
  let count = 0;
  for (let _ of walkGroup(roots)) {
    count += 1;
  }
  return count;
}
