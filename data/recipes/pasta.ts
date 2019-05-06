import { Step, Ingredient, Recipe } from "../dependencyTree";
import Procedure, { mergeByChildren } from "../Procedure";

// ///////////////////////////////////////////////////////////////////////////////////

export class Onion implements Procedure {
  constructor(public count: number) {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "Onion",
      body: "something something shrek quote",
      amount: this.count
    };
  }

  merge(other: Procedure) {
    if (other instanceof Onion) {
      this.count += other.count;
      return this;
    }

    return null;
  }

  requires = [];
}

export class Garlic implements Procedure {
  constructor(public cloves: number) {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "Garlic",
      body: "is it just called... a garlic? a garlic... bulb? a head?",
      amount: Math.ceil(this.cloves / 4)
    };
  }

  merge(other: Procedure) {
    if (other instanceof Garlic) {
      this.cloves += other.cloves;
      return this;
    }

    return null;
  }

  requires = [];
}

export class PastaSauce implements Procedure {
  constructor(public serves: number) {}
  getNode(): Step {
    return {
      kind: "step",
      name: "Start the sauce",
      body: `
        Throw the garlic in a pan with some oil. Over medium heat, cook until the
        garlic starts to brown.

        Add onion, oregano, and some salt. Cook until the onion is soft.

        Add the tomatoes (with the juicy stuff) and cook for about 20 minutes, or
        until the sauce is reduced.
      `,
      timer: { duration: 20, until: "reduced slightly" },
      requires: this.requires.map(e => e.getNode())
    };
  }

  // this is technically a whole clove of garlic, but it's also a proof-of-concept example
  requires = [new Garlic(2 * this.serves), new Onion(0.5 * this.serves)];

  merge = mergeByChildren;
}

export class Spaghetti implements Procedure {
  constructor(public serves: number) {}
  getNode(): Ingredient {
    return {
      kind: "ingredient",
      name: "Spaghetti",
      body: "It's just spaghetti.",
      amount: this.serves * 12
    };
  }

  merge(other: Procedure) {
    if (other instanceof Spaghetti) {
      this.serves += other.serves;
      return this;
    }

    return null;
  }

  requires = [];
}

export class Pasta implements Procedure {
  constructor(public serves: number) {}
  getNode(): Step {
    return {
      kind: "step",
      name: "Start the pasta",
      body: `
      Once the water comes to a boil, throw in the pasta.

      Boil it for the time written on the box (generally 9-10 minutes) or until
      [it's al dente][al-dente].
    `,
      timer: { duration: 9, until: "al dente" },
      requires: this.requires.map(e => e.getNode())
    };
  }
  merge = mergeByChildren;
  requires = [new Spaghetti(this.serves)];
}

export class PastaCombine implements Procedure {
  constructor(public serves: number) {}
  getNode(): Step {
    return {
      kind: "step",
      name: "Combine the sauce and the pasta",
      body: `
        When the pasta is done, strain the water out of the pot. Throw in some butter.

        When the sauce is done, take it off the heat.

        Pour the sauce over the pasta, and shake the pot around until covered.
      `,
      requires: this.requires.map(e => e.getNode())
    };
  }
  merge = mergeByChildren;
  requires = [new Pasta(this.serves), new PastaSauce(this.serves)];
}

export class PastaRecipe implements Procedure {
  constructor(public serves: number) {}
  getNode(): Recipe {
    return {
      kind: "recipe",
      name: `Pasta recipe, serves ${this.serves}`,
      body: `
        This is a _test_, with *rich* formatting from Markdown.

        Do paragraphs work? Cool!
      `,
      requires: this.requires.map(e => e.getNode())
    };
  }

  merge(other: Procedure) {
    if (other instanceof PastaRecipe) {
      this.serves += other.serves;
      this.requires = this.requires.concat(other.requires);
      return this;
    }

    return null;
  }

  requires = [new PastaCombine(this.serves)];
}
