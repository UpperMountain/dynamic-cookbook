import { Node } from "./dependencyTree";

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

export function* walkWhere(root: Node, predicate: (el: Node) => boolean) {
  for (let item of walk(root)) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function nodeCount(root: Node): number {
  let count = 0;
  for (let _ of walk(root)) {
    count += 1;
  }
  return count;
}
