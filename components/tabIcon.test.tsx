import React from "react";
import tabIcon, { communityTabIcon } from "./tabIcon";
import renderer from "react-test-renderer";

describe('tabIcon("home")', () => {
  const HomeIcon = tabIcon("home");
  it("should render without exploding", () => {
    renderer.create(<HomeIcon />).unmount();
  });

  it("should pass snapshot tests", () => {
    const cmp = renderer.create(
      <>
        <HomeIcon />
        <HomeIcon tintColor="red" />
      </>
    );
    expect(cmp.toJSON()).toMatchSnapshot();
    cmp.unmount();
  });
});

describe('communityTabIcon("account")', () => {
  const AccountIcon = communityTabIcon("account");
  it("should render without exploding", () => {
    renderer.create(<AccountIcon />).unmount();
  });

  it("should pass snapshot tests", () => {
    const cmp = renderer.create(
      <>
        <AccountIcon />
        <AccountIcon tintColor="red" />
      </>
    );
    expect(cmp.toJSON()).toMatchSnapshot();
    cmp.unmount();
  });
});
