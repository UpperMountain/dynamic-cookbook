import Procedure from "./Procedure";
import { Node } from "./dependencyTree";
import { walk, nodeCount, walkWhere } from "./walk";
import { ProcedureAll } from "../data/exampleData";

describe("walk()", () => {
  it("should iterate over the right number of nodes", () => {
    const root = new ProcedureAll();

    let count = 0;
    for (let _ of walk<Procedure>(root)) {
      count++;
    }

    expect(count).toBe(ProcedureAll.unsimplifiedNodeCount);
  });

  it("should not repeat nodes", () => {
    const proc1 = new ProcedureAll();
    proc1.requires[0].requires = [...proc1.requires[1].requires];

    let count = 0;
    for (let _ of walk<Procedure>(proc1)) {
      count++;
    }

    expect(count).toBeLessThan(ProcedureAll.unsimplifiedNodeCount);
  });
});

describe("walkWhere()", () => {
  it("should be able to filter for ingredients", () => {
    const root = new ProcedureAll().getNode();
    let count = 0;
    const nodes = walkWhere<Node>(root, (el: Node) => el.kind === "ingredient");
    for (let el of nodes) {
      expect(el.kind).toEqual("ingredient");
      count += 1;
    }
    expect(count).toBe(8);
  });
});

describe("nodeCount()", () => {
  it("should count the right number of nodes", () => {
    const root = new ProcedureAll();
    expect(nodeCount(root)).toBe(ProcedureAll.unsimplifiedNodeCount);
  });
});
