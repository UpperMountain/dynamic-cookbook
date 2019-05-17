import {
  ProcedureRoot,
  ProcedureA,
  ProcedureB,
  ProcedureAll
} from "../data/exampleData";
import {
  Node,
  nodeCount,
  repr,
  simplify,
  simplifyOne,
  Step,
  walk,
  walkWhere
} from "./graph";

describe("example procedures", () => {
  it("should construct without errors", () => {
    new ProcedureAll();
  });

  it("should have .name", () => {
    expect(new ProcedureAll().name).not.toBeUndefined();
  });
});

describe("mergeByChildren", () => {
  it("should merge two Procedures of the same type", () => {
    const proc1 = new ProcedureA();
    const proc2 = new ProcedureA();
    const merged = proc1.merge(proc2);
    expect(merged).not.toBeNull();
  });

  it("should not merge two Procedures of different type", () => {
    const proc1 = new ProcedureA();
    const proc2 = new ProcedureB();
    const merged = proc1.merge(proc2);
    expect(merged).toBeNull();
  });

  it("should concatenate dependencies together", () => {
    const proc1 = new ProcedureA();
    const proc2 = new ProcedureA();
    const merged = proc1.merge(proc2) as Step;
    expect(merged!.requires).toHaveLength(new ProcedureA().requires.length * 2);
  });
});

describe("reduction merge", () => {
  it("should merge two Procedures of the same type", () => {
    const proc1 = new ProcedureRoot();
    const proc2 = new ProcedureRoot();
    const merged = proc1.merge(proc2);
    expect(merged!.amount).toBe(2);
  });

  it("should not merge two procedures of differing types", () => {
    const proc1 = new ProcedureRoot();
    const proc2 = new ProcedureB();
    const merged = proc1.merge(proc2);
    expect(merged).toBeNull();
  });
});

describe("repr()", () => {
  it("should return description text", () => {
    const root = new ProcedureAll();
    expect(repr(root).length).toBeGreaterThan(100); // large-ish string
  });
});

describe("simplifyOne()", () => {
  it("should work without errors", () => {
    const root = new ProcedureAll();
    simplifyOne(root);
  });

  it("should decrease the node count", () => {
    const root = new ProcedureAll();
    const n = nodeCount(root);
    simplifyOne(root);
    expect(nodeCount(root)).toBeLessThan(n);
  });
});

describe("simplifyAll()", () => {
  it("should work without errors", () => {
    const root = new ProcedureAll();
    simplify(root);
  });

  it("should simplify to the correct node count", () => {
    const root = new ProcedureAll();
    expect(nodeCount(root)).toBe(ProcedureAll.unsimplifiedNodeCount);
    simplify(root);
    expect(nodeCount(root)).toBe(ProcedureAll.simplifiedNodeCount);
  });
});

describe("walk()", () => {
  it("should iterate over the right number of nodes", () => {
    const root = new ProcedureAll();

    let count = 0;
    for (let _ of walk(root)) {
      count++;
    }

    expect(count).toBe(ProcedureAll.unsimplifiedNodeCount);
  });

  it("should not repeat nodes", () => {
    const proc1 = new ProcedureAll();
    proc1.requires[0].requires = [...proc1.requires[1].requires];

    let count = 0;
    for (let _ of walk(proc1)) {
      count++;
    }

    expect(count).toBeLessThan(ProcedureAll.unsimplifiedNodeCount);
  });
});

describe("walkWhere()", () => {
  it("should be able to filter for ingredients", () => {
    const root = new ProcedureAll();
    let count = 0;
    const nodes = walkWhere(root, (el: Node) => el.kind === "ingredient");
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
