import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function tabIcon(name) {
  return function TabIcon({ tintColor }) {
    return <FontAwesome name={name} color={tintColor} size={24} />;
  };
}
