import { PastaRecipe } from "./pasta";

it("should create a Pasta without error", () => {
  new PastaRecipe(4);
});

it("should create Nodes from a Pasta without error", () => {
  const a = new PastaRecipe(4);
  const node = a.getNode();
  console.log(node);
});
