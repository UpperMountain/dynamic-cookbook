import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function tabIcon(name) {
  return function TabIcon({ tintColor }) {
    return <MaterialIcons name={name} color={tintColor} size={24} />;
  };
}
