import React from "react";
import {
  MealContextProvider,
  MealContextConsumer,
  MealContext
} from "./mealContext";
import { getRecipeDefaults } from "./Recipe";
import { Pancakes } from "../data/recipes/pancakes";
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

  updateRecipe({ id: "Pancakes", config: getRecipeDefaults(Pancakes) });
  expect(updateFn).toHaveBeenCalled();
});

describe("updateRecipe()", () => {
  it("should add recipes on the next render", async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);

    updateRecipe({ id: "Pancakes", config: getRecipeDefaults(Pancakes) });
    expect(updateFn).toHaveBeenCalled();
    const call = updateFn.mock.calls[0][0];

    expect(call.recipes).toHaveProperty("Pancakes");
    expect(call.recipes["Pancakes"]).toMatchObject({ id: "Pancakes" });
  });

  it("should update recipe configuration", async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);

    updateRecipe({ id: "Pancakes", config: getRecipeDefaults(Pancakes) });
    let call = updateFn.mock.calls[0][0];
    expect(call.recipes).toHaveProperty("Pancakes");
    expect(call.recipes["Pancakes"]).toMatchObject({
      id: "Pancakes",
      config: getRecipeDefaults(Pancakes)
    });

    updateFn.mockClear();
    updateRecipe({
      id: "Pancakes",
      config: { ...getRecipeDefaults(Pancakes), serves: 10 }
    });
    call = updateFn.mock.calls[0][0];
    expect(call.recipes).toHaveProperty("Pancakes");
    expect(call.recipes["Pancakes"]).toMatchObject({
      id: "Pancakes",
      config: { serves: 10 }
    });
  });

  it("should start simplifying", async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);

    updateRecipe({ id: "Pancakes", config: getRecipeDefaults(Pancakes) });
    let call = updateFn.mock.calls[0][0];

    // Immediately, should be working.
    expect(call.working).toBe(true);
    updateFn.mockClear();
  });

  it("should eventually render with simplified recipe", done =>
    (async () => {
      const updateFn = jest.fn();
      const { updateRecipe } = await testMount(updateFn);
      updateRecipe({ id: "Pancakes", config: getRecipeDefaults(Pancakes) });
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

    const spec = { id: "Pancakes", config: getRecipeDefaults(Pancakes) };
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

    const spec = { id: "Pancakes", config: getRecipeDefaults(Pancakes) };
    updateRecipe(spec);
    expect(updateFn).toHaveBeenCalled();
    let call = updateFn.mock.calls[0][0];

    updateFn.mockClear();
    removeRecipe("Pancakes");
    expect(updateFn).toHaveBeenCalled();
    call = updateFn.mock.calls[0][0];
    expect(call.recipes).toEqual({});
  });

  it("should set working:true", async () => {
    const updateFn = jest.fn();
    const { removeRecipe, updateRecipe } = await testMount(updateFn);

    const spec = { id: "Pancakes", config: getRecipeDefaults(Pancakes) };
    updateRecipe(spec);
    expect(updateFn).toHaveBeenCalled();
    let call = updateFn.mock.calls[0][0];
    expect(call.working).toBe(true);

    // wait for second resolution, w/ complete calculation
    updateFn.mockClear();
    await new Promise(resolve => updateFn.mockImplementation(() => resolve()));
    call = updateFn.mock.calls[0][0];
    expect(call.working).toBe(false);

    updateFn.mockClear();
    removeRecipe("Pancakes");
    expect(updateFn).toHaveBeenCalled();
    call = updateFn.mock.calls[0][0];
    expect(call.working).toBe(true);
  });
});

it("should simplify multiple recipes together", done =>
  (async () => {
    const updateFn = jest.fn();
    const { updateRecipe } = await testMount(updateFn);
    updateRecipe({ id: "Pancakes", config: getRecipeDefaults(Pancakes) });
    updateRecipe({ id: "ChaiLatte", config: getRecipeDefaults(ChaiLatte) });
    updateFn.mockClear();

    let hasChai = false;
    let hasPancakes = false;

    updateFn.mockImplementation((ctx: MealContext) => {
      expect(ctx.working).toBe(false); // not working
      expect(ctx.requires.length).toBeGreaterThan(0);

      for (let node of walkGroup(ctx.requires)) {
        if (node instanceof Ingredients.Chai) hasChai = true;
        if (node instanceof Ingredients.Flour) hasPancakes = true;
      }

      if (hasChai && hasPancakes) {
        done();
      }
    });
  })());
