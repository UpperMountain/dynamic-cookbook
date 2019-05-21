import { Pancakes } from "./pancakes";
import { ParameterDef } from "../../lib/Recipe";
import { simplifyGroup, walk } from "../../lib/graph";

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

          it("should not explode when simplified", () => {
            const a = Pancakes.requires(params);
            const b = Pancakes.requires(params);
            simplifyGroup(a.concat(b));
          });
        });
      }
    }
  }
}
