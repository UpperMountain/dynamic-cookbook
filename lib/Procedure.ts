import { Node } from "./dependencyTree";
import { uniq } from "lodash";

export default interface Procedure {
  // Attempt to include another Procedure into this one.
  // If successful, mutate self, and return true.
  // If you can't do the merge, return false.
  // merge() MUST be commutative, to run in O(n) on the graph.
  // Think of it like a reduce().
  merge(other: Procedure): Procedure | null;

  // Must generate a list of children on construction
  requires: Procedure[];

  // generate the right Node for sequencing
  getNode(): Node;
}

// typed 'this' param isn't actually a parameter.
// This function should be attached to a class to work.
export function mergeByChildren(this: Procedure, other: Procedure) {
  if (other instanceof this.constructor) {
    // Merge the children
    this.requires = this.requires.concat(other.requires);
    return this;
  }

  return null;
}

export function* walk(
  root: Procedure,
  visited: Set<Procedure> = new Set()
): IterableIterator<Procedure> {
  yield root;
  for (let req of root.requires) {
    if (!visited.has(req)) {
      visited.add(req);
      yield* walk(req, visited);
    }
  }
}

export function nodeCount(root: Procedure): number {
  let count = 0;
  for (let _ of walk(root)) {
    count += 1;
  }
  return count;
}

export function repr(proc: Procedure, tab: number = 0): string {
  const indent = "  ".repeat(tab);
  let out = indent;
  const node = proc.getNode();
  if (node.kind == "step") {
    out += `${proc.getNode().name}:\n`;
    for (let req of proc.requires) {
      out += repr(req, tab + 1);
    }
  } else {
    out += `${node.name}: amt=${node.amount}\n`;
  }
  return out;
}

// Return true if something could be simplified, false otherwise.
// TODO: make this perform in less obnoxious time complexity
export function simplifyOne(root: Procedure): boolean {
  for (let a of walk(root)) {
    for (let b of walk(root)) {
      if (a === b) {
        continue;
      }

      if (a.merge(b)) {
        // update all dependencies.
        for (let node of walk(root)) {
          let newReqs = node.requires.map(e => (e === b ? a : e));
          newReqs = uniq(newReqs);
          node.requires = newReqs;
        }

        return true;
      }
    }
  }

  return false;
}

export function simplify(root: Procedure) {
  while (simplifyOne(root)) {}
}

/*

until no changes are made:
  for each node A in the graph:
    for each other node B in the graph: // big-O ouch yikes
      try merge(A,B)
      if it worked:
        change all references to B into A-references



*/
