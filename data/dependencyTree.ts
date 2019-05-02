// A duration, in minutes.
type Duration = number;

// A user-facing timer.
export interface Timer {
  duration: Duration;
  until: string;
}

export interface Ingredient {
  kind: "ingredient";
  name: string;
}

export interface Step {
  kind: "step";

  // display attributes for the ui
  name: string;
  body: string;

  // timers
  duration: Duration;
  timer?: Timer; // passive time after the step

  // dependencies
  requires: Node[];
}

// The final product---what we're cooking.
export interface Recipe {
  kind: "recipe";
}

// union type discriminated on `kind`
export type Node = Ingredient | Step;
