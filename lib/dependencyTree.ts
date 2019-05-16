// A duration, in minutes.
type Duration = number;

// A user-facing timer.
export interface Timer {
  duration: Duration;
  task?: string; // "simmer the sauce"
  until: string; // "until reduced by 1/3"
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

  // timers
  duration?: Duration; // active time during the step
  timer?: Timer; // passive time after the step

  // dependencies
  requires: Node[];

  merge?: MergeFunction;
}

// union type discriminated on `kind`
export type Node = Ingredient | Step;
