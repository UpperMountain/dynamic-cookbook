import React from "react";
import { ScrollView } from "react-native";
import { simplifyGroup, Step, isStep } from "../../lib/graph";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipeSpec } from "../../lib/Recipe";
import Sequencer, { Stage, NextStatus } from "../../lib/Sequencer";
import { recipes } from "../../data";
import { flatten } from "lodash";
import LeftLine from "../../components/LeftLine";
import StepView, { PendingStep } from "../../components/StepView";
import StepAction from "../../components/StepAction";

function now() {
  return Math.floor(Date.now() / 1000);
}

interface ButtonAction {
  kind: "buttonAction";
  for: Step; // step to complete

  analyticsStart: number; // epoch, when added
}

interface ActiveTimer {
  kind: "activeTimer";

  // That action's Step
  // Must contain a .timer attribute
  for: Step;

  // Epoch seconds, beginning of timer.
  // Null if timer has not been started.
  started: number | null;

  analyticsStart: number; // epoch, when added
}

// Readonly, because they're in React state.
type Action = Readonly<ButtonAction | ActiveTimer>;

interface State {
  steps: Step[];
  actions: Action[];
  status: NextStatus | null; // active/passive waiting, doneness, or nothing.
}

class MyMeal extends React.Component<NavigationScreenConfigProps, State> {
  scroll: React.RefObject<ScrollView> = React.createRef();
  seq: Sequencer;

  constructor(props: NavigationScreenConfigProps) {
    super(props);

    const specs: RecipeSpec[] = Object.values(
      this.props.navigation.getParam("recipes", {})
    );

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
      status: null
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

    // If there isn't anything to do, record that and return.
    if (!isStep(next)) {
      this.setState({ status: next });
      return;
    }

    // We have something to do---clear status.
    this.setState({ status: null });

    // Add the step, and its actions, to the UI
    const actionBase = { for: next, analyticsStart: Date.now() };
    const action: Action = next.timer
      ? { ...actionBase, kind: "activeTimer", started: null }
      : { ...actionBase, kind: "buttonAction" };

    this.setState(old => ({
      ...old,
      pending: false,
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
      this.trackActionEnd(action);
    }

    // Get the next step, if we can.
    this.nextStep();
  }

  // track action end events to Segment analytics
  private trackActionEnd(_action: Action) {
    // Send a BUNCH of information about what just happened to Segment.
    // Hopefully we can use this to tweak the time estimates for each step.
    return;
    // TODO: for the time being, the following will crash RN, without a trace.
    //       I have no clue why. Maybe fix this later.
    //
    // Segment.trackWithProperties("cookingAction", {
    //   kind: action.kind,
    //   constructorName: action.for.constructor.name,
    //   name: action.for.name,
    //   body: action.for.body,
    //   until: action.for.until,
    //   timer: action.for.timer,
    //   duration: action.for.duration,
    //   started: action.analyticsStart,
    //   timerStarted: action.started,
    //   duration: Date.now() - action.analyticsStart
    // });
  }

  render() {
    // TODO: ui for pending state?
    const { steps, actions, status } = this.state;
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
        {status == NextStatus.PassiveWaiting && <PendingStep />}
        {actions.map((action: Action, i: number) => (
          <LeftLine overlap key={i}>
            {action.kind === "activeTimer" && action.started ? (
              <StepAction
                until={action.for.timer!.until}
                onPress={() => this.advance(action)}
                remaining={action.started + action.for.timer!.duration - now()}
                timer={true}
              />
            ) : (
              <StepAction
                until={action.for.until || `"${action.for.name}" done`}
                onPress={() => this.advance(action)}
                timer={!!action.for.timer}
              />
            )}
          </LeftLine>
        ))}

        {/* take up the remaining space */}
        <LeftLine style={{ flexGrow: 1, height: 100 }} />

        {/* add extra line for overscroll on iOS */}
        <LeftLine style={{ height: 1000, marginBottom: -1000 }} />
      </ScrollView>
    );
  }
}

export default MyMeal;
