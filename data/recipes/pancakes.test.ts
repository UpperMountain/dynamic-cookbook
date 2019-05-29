import { Pancakes } from "./pancakes";
import { ParameterDef } from "../../lib/Recipe";
import AsyncSlicer from "../../lib/AsyncSlicer";
import {
  simplifyGroup,
  walk,
  nodeCount,
  nodeCountGroup
} from "../../lib/graph";

function getOptionsForId(id: string): string[] {
  const param: ParameterDef = Pancakes.config.filter(
    ({ id: paramId }: ParameterDef) => paramId === id
  )[0];
  if (param.kind === "categorical") {
    return Object.keys(param.options);
  } else {
    throw `options of id=${id} are not categorical`;
  }
}

// Do all the work synchronously
// This gives a *massive* performance speedup
const slicer = new AsyncSlicer(null);

for (const serves of [2, 20]) {
  for (const skillet of getOptionsForId("skillet")) {
    for (const premade of getOptionsForId("premade")) {
      for (const eggWhites of getOptionsForId("eggWhites")) {
        const params = { serves, skillet, premade, eggWhites };
        describe(`pancakes(${JSON.stringify(params)})`, () => {
          it("should instantiate", () => {
            Pancakes.requires(params);
          });

          it("should produce nodes with working getters", () => {
            const root = Pancakes.requires(params);
            for (let node of walk(root[0])) {
              let _1 = node.name;
              let _2 = node.body;
              if (node.kind === "step") {
                let _3 = node.timer;
                let _4 = node.until;
              }
            }
          });

          it("should not explode when simplified", async () => {
            const a = Pancakes.requires(params);
            const b = Pancakes.requires(params);
            await simplifyGroup(a.concat(b), slicer);
          });

          it("should simplify properly with itself", async () => {
            const original = Pancakes.requires({
              ...params,
              serves: 2 * params.serves
            });
            const a = Pancakes.requires(params);
            const b = Pancakes.requires(params);
            await simplifyGroup(a.concat(b), slicer);

            // should mostly simplify most of the way
            const originalCount = nodeCount(original[0]);
            const simplifiedCount = nodeCountGroup([a[0], b[0]]);
            expect(simplifiedCount).toBeGreaterThan(originalCount * 0.9);
            expect(simplifiedCount).toBeLessThan(originalCount * 1.1);
          });
        });
      }
    }
  }
}
