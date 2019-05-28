import { simplify, isStep } from "./graph";
import { ProcedureAll, ProcedureA, ProcedureB } from "../data/exampleData";
import Sequencer, { Stage, NextStatus } from "./Sequencer";

function unspool(seq: Sequencer) {
  const order = [];
  while (true) {
    const next = seq.next();
    if (!isStep(next)) break;
    order.push(next);
    seq.setStage(next, Stage.Done);
  }
  return order;
}

it("should construct without blowing up", () => {
  const roots = [new ProcedureAll(), new ProcedureA()];
  new Sequencer(roots);
});

describe(".blockingLeaves()", () => {
  it("should return [] for ingredients", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    const ing = root!.requires[0]!.requires[0];
    expect(seq.blockingLeaves(ing)).toHaveLength(0);
  });

  it("should return one element if it only depends on ingredients", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    const el = root!.requires[0];
    expect(seq.blockingLeaves(el)).toHaveLength(1);
    expect(seq.blockingLeaves(el)[0]).toBe(el);
  });

  it("should return multiple Steps", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    // Nothing has been started
    const cands1 = seq.blockingLeaves();
    expect(cands1).toHaveLength(2);
    expect(cands1.filter(e => e instanceof ProcedureA)).toHaveLength(1);
    expect(cands1.filter(e => e instanceof ProcedureB)).toHaveLength(1);
  });
});

describe(".timeBlocked()", () => {
  it("should return total blocked time", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    const total = seq.blockedTime(root!.requires[0]!.requires[0]);
    const child1 = seq.blockedTime(root!.requires[0]);
    const child2 = seq.blockedTime(root!.requires[1]);

    expect(total).toEqual(child1 + child2);
  });

  it("should return the correct value for the root node", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    expect(seq.blockedTime(root)).toEqual(30);
  });
});

describe(".next()", () => {
  it("should return a next candidate with the longest timer", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    expect(seq.next()).toBeInstanceOf(ProcedureB);
  });

  it("should return next candidates in correct sequence", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    // run out all steps
    const order = unspool(seq);

    expect(order[0]).toBeInstanceOf(ProcedureB);
    expect(order[1]).toBeInstanceOf(ProcedureA);
    expect(order[2]).toBeInstanceOf(ProcedureAll);
  });

  it("should return Done at end of recipe", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    // complete the recipe
    unspool(seq);

    expect(seq.next()).toEqual(NextStatus.Done);
  });

  it("should not return any candidates when one is active", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    // mark A as active
    seq.setStage(root!.requires[0], Stage.Active);

    const next = seq.next();
    expect(next).toEqual(NextStatus.ActiveWaiting);
  });

  it("should return the correct waiting status", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new Sequencer([root]);

    // mark A, B as active
    seq.setStage(root!.requires[0], Stage.Active);
    seq.setStage(root!.requires[1], Stage.Passive);

    let next = seq.next();
    expect(next).toEqual(NextStatus.ActiveWaiting);

    // Mark A as passive
    seq.setStage(root!.requires[0], Stage.Passive);

    next = seq.next();
    expect(next).toEqual(NextStatus.PassiveWaiting);
  });
});
