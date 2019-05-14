import { Node, OnGoingTimer, Step } from "./dependencyTree";

export function isLeaf(node: Node): boolean {
  // ingredient nodes have always no children
  if (node.kind == "ingredient") return true;

  // check if it is a step node with no requirements
  if (node.kind == "step") {
    if (node.requires.length == 0) return true;
  }
  return false;
}

export function getLeaves(root: Node, leaves: Node[]): Node[] {
  if (isLeaf(root)) {
    leaves.push(root);
    return leaves;
  }

  let parent = root as Step;

  for (let i = 0; i < parent.requires.length; i++) {
    getLeaves(parent.requires[i], leaves);
  }

  return leaves;
}

export function prune(node: Step): Step {
  node.requires = node.requires
    .filter(e => e.kind === "step")
    .map(e => prune(e as Step));

  return node;
}

export function remove(completed: Node, root: Step): Node {
  root.requires = root.requires
    .filter(e => e !== completed)
    .map(e => remove(completed, e as Step));

  return root;
}

export function next(
  tree: Step,
  timers: OnGoingTimer[],
  completed: Step | null,
  active: Step[]
): Node | null {
  if (completed !== null) remove(completed, tree);

  let candidates: Step[] = [];
  getLeaves(tree, candidates);
  candidates = candidates.filter(e => e !== completed);
  for (let onGoing of active) {
    candidates = candidates.filter(e => e !== onGoing);
  }

  candidates.sort((a, b) => {
    let x = a.timer ? a.timer : 0;
    let y = a.timer ? a.timer : 0;

    if (x < y) return 1;
    if (y < x) return -1;

    x = a.duration ? a.duration : 0.1;
    y = b.duration ? b.duration : 0.1;

    if (x < y) return 1;
    if (y < x) return -1;
    return 0;
  });

  timers.sort((a, b) => {
    let x = a.duration - a.elapsed;
    let y = b.duration - b.elapsed;

    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  });

  if (timers.length > 0) {
    let downTime = timers[0].duration - timers[0].elapsed;

    for (let i = 0; i < candidates.length; i++) {
      let stepTime = candidates[i].duration || 0.1;
      if (stepTime < downTime) {
        return candidates[i];
      }
    }
  } else {
    return candidates[0];
  }

  // returns null if nothing can be scheduled right now
  return null;
}
