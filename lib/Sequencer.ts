import { Step, Node, isIngredient } from "./graph";
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

export default class Sequencer {
  // Store the root Step.
  private root: Step;

  // Store the status of each node.
  private stages: Map<Node, Stage>;

  constructor(requires: Node[]) {
    // Create synthetic root node, depending on all the steps.
    this.root = {
      kind: "step",
      get name(): string {
        throw "Sequencer: should never return synthetic root node";
      },
      until: "",
      requires
    };

    // set up the stage map
    this.stages = new Map<Node, Stage>();
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
    // First, compare passive time.
    // Large amounts of passive time are more favorable.
    const passiveTime = (s: Step) => (s.timer ? s.timer.duration : -1); // -1 is maximimally unfavorable
    if (passiveTime(a) > passiveTime(b)) return -1;
    if (passiveTime(a) < passiveTime(b)) return 1;

    // Second, compare active time.
    // Short amounts of active time are favorable.
    const activeTime = (s: Step) => s.duration || Infinity; // Infinity is maximally unfavorable
    if (activeTime(a) < passiveTime(b)) return -1;
    if (activeTime(a) > activeTime(b)) return 1;

    // Otherwise, don't render an opinion
    return 0;
  }

  // Get the node that's most favorable to start next, or null if nothing is available.
  public next(): Step | null {
    // Get the possible steps
    let candidates = this.blockingLeaves();

    // Only show steps that haven't been started
    candidates = candidates.filter(
      (s: Step) => this.stage(s) === Stage.Waiting
    );

    // Sort them by `this.rank`
    candidates = candidates.sort(this.rank);

    // If we're finished, return null.
    if (candidates.length === 1 && candidates[0] === this.root) {
      return null;
    }

    // Return the first one.
    if (candidates.length > 0) {
      return candidates[0];
    } else {
      return null;
    }
  }
}
