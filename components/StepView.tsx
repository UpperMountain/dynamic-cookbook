import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Step } from "../lib/graph";
import LeftLine from "./LeftLine";
import Markdown from "react-native-markdown-renderer";
import Padded from "./Padded";
import Card from "./Card";
import { padding } from "../lib/theme";
import { MaterialIcons } from "@expo/vector-icons";

const topSize = 40;

interface CircledProps {
  children: string;
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
      <Text style={{ fontSize: 18 }}>{children}</Text>
    </View>
  );
}

function stringFormatInterval(seconds: number) {
  let minutes: number | null = null;
  let hours: number | null = null;
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
  }
  if (minutes && minutes > 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  let out = "";
  if (hours) out += hours.toString().padStart(2, "0") + ":";
  if (minutes) out += minutes.toString().padStart(2, "0") + ":";
  out += seconds.toString().padStart(2, "0");

  return out;
}

export interface StepActionProps {
  // Time remaining, or null to disable timer
  timer: number | null;

  // "The onions are chopped"
  until: string;

  // tap callback
  onPress: () => void;
}
export function StepAction(props: StepActionProps) {
  const { timer, until, onPress } = props;
  return (
    <Card shadowAmt={0.5}>
      <TouchableOpacity onPress={onPress}>
        <LeftLine
          hidden
          aside={
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <MaterialIcons name="chevron-right" size={40} />
            </View>
          }
        >
          <Padded right vertical>
            {timer && (
              <Text style={{ fontSize: 30 }}>
                {stringFormatInterval(timer)}
              </Text>
            )}
            <Text style={{ fontSize: 20 }}>{until}</Text>
          </Padded>
        </LeftLine>
      </TouchableOpacity>
    </Card>
  );
}

export interface Props {
  step: Step;
  num: number;
}

export default function StepView(props: Props) {
  const { step, num } = props;
  return (
    <LeftLine aside={<Circled>{num.toString()}</Circled>}>
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
          <Markdown>{step.body}</Markdown>
        ) : (
          <View style={{ height: padding }} />
        )}
      </Padded>
    </LeftLine>
  );
}
