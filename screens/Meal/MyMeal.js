import React from "react";
import { ScrollView } from "react-native";
import Interaction from "../../components/Interaction";
import Step from "../../components/Step";

const MyMeal = () => (
  <ScrollView
    contentContainerStyle={{
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <Step
      number={1}
      title={"First Thing"}
      body={
        "For this step you must do a thing. There is a lot to do here so there is text in order to instruct you on how to do this thing."
      }
    />
    <Step
      number={2}
      title={"Second Thing"}
      body={
        "This is a slightly smaller step, however, it leads into a timer card."
      }
    />
    <Interaction title={"do a thing"} time={65} />
    <Interaction title={"untimed step"} caption={"random caption text"} />
    <Step
      number={3}
      title={"Third Thing"}
      body={"This step follows a timer. I just want to see how it will look."}
    />
  </ScrollView>
);

export default MyMeal;
