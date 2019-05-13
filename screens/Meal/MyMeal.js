import React from "react";
import { ScrollView, Text } from "react-native";
import Step from "../../components/Step";
import theme from "../../lib/theme";
import Interaction from "../../components/Interaction";

class MyMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: []
    };
  }

  handleComplete = number => {
    console.log(number);
    this.setState(oldState => {
      const done = [...oldState.done];
      done[number] = true;
      return { ...oldState, done };
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
        <Text style={theme.header}>This is a test environment</Text>
        {this.props.navigation && (
          <Text>
            {JSON.stringify(
              this.props.navigation.getParam("recipes", null),
              null,
              2
            )}
          </Text>
        )}
        <Step
          done={this.state.done[0]}
          number={0}
          interactive
          title={"First Thing"}
          body={
            "For this step you must do a thing. There is a lot to do here so there is text in order to instruct you on how to do this thing."
          }
        >
          <Interaction number={0} time={10} onComplete={this.handleComplete} />
        </Step>
        <Step
          time={20}
          number={1}
          title={"Second Thing"}
          body={
            "This is a slightly smaller step, however, it leads into a timer card."
          }
        />
        <Step
          number={2}
          title={"Third Thing"}
          body={
            "This step follows a timer. I just want to see how it will look."
          }
        />
        <Step
          number={3}
          title={"Fourth Thing"}
          body={
            "This is yet another step. It is the last one in the list for now."
          }
        />
      </ScrollView>
    );
  }
}

export default MyMeal;
