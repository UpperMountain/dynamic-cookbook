import React from "react";
import { ScrollView } from "react-native";
import StepView from "../../components/Step";
import Interaction from "../../components/Interaction";
import { Step, OnGoingTimer } from "../../lib/dependencyTree";
import { NavigationScreenConfigProps } from "react-navigation";
import { simplifyGroup } from "../../lib/Procedure";
import Recipe from "../../lib/Recipe";
import { next, prune } from "../../lib/Sequencer";
import { allRecipes } from "../../data";

interface State {
  done: boolean[];
  steps: Step[];
  active: Step[];
  root: Step | undefined;
  timers: OnGoingTimer[];
}

class MyMeal extends React.Component<NavigationScreenConfigProps, State> {
  constructor(props: NavigationScreenConfigProps) {
    super(props);
    this.state = {
      done: [],
      steps: [],
      active: [],
      timers: [],
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
      let step: Step = next(root, [], null, this.state.active) as Step;
      steps.push(step);
      const active = [...prev.steps];
      active.push(step);
      const timers = [...prev.timers];
      if (step.timer) {
        let newTimer: OnGoingTimer = {
          duration: step.timer.duration,
          until: step.timer.until,
          elapsed: 0
        };
        timers.push(newTimer);
      }
      return { ...prev, steps, timers, active };
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
          onTick={this.updateTimer}
          timer={this.state.timers[index]}
          number={index}
          title={"step " + (index + 1)}
          body={"Next Step"}
          caption={data.timer ? "until " + data.timer.until : null}
          done={this.state.done[index]}
          onComplete={this.handleComplete}
        />
      </StepView>
    ));
  };

  updateTimer = (id: number) => {
    this.setState(prev => {
      let timers = [...prev.timers];
      timers[id].elapsed++;
      if (timers[id].elapsed >= timers[id].duration) {
        timers.splice(id, 1);
      }
      return { ...prev, timers };
    });
  };

  isActive = (id: number, actives: Step[]) => {
    if (this.state.steps.length == id + 1) return false;
    for (let item of actives) {
      if (item === this.state.steps[id]) return true;
    }
    return false;
  };

  handleComplete = (num: number, finished: boolean) => {
    this.setState(oldState => {
      const done = [...oldState.done];
      done[num] = finished;

      let active = [...oldState.active];
      if (finished) {
        active = active.filter(e => e !== this.state.steps[num]);
      }

      const steps = [...oldState.steps];
      const timers = [...oldState.timers];

      if (
        !(
          this.state.steps.slice(-1)[0] === this.state.root ||
          this.isActive(num, active)
        )
      ) {
        // if this is not the last step, make a new step to serve
        let nextStep: Step = next(
          this.state.root as Step,
          this.state.timers,
          finished ? this.state.steps[num] : null,
          this.state.active
        ) as Step;
        if (nextStep !== null) {
          steps.push(nextStep);
          active.push(nextStep);
          done.push(false);

          // create ongoing timer for new step
          if (nextStep.timer) {
            let newTimer: OnGoingTimer = {
              duration: nextStep.timer.duration,
              until: nextStep.timer.until,
              elapsed: 0
            };
            timers.push(newTimer);
          }
        }
      }
      return { ...oldState, steps, done, active };
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
