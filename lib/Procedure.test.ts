import { repr, simplifyOne, simplify } from "./Procedure";
import { nodeCount } from "./walk";
import {
  ProcedureRoot,
  ProcedureA,
  ProcedureB,
  ProcedureAll
} from "../data/exampleData";

describe("example procedures", () => {
  it("should construct without errors", () => {
    new ProcedureAll();
  });

  it("should have working getNode()", () => {
    new ProcedureAll().getNode();
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
    const merged = proc1.merge(proc2);
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
