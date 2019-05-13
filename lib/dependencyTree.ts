// A duration, in minutes.
type Duration = number;

// A user-facing timer.
export interface Timer {
  // TODO: link timers to a step
  duration: Duration;
  until: string;
}

export interface OnGoingTimer extends Timer {
  elapsed: Duration;
}

export interface Described {
  // for display in the UI
  name: string;
  body?: string;
}

export interface Ingredient extends Described {
  kind: "ingredient";
  id: string; // unique identifier
  name: string;
  amount: number; // TODO: physical quantities
}

export interface Step extends Described {
  kind: "step";

  // timers
  duration?: Duration; // active time during the step
  timer?: Timer; // passive time after the step

  // dependencies
  requires: (Step | Ingredient)[];
}

// union type discriminated on `kind`
export type Node = Ingredient | Step;
