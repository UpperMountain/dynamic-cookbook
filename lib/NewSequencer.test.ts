import { simplify } from "./graph";
import { ProcedureAll, ProcedureA, ProcedureB } from "../data/exampleData";
import NewSequencer, { Stage } from "./NewSequencer";

it("should construct without blowing up", () => {
  const roots = [new ProcedureAll(), new ProcedureA()];
  new NewSequencer(roots);
});

describe(".blockingLeaves()", () => {
  it("should return [] for ingredients", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new NewSequencer([root]);

    const ing = root!.requires[0]!.requires[0];
    expect(seq.blockingLeaves(ing)).toHaveLength(0);
  });

  it("should return one element if it only depends on ingredients", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new NewSequencer([root]);

    const el = root!.requires[0];
    expect(seq.blockingLeaves(el)).toHaveLength(1);
    expect(seq.blockingLeaves(el)[0]).toBe(el);
  });

  it("should pay attention to stage", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new NewSequencer([root]);

    // complete the rootProcedure node
    const cands1 = seq.blockingLeaves();
    expect(cands1).toHaveLength(2);
    expect(cands1.filter(e => e instanceof ProcedureA)).toHaveLength(1);
    expect(cands1.filter(e => e instanceof ProcedureB)).toHaveLength(1);

    // Start one of the other procedures
    seq.setStage(root.requires[0], Stage.Active);
    const cands2 = seq.blockingLeaves();
    expect(cands2).toHaveLength(1);
  });
});

describe(".next()", () => {
  it("should return a next candidate with the longest timer", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new NewSequencer([root]);

    expect(seq.next()).toBeInstanceOf(ProcedureB);
  });

  it("should return next candidates in correct sequence", () => {
    const root = new ProcedureAll();
    simplify(root);
    const seq = new NewSequencer([root]);

    const order = [];
    while (true) {
      const next = seq.next();
      if (next == null) break;
      order.push(next);
      seq.setStage(next, Stage.Done);
    }

    expect(order[0]).toBeInstanceOf(ProcedureB);
    expect(order[1]).toBeInstanceOf(ProcedureA);
    expect(order[2]).toBeInstanceOf(ProcedureAll);
  });
});
