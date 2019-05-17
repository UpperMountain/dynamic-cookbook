import React from "react";
import { ScrollView } from "react-native";
import StepView from "../../components/Step";
import Interaction from "../../components/Interaction";
import { simplifyGroup, Step, OnGoingTimer } from "../../lib/graph";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipeSpec } from "../../lib/Recipe";
import { next, prune } from "../../lib/Sequencer";
import { recipes } from "../../data";
import { flatten } from "lodash";

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

  scroll: React.RefObject<ScrollView> = React.createRef();

  componentDidMount() {
    const specs: RecipeSpec[] = this.props.navigation.getParam("recipes", []);

    // render the recipe specifications into Procedures
    const specProcedures = specs.map(spec =>
      recipes[spec.id].requires(spec.config)
    );
    let requires = flatten(specProcedures);

    // group-simplify the required Procedures
    requires = simplifyGroup(requires);

    // Synthetic root Step with the requirements
    const root: Step = {
      kind: "step",
      name: "Serve",
      requires
    };

    prune(root);

    this.setState({ root: root });

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
        hasNext={index != this.state.steps.length - 1}
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
        ref={this.scroll}
        onContentSizeChange={() =>
          this.scroll.current && this.scroll.current.scrollToEnd()
        }
        contentContainerStyle={{
          justifyContent: "center",
          flexDirection: "column",
          paddingBottom: 40,
          paddingTop: 20
        }}
      >
        {this.recipe()}
      </ScrollView>
    );
  }
}

export default MyMeal;
