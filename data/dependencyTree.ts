// A duration, in minutes.
type Duration = number;

// A user-facing timer.
export interface Timer {
  duration: Duration;
  until: string;
}

export interface WithBody {
  // for display in the UI
  name: string;
  body: string;
}

export interface Ingredient extends WithBody {
  kind: "ingredient";
  name: string;
  amount: number; // TODO: physical quantities
}

export interface Step extends WithBody {
  kind: "step";

  // timers
  duration?: Duration; // active time during the step
  timer?: Timer; // passive time after the step

  // dependencies
  requires: (Step | Ingredient)[];
}

// The final product---what we're cooking.
export interface Recipe extends WithBody {
  kind: "recipe";

  // dependencies
  requires: (Step | Recipe)[];
}

// union type discriminated on `kind`
export type Node = Ingredient | Step | Recipe;
