import React from "react";
import { TouchableOpacity } from "react-native";
import Card from "./Card";
import { padding } from "../lib/theme";
import { FontAwesome } from "@expo/vector-icons";
import Padded from "./Padded";
import { Heading1 } from "./Heading";

interface Props {
  onPress: () => void;
}

export default function CompleteButton(props: Props) {
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
        onPress={props.onPress}
        style={{ marginLeft: -padding / 2, marginRight: -padding / 2 }}
      >
        <Padded
          left
          right
          vertical
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <FontAwesome name={"flag-checkered"} size={40} />
          <Heading1 style={{ flex: 1, textAlign: "center" }}>
            {"Enjoy!"}
          </Heading1>
        </Padded>
      </TouchableOpacity>
    </Card>
  );
}
