import React from "react";
import { ScrollView, Text } from "react-native";
import Step from "../../components/Step";
import theme from "../../lib/theme";

const MyMeal = ({ navigation }) => (
  <ScrollView
    contentContainerStyle={{
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <Text style={theme.header}>This is a test environment</Text>
    {navigation && (
      <Text>
        {JSON.stringify(navigation.getParam("recipes", null), null, 2)}
      </Text>
    )}
    <Step
      interactive
      number={1}
      title={"First Thing"}
      body={
        "For this step you must do a thing. There is a lot to do here so there is text in order to instruct you on how to do this thing."
      }
    />
    <Step
      interactive
      number={2}
      title={"Second Thing"}
      body={
        "This is a slightly smaller step, however, it leads into a timer card."
      }
    />
    <Step
      number={3}
      title={"Third Thing"}
      body={"This step follows a timer. I just want to see how it will look."}
    />
    <Step
      number={4}
      title={"Fourth Thing"}
      body={"This is yet another step. It is the last one in the list for now."}
    />
  </ScrollView>
);

export default MyMeal;
