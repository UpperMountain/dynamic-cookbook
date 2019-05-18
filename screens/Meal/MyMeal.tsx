import React from "react";
import { ScrollView } from "react-native";
import { simplifyGroup, Step } from "../../lib/graph";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipeSpec } from "../../lib/Recipe";
import Sequencer, { Stage } from "../../lib/Sequencer";
import { recipes } from "../../data";
import { flatten } from "lodash";
import LeftLine from "../../components/LeftLine";
import StepView, { StepAction } from "../../components/StepView";

function now() {
  return Math.floor(Date.now() / 1000);
}

interface ButtonAction {
  kind: "buttonAction";
  for: Step; // step to complete
}

interface ActiveTimer {
  kind: "activeTimer";

  // That action's Step
  // Must contain a .timer attribute
  for: Step;

  // Epoch seconds, beginning of timer.
  // Null if timer has not been started.
  started: number | null;
}

// Readonly, because they're in React state.
type Action = Readonly<ButtonAction | ActiveTimer>;

interface State {
  steps: Step[];
  actions: Action[];
  waiting: boolean; // waiting for action, blocking next step
}

class MyMeal extends React.Component<NavigationScreenConfigProps, State> {
  scroll: React.RefObject<ScrollView> = React.createRef();
  seq: Sequencer;

  constructor(props: NavigationScreenConfigProps) {
    super(props);

    const specs: RecipeSpec[] = this.props.navigation.getParam("recipes", []);

    // render the recipe specifications into Procedures
    const specProcedures = specs.map(spec =>
      recipes[spec.id].requires(spec.config)
    );
    let requires = flatten(specProcedures);

    // group-simplify the required Procedures
    requires = simplifyGroup(requires);

    // construct a Sequencer with the requirements
    this.seq = new Sequencer(requires);

    this.state = {
      steps: [],
      actions: [],
      waiting: false
    };
  }

  updateInterval: NodeJS.Timeout | null = null;
  componentDidMount() {
    // For timers, instead of registering N different intervals, just update
    // the whole component every second and do subtraction in render(). Has
    // the side benefit of updating all the timer displays in sync.
    this.updateInterval = setInterval(() => this.forceUpdate(), 1000);

    // Grab the first step, render it to the UI.
    this.nextStep();
  }

  componentWillUnmount() {
    if (this.updateInterval) clearInterval(this.updateInterval);
  }

  private nextStep() {
    const next = this.seq.next();

    // If there isn't anything to do, set waiting.
    if (next === null) {
      this.setState({ waiting: true });
      return;
    }

    // Add the step, and its actions, to the UI
    const action: Action = next.timer
      ? { for: next, kind: "activeTimer", started: null }
      : { for: next, kind: "buttonAction" };
    this.setState(old => ({
      ...old,
      waiting: false,
      steps: [...old.steps, next],
      actions: [...old.actions, action]
    }));

    // Mark the step as active in the sequencer
    this.seq.setStage(next, Stage.Active);
  }

  // Advances an action.
  // If it's a button, marks the Step as Done.
  // If it's a timer, it will either:
  //  A) start the timer, mark it as Passive
  //  B) complete the timer, mark it as Done
  //
  // It will remove the action from the UI, then
  // call nextStep() to get the next step, if available.
  private advance(action: Action) {
    // For active timers, start them, and update UI
    if (action.kind === "activeTimer" && action.started === null) {
      // Mark as passive
      this.seq.setStage(action.for, Stage.Passive);

      // Start timer, replace in the UI
      const newAction = { ...action, started: now() };
      this.setState(old => ({
        ...old,
        actions: old.actions.map((el: Action) =>
          el !== action ? el : newAction
        )
      }));
    } else {
      // Everything else:

      this.seq.setStage(action.for, Stage.Done); // Mark as done

      // remove from UI
      this.setState(old => ({
        ...old,
        actions: old.actions.filter((el: Action) => el !== action)
      }));
    }

    // Finally, call nextStep() to see if we can do anything else
    this.nextStep();
  }

  render() {
    // TODO: ui for waiting state?
    const { steps, actions, waiting: _waiting } = this.state;
    return (
      <ScrollView
        ref={this.scroll}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {steps.map((step: Step, i: number) => (
          <StepView key={i} num={i + 1} step={step} />
        ))}
        {actions.map((action: Action, i: number) => (
          <LeftLine overlap key={i}>
            {action.kind === "activeTimer" && action.started ? (
              <StepAction
                until={action.for.timer!.until}
                onPress={() => this.advance(action)}
                timer={action.started + action.for.timer!.duration - now()}
              />
            ) : (
              <StepAction
                until={action.for.until || `"${action.for.name}" done`}
                onPress={() => this.advance(action)}
                timer={null}
              />
            )}
          </LeftLine>
        ))}

        {/* take up the remaining space */}
        <LeftLine style={{ flexGrow: 1, height: 100 }} />
      </ScrollView>
    );
  }
}

export default MyMeal;
