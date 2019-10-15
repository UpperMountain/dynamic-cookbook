import React from "react";
import { InteractionManager } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Node, simplifyGroup } from "./graph";
import { RecipeSpec } from "./Recipe";
import { recipes as allRecipes } from "../data";
import AsyncSlicer from "./AsyncSlicer";
import { flatten } from "lodash";

export interface MealContext {
  // Recipe specifications for the meal.
  recipes: { [key: string]: RecipeSpec };

  // Updater functions to modify the meal
  removeRecipe: MealContextProvider["removeRecipe"];
  updateRecipe: MealContextProvider["updateRecipe"];
  reset: MealContextProvider["reset"];

  // The meal's requirements.
  requires: Node[];
  working: boolean; // computing requirements?
}

const MealContext = React.createContext<MealContext>(
  (null as any) as MealContext // this default will never be used
);

interface Props {
  children: React.ReactNode;
}

interface State {
  value: MealContext;
}

export class MealContextProvider extends React.Component<Props, State> {
  // Upsert a recipe specification into the map.
  private updateRecipe = (recipe: RecipeSpec): void => {
    this.setState(old => ({
      value: {
        ...old.value,
        recipes: { ...old.value.recipes, [recipe.id]: recipe },
        working: true
      }
    }));
  };

  // Remove a recipe specification.
  private removeRecipe = (id: string): void => {
    this.setState(old => {
      const recipes = { ...old.value.recipes };
      delete recipes[id];
      return { ...old, value: { ...old.value, working: true, recipes } };
    });
  };

  // Remove all the recipes from state
  private reset = () => {
    // If the simplifier is doing work, cancel it.
    if (this.simplifyLastSlicer) {
      this.simplifyLastSlicer.cancel();
    }

    // Reset the state to defaults.
    this.setState(this.initialState);
  };

  private initialState: State = {
    value: {
      // Recipe information
      recipes: {},
      removeRecipe: this.removeRecipe,
      updateRecipe: this.updateRecipe,
      reset: this.reset,

      // Simplification info
      requires: [],
      working: false
    }
  };
  state = this.initialState;

  // Key for recipe cache in AsyncStorage
  static storageKey = "mealContext_recipesCache";

  async componentDidMount() {
    // If available, restore the recipe list from AsyncStorage.
    const raw = await AsyncStorage.getItem(MealContextProvider.storageKey);
    if (raw !== null) {
      const restored = JSON.parse(raw);
      console.log("restored recipes:", restored);
      this.setState(old => ({
        ...old,
        value: {
          ...old.value,
          working: true,
          recipes: { ...old.value.recipes, ...restored }
        }
      }));
    }
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    const currentState = this.state;

    // If the recipes have changed...
    if (prevState.value.recipes !== currentState.value.recipes) {
      // Re-simplify the requirements, asynchronously
      this.scheduleSimplify();

      // Also, persist the recipes list to AsyncStorage
      AsyncStorage.setItem(
        MealContextProvider.storageKey,
        JSON.stringify(currentState.value.recipes)
      );
    }
  }

  // If there's a slicer we're currently using, store a reference to it
  // so we can cancel the work if necessary.
  private simplifyLastSlicer: AsyncSlicer | null = null;

  // Schedule the simplification work, handling cancellation, slicing, and
  // delay after user interactions.
  private async scheduleSimplify() {
    // If we're already working, cancel it.
    if (this.simplifyLastSlicer !== null) {
      this.simplifyLastSlicer.cancel();
    }

    try {
      // Use an async slicer, so we don't block the event loop
      const slicer = new AsyncSlicer(30);
      this.simplifyLastSlicer = slicer;

      // Wait for a pause in touches/etc
      await InteractionManager.runAfterInteractions(() => {});
      slicer.pause(); // for cancellation

      await this.simplify(slicer);

      // Work is done.
      this.simplifyLastSlicer = null;
    } catch (err) {
      if (err === AsyncSlicer.InterruptedError) {
        return;
      } else {
        throw err;
      }
    }
  }

  // Re-run recipe simplification
  // Note: state.working should be set to true before this is called.
  private async simplify(slicer: AsyncSlicer) {
    const { value } = this.state;

    // Generate and simplify the recipe
    const recipesArr: RecipeSpec[] = Object.values(value.recipes);
    const specProcedures = recipesArr.map((spec: RecipeSpec) =>
      allRecipes[spec.id].requires(spec.config)
    );
    let requires = flatten(specProcedures);

    // group-simplify the required Procedures
    requires = await simplifyGroup(requires, slicer);

    this.setState(old => ({
      ...old,
      value: { ...old.value, working: false, requires }
    }));
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;
    return (
      <MealContext.Provider value={value}>{children}</MealContext.Provider>
    );
  }
}

export const MealContextConsumer = MealContext.Consumer;
