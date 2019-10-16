import { Step, Node, isIngredient, Duration, totalTime } from "./graph";
import { flatten, uniq } from "lodash";

export enum Stage {
  // Node has not been started yet
  Waiting = "waiting",

  // During that Node's active time
  // Active time begins as soon as the step is presented to
  // the user, and ends when they click that step's complete button
  Active = "active",

  // During that Node's passive time
  // Passive time OPTIONALLY begins after a step's complete button
  // is pressed. A timer is shown in the UI.
  Passive = "passive",

  // Node is fully complete. Chef can move on to Nodes which require it.
  // Nodes are marked Done after either:
  //
  //   A ) a Step has no passive time, and the user hits that
  //       step's complete button
  //
  //   B ) a Step has passive time, and the user completes that timer.
  //
  Done = "done"
}

export enum NextStatus {
  // The recipe is complete
  Done = "done",

  // Waiting on steps, some of which are in active time
  ActiveWaiting = "activeWaiting",

  // Waiting on steps, all of which are in passive time
  PassiveWaiting = "passiveWaiting"
}

export default class Sequencer {
  // Store the root Step.
  private root: Step;

  // Store the status of each node.
  private stages: Map<Node, Stage> = new Map();

  // Store the parents of each node.
  private parents: Map<Node, Step[]> = new Map();

  constructor(requires: Node[]) {
    // Create synthetic root node, depending on all the steps.
    this.root = {
      kind: "step",
      get name(): string {
        throw "Sequencer: should never return synthetic root node";
      },
      get duration(): number {
        throw "Sequencer: should never return synthetic root node";
      },
      until: "",
      requires
    };

    // Initialize the parents map
    this.root.requires.forEach((el: Node) => this.discoverParents(el));
  }

  // Add, recursively, parent information for a node to this.parents
  private discoverParents(root: Node, parent: Step | null = null) {
    if (parent !== null) {
      const currentParents = this.parents.get(root);
      if (currentParents) {
        currentParents.push(parent);
      } else {
        this.parents.set(root, parent ? [parent] : []);
      }
    }

    if (root.kind === "step") {
      for (const req of root.requires) {
        this.discoverParents(req, root);
      }
    }
  }

  // Set the stage of a Node
  public setStage(node: Node, newStage: Stage) {
    this.stages.set(node, newStage);
  }

  // Get the stage of a Node.
  public stage(node: Node) {
    const stat = this.stages.get(node);
    if (typeof stat === "undefined") {
      return Stage.Waiting;
    } else {
      return stat;
    }
  }

  // Gets the total amount of active and passive time in all nodes which require a Step.
  public blockedTime(root: Node): Duration {
    let timeSum: number = totalTime(root);

    const parents = this.parents.get(root);
    if (typeof parents === "undefined") {
      return timeSum;
    }

    for (const parent of parents) {
      timeSum += this.blockedTime(parent);
    }
    return timeSum;
  }

  // Return the leaf nodes that must be completed to begin `root`
  public blockingLeaves(root: Node = this.root): Step[] {
    // Check if nothing needs to be completed
    if (isIngredient(root)) return [];
    if (this.stage(root) === Stage.Done) return [];

    // If the children aren't all finished, return their candidates
    const childrenCands = root.requires.map((el: Node) =>
      this.blockingLeaves(el)
    );
    const rootRequirements = uniq(flatten(childrenCands));
    if (rootRequirements.length !== 0) {
      return rootRequirements;
    }

    return [root];
  }

  // Compares two nodes. If a is more favorable, return -1, 1 for b, and 0 if they're equal.
  private rank(this: any, a: Step, b: Step): -1 | 0 | 1 {
    // Compare the nodes based on their amount of blocked time
    const aBlocked = this.blockedTime(a);
    const bBlocked = this.blockedTime(b);

    if (aBlocked > bBlocked) return -1;
    if (aBlocked < bBlocked) return 1;

    // Otherwise, don't render an opinion
    return 0;
  }

  // Get the node that's most favorable to start next, or null if nothing is available.
  public next(): Step | NextStatus {
    // Get the possible steps
    let candidates = this.blockingLeaves();

    // If we're working on any one of these steps, we can't start another
    // return ActiveWaiting
    const hasActiveStep = candidates.some(
      (e: Step) => this.stage(e) === Stage.Active
    );
    if (hasActiveStep) {
      return NextStatus.ActiveWaiting;
    }

    // Only show steps that haven't been started
    candidates = candidates.filter(
      (s: Step) => this.stage(s) === Stage.Waiting
    );

    // if we can't start anything, return PassiveWaiting
    // There's nothing in active time, so we must be waiting on passive steps.
    if (candidates.length == 0) {
      return NextStatus.PassiveWaiting;
    }

    // If we're finished, return Done.
    if (candidates.length === 1 && candidates[0] === this.root) {
      return NextStatus.Done;
    }

    // Sort them by `this.rank`
    candidates = candidates.sort((a: Step, b: Step) => this.rank(a, b));

    // Return the best candidate.
    return candidates[0];
  }
}
