import React from "react";
import Heading, { Heading1, Heading2 } from "./Heading";
import renderer from "react-test-renderer";

it("has a Heading which is really Heading1", () => {
  expect(Heading).toBe(Heading1);
});

for (let Cmp of [Heading1, Heading2]) {
  describe(`<${Cmp.name}/>`, () => {
    it("should render without exploding", () => {
      renderer.create(<Cmp>testing</Cmp>).unmount();
    });

    it("should pass snapshot tests", () => {
      const cmp = renderer.create(<Cmp>testing</Cmp>);
      expect(cmp.toJSON()).toMatchSnapshot();
      cmp.unmount();
    });
  });
}
