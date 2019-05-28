import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LeftLine from "./LeftLine";
import Padded from "./Padded";
import Heading from "./Heading";
import Card from "./Card";
import { padding } from "../lib/theme";
import { MaterialIcons } from "@expo/vector-icons";

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

  if (!hours && !minutes) {
    out += " s";
  }

  return out;
}

export interface Props {
  // Time remaining, or undefined if not started
  remaining?: number;

  // if this card is, or leads to, a timer
  timer?: boolean;

  // "The onions are chopped"
  until: string;

  // tap callback
  onPress: () => void;
}
export default function StepAction(props: Props) {
  const { timer = false, remaining = null, until, onPress } = props;
  if (remaining !== null && !timer) {
    throw new Error("StepAction: passed time remaining without timer enabled");
  }
  return (
    <Card
      shadowAmt={0.5}
      innerStyle={{
        marginLeft: padding / 2,
        marginRight: padding / 2,
        borderRadius: 10
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{ marginLeft: -padding / 2, marginRight: -padding / 2 }}
      >
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
              <MaterialIcons
                name={
                  timer
                    ? remaining != null
                      ? "timer"
                      : "play-circle-outline"
                    : "arrow-forward"
                }
                size={40}
              />
            </View>
          }
        >
          <Padded right vertical>
            {remaining != null && (
              <Text style={{ fontSize: 30 }}>
                {stringFormatInterval(remaining)}
              </Text>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {remaining != null && (
                <MaterialIcons
                  name="arrow-forward"
                  size={20}
                  style={{ marginRight: 5 }}
                />
              )}
              <Heading>{until}</Heading>
            </View>
          </Padded>
        </LeftLine>
      </TouchableOpacity>
    </Card>
  );
}
