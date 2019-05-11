import { isLeaf, getLeaves, next, prune, remove } from "./Sequencer";
import { Node, OnGoingTimer, Step } from "./dependencyTree";

let leafStep: Node = {
  kind: "step",
  duration: 2,
  body: "do a thing",
  name: "step 1",
  requires: []
};

let ingredientNode: Node = {
  kind: "ingredient",
  name: "kevin",
  body: "text",
  amount: 3
};

let step: Node = {
  kind: "step",
  duration: 12,
  body: "do something which has a prerequisite",
  name: "step 2",
  requires: [leafStep, ingredientNode]
};

describe("isLeaf", () => {
  it("should identify this ingredient as a leaf node", () => {
    expect(isLeaf(ingredientNode)).toBe(true);
  });

  it("should identify this step as a leaf node", () => {
    expect(isLeaf(leafStep)).toBe(true);
  });

  it("should identify this step to be not a leaf", () => {
    expect(isLeaf(step)).toBe(false);
  });
});

describe("prune", () => {
  it("should prune ingredient nodes", () => {
    const test: Step = {
      kind: "step",
      name: "main step",
      body: "",
      requires: [
        { kind: "ingredient", name: "ingredient1", body: "", amount: 1 },
        { kind: "ingredient", name: "ingredient2", body: "", amount: 1 },
        { kind: "ingredient", name: "ingredient3", body: "", amount: 1 },
        { kind: "step", name: "step1", body: "", requires: [] }
      ]
    };

    prune(test);

    expect(test.requires).toHaveLength(1);
    expect(test.requires[0].kind).toEqual("step");
  });
});

describe("remove", () => {
  it("should remove a node", () => {
    const test: Step = {
      kind: "step",
      name: "main step",
      body: "",
      requires: [
        { kind: "ingredient", name: "ingredient1", body: "", amount: 1 }
      ]
    };
    remove(test.requires[0], test);
    expect(test.requires).toHaveLength(0);
  });
});

describe("getLeaves", () => {
  let root: Node = {
    kind: "step",
    duration: 3,
    body: "this is the root of the tree",
    name: "thing",
    requires: [ingredientNode, step, step]
  };

  it("should return an array containing 5 leaf nodes", () => {
    let leaves: Node[] = [];
    getLeaves(root, leaves);

    expect(leaves).toHaveLength(5);
    leaves.forEach(element => {
      expect(isLeaf(element)).toBe(true);
    });
  });
});

describe("next", () => {
  // construct a test tree
  let a: Node = {
    kind: "step",
    duration: 3,
    body: "this step is the one which will be completed",
    name: "a",
    requires: []
  };

  let b: Node = {
    kind: "step",
    duration: 3,
    body: "this is a nice node",
    name: "b",
    requires: []
  };

  let c: Node = {
    kind: "step",
    duration: 5,
    body: "this is a node",
    name: "c",
    requires: [a]
  };

  let d: Node = {
    kind: "step",
    duration: 2,
    body: "this node depends on b",
    name: "d",
    requires: [b]
  };

  let e: Node = {
    kind: "step",
    duration: 12,
    body: "this node has too long a length",
    name: "e",
    requires: []
  };

  let f: Node = {
    kind: "step",
    duration: 8,
    body: "assemble all the things and serve",
    name: "step f",
    requires: [c, d, e]
  };

  // test timer
  let longTimer: OnGoingTimer = {
    duration: 10,
    until: "the stuff is done",
    elapsed: 4
  };

  let mediumTimer: OnGoingTimer = {
    duration: 8,
    until: "golden brown",
    elapsed: 4
  };

  let shortTimer: OnGoingTimer = {
    duration: 5,
    until: "things are finished",
    elapsed: 4
  };

  it("should return c as the correct next step", () => {
    expect(next(f as Step, [longTimer], a as Step)).toBe(c);
  });

  it("should return null as no node can fit", () => {
    expect(next(f as Step, [shortTimer], a as Step)).toBeNull();
  });

  it("should return node b", () => {
    expect(next(f as Step, [longTimer, mediumTimer], a as Step)).toBe(b);
  });
});
