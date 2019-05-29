import React from "react";
import {
  MealContextProvider,
  MealContextConsumer,
  MealContext
} from "./mealContext";
import { getRecipeDefaults } from "./Recipe";
import { Pasta } from "../data/recipes/pasta";
import { ChaiLatte } from "../data/recipes/chai";
import { walkGroup } from "./graph";
import * as Ingredients from "../data/ingredients";
import renderer from "react-test-renderer";

// Test the behavior of the context, without needing to mount things.
async function testMount(
  updateFn: (changed: MealContext) => void
): Promise<MealContext> {
  return new Promise(resolve => {
    let finished = false;

    renderer.create(
      <MealContextProvider>
        <MealContextConsumer>
          {ctx => {
            if (!finished) {
              // Record the functions we need, and resolve
              finished = true;
              resolve(ctx);
            } else {
              // Call the user's callback
              updateFn(ctx);
            }
            return null;
          }}
        </MealContextConsumer>
      </MealContextProvider>
    );
  });
}

it("should mount without exploding", done => {
  renderer
    .create(
      <MealContextProvider>
        <MealContextConsumer>
          {() => {
            done();
            return null;
          }}
        </MealContextConsumer>
      </MealContextProvider>
    )
    .unmount();
});

it("should have a working test fixture", async () => {
  const updateFn = jest.fn();
  const { removeRecipe, updateRecipe } = await testMount(updateFn);

  expect(updateFn).not.toHaveBeenCalled();
  expect(removeRecipe).not.toBeFalsy();
  expect(updateRecipe).not.toBeFalsy();

  updateRecipe({ id: "Pasta", config: getRecipeDefaults(Pasta) });
  expect(updateFn).toHaveBeenCalled();
});

describe("updateRecipe()", () => {
  it("should add recipes on the next render", async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);

    updateRecipe({ id: "Pasta", config: getRecipeDefaults(Pasta) });
    expect(updateFn).toHaveBeenCalled();
    const call = updateFn.mock.calls[0][0];

    expect(call.recipes).toHaveProperty("Pasta");
    expect(call.recipes["Pasta"]).toMatchObject({ id: "Pasta" });
  });

  it("should update recipe configuration", async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);

    updateRecipe({ id: "Pasta", config: getRecipeDefaults(Pasta) });
    let call = updateFn.mock.calls[0][0];
    expect(call.recipes).toHaveProperty("Pasta");
    expect(call.recipes["Pasta"]).toMatchObject({
      id: "Pasta",
      config: getRecipeDefaults(Pasta)
    });

    updateFn.mockClear();
    updateRecipe({
      id: "Pasta",
      config: { ...getRecipeDefaults(Pasta), serves: 10 }
    });
    call = updateFn.mock.calls[0][0];
    expect(call.recipes).toHaveProperty("Pasta");
    expect(call.recipes["Pasta"]).toMatchObject({
      id: "Pasta",
      config: { serves: 10 }
    });
  });

  it("should start simplifying", async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);

    updateRecipe({ id: "Pasta", config: getRecipeDefaults(Pasta) });
    let call = updateFn.mock.calls[0][0];

    // Immediately, should be working.
    expect(call.working).toBe(true);
    updateFn.mockClear();
  });

  it("should eventually render with simplified recipe", done =>
    (async () => {
      const updateFn = jest.fn();
      const { updateRecipe } = await testMount(updateFn);
      updateRecipe({ id: "Pasta", config: getRecipeDefaults(Pasta) });
      updateFn.mockClear();

      updateFn.mockImplementation((ctx: MealContext) => {
        expect(ctx.working).toBe(false); // not working
        expect(ctx.requires.length).toBeGreaterThan(0);
        done();
      });
    })());
});

describe("removeRecipe()", () => {
  it("should do nothing when the recipe is not present", async () => {
    const updateFn = jest.fn();
    const { removeRecipe, updateRecipe } = await testMount(updateFn);

    const spec = { id: "Pasta", config: getRecipeDefaults(Pasta) };
    updateRecipe(spec);
    expect(updateFn).toHaveBeenCalled();
    let call = updateFn.mock.calls[0][0];
    const original = call.recipes;

    updateFn.mockClear();
    removeRecipe("UndefinedRecipeForTesting");
    if (updateFn.mock.calls.length > 0) {
      call = updateFn.mock.calls[0][0];
      expect(call.recipes).toEqual(original);
    }
  });

  it("should remove recipes", async () => {
    const updateFn = jest.fn();
    const { removeRecipe, updateRecipe } = await testMount(updateFn);

    const spec = { id: "Pasta", config: getRecipeDefaults(Pasta) };
    updateRecipe(spec);
    expect(updateFn).toHaveBeenCalled();
    let call = updateFn.mock.calls[0][0];

    updateFn.mockClear();
    removeRecipe("Pasta");
    expect(updateFn).toHaveBeenCalled();
    call = updateFn.mock.calls[0][0];
    expect(call.recipes).toEqual({});
  });
});

it("should simplify multiple recipes together", done =>
  (async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);
    updateRecipe({ id: "Pasta", config: getRecipeDefaults(Pasta) });
    updateRecipe({ id: "ChaiLatte", config: getRecipeDefaults(ChaiLatte) });
    updateFn.mockClear();

    let hasChai = false;
    let hasPasta = false;

    updateFn.mockImplementation((ctx: MealContext) => {
      expect(ctx.working).toBe(false); // not working
      expect(ctx.requires.length).toBeGreaterThan(0);

      for (let node of walkGroup(ctx.requires)) {
        if (node instanceof Ingredients.Chai) hasChai = true;
        if (node instanceof Ingredients.Spaghetti) hasPasta = true;
      }

      if (hasChai && hasPasta) {
        done();
      }
    });
  })());
