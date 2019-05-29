import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Step } from "../lib/graph";
import LeftLine from "./LeftLine";
import Padded from "./Padded";
import Heading, { Heading2 } from "./Heading";
import { padding } from "../lib/theme";
import MD from "./CustomMarkdown";

const topSize = 40;

interface CircledProps {
  children: React.ReactNode;
  completed?: boolean;
}
function Circled(props: CircledProps) {
  const { children, completed = false } = props;
  return (
    <View
      style={[
        {
          width: topSize,
          height: topSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 25
        },
        completed
          ? {
              borderColor: "#008300",
              backgroundColor: "#008300"
            }
          : undefined
      ]}
    >
      {children}
    </View>
  );
}

export interface Props {
  step: Step;
  num: number;
  completed?: boolean;
}
export default function StepView(props: Props) {
  const { step, num, completed = false } = props;
  return (
    <LeftLine
      completed={completed}
      aside={
        <Circled completed={completed}>
          <Heading2 style={{ color: completed ? "white" : undefined }}>
            {num.toString()}
          </Heading2>
        </Circled>
      }
    >
      <Padded right bottom>
        <View
          style={{
            minHeight: topSize,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Heading>{step.name}</Heading>
        </View>
        {step.body ? (
          <MD>{step.body}</MD>
        ) : (
          <View style={{ height: padding }} />
        )}
      </Padded>
    </LeftLine>
  );
}

export function PendingStep() {
  return (
    <LeftLine>
      <Padded vertical style={{ flexDirection: "row", alignItems: "center" }}>
        <ActivityIndicator />
        <Text
          style={{
            marginLeft: padding,
            fontSize: 16,
            color: "rgba(0,0,0,0.4)"
          }}
        >
          Waiting on timers...
        </Text>
      </Padded>
    </LeftLine>
  );
}
