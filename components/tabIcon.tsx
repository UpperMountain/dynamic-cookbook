import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  tintColor?: string;
}

export default function tabIcon(name: string) {
  return function TabIcon({ tintColor }: Props) {
    return <MaterialIcons name={name} color={tintColor} size={24} />;
  };
}
