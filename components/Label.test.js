import React from "react";
import renderer from "react-test-renderer";
import { Label, Section } from "./Label";

describe("Label", () => {
  it("should render something without exploding", () => {
    renderer.create(<Label>Test Label</Label>);
  });

  it("should render a BLACK label", () => {
    const cmp = renderer.create(<Label>Default Test</Label>);
    expect(cmp.toJSON()).toMatchSnapshot();
  });

  it("should render a WHITE label", () => {
    const cmp = renderer.create(<Label light>Light Test</Label>);
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});

describe("Section", () => {
  it("should render something without exploding", () => {
    renderer.creaate(<Section>Test Section</Section>);
  });

  it("should render a section label", () => {
    const cmp = renderer.create(<Section>Test</Section>);
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});
