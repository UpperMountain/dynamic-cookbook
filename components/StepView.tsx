import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Step } from "../lib/graph";
import LeftLine from "./LeftLine";
import Padded from "./Padded";
import { padding } from "../lib/theme";
import MD from "./CustomMarkdown";

const topSize = 40;

interface CircledProps {
  children: React.ReactNode;
}
function Circled(props: CircledProps) {
  const { children } = props;
  return (
    <View
      style={{
        width: topSize,
        height: topSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 25
      }}
    >
      {children}
    </View>
  );
}

export interface Props {
  step: Step;
  num: number;
}

export default function StepView(props: Props) {
  const { step, num } = props;
  return (
    <LeftLine
      aside={
        <Circled>
          <Text style={{ fontSize: 18 }}>{num.toString()}</Text>
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
          <Text style={{ fontSize: 20 }}>{step.name}</Text>
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
