import React from "react";
import { ScrollView } from "react-native";
import StepView from "../../components/Step";
import Interaction from "../../components/Interaction";
import { Step } from "../../lib/dependencyTree";
import { NavigationScreenConfigProps } from "react-navigation";
import { simplifyGroup } from "../../lib/Procedure";
import Recipe from "../../lib/Recipe";
import { next, prune } from "../../lib/Sequencer";
import { allRecipes } from "../../data";

interface State {
  done: boolean[];
  steps: Step[];
  root: Step | undefined;
}

class MyMeal extends React.Component<NavigationScreenConfigProps, State> {
  constructor(props: NavigationScreenConfigProps) {
    super(props);
    this.state = {
      done: [],
      steps: [],
      root: undefined
    };
  }

  componentDidMount() {
    let root: Step = {
      kind: "step",
      name: "Serve",
      requires: []
    };

    for (let r of this.props.navigation.getParam("recipes", null)) {
      let current: Recipe = allRecipes[r.id];
      let reqs = current.requires(r.config);
      const componentRoots = simplifyGroup(reqs).map(e => e.getNode());
      root.requires = root.requires.concat(componentRoots);
    }

    this.setState({ root: root });

    prune(root);

    this.setState(prev => {
      const steps = [...prev.steps];
      steps.push(next(root, [], null) as Step);
      return { ...prev, steps };
    });
  }

  recipe = () => {
    return this.state.steps.map((data, index) => (
      <StepView
        key={index}
        done={this.state.done[index]}
        number={index}
        interactive
        name={data.name}
        body={data.body || ""}
      >
        <Interaction
          number={index}
          time={data.timer ? data.timer.duration : null}
          title={"step " + (index + 1)}
          body={"Next Step"}
          caption={data.timer ? "until " + data.timer.until : null}
          done={this.state.done[index]}
          onComplete={this.handleComplete}
        />
      </StepView>
    ));
  };

  handleComplete = (num: number) => {
    // TODO: add support for active timer integration
    this.setState(oldState => {
      const done = [...oldState.done];
      done[num] = true;
      const steps = [...oldState.steps];
      if (this.state.steps.slice(-1)[0] !== this.state.root) {
        steps.push(next(
          this.state.root as Step,
          [],
          this.state.steps[num]
        ) as Step);
      }
      return { ...oldState, steps, done };
    });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        {this.recipe()}
      </ScrollView>
    );
  }
}

export default MyMeal;
