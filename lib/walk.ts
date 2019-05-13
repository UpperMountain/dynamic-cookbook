export interface Walkable<NodeT> {
  requires?: NodeT[];
  [key: string]: any; // other props allowed as well
}

export function* walk<NodeT extends Walkable<NodeT>>(
  root: NodeT,
  visited: Set<NodeT> = new Set()
): IterableIterator<NodeT> {
  yield root;
  if (typeof root.requires === "undefined") {
    return;
  }
  for (let req of root.requires) {
    if (!visited.has(req)) {
      visited.add(req);
      yield* walk<NodeT>(req, visited);
    }
  }
}

export function* walkWhere<T extends Walkable<T>>(
  root: T,
  predicate: (el: T) => boolean
) {
  for (let item of walk<T>(root)) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function nodeCount(root: Walkable<any>): number {
  let count = 0;
  for (let _ of walk(root)) {
    count += 1;
  }
  return count;
}
