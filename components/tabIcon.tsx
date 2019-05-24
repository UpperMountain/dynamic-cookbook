import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  tintColor?: string;
}

export default function tabIcon(name: string) {
  return function TabIcon({ tintColor }: Props) {
    return <MaterialIcons name={name} color={tintColor} size={24} />;
  };
}

export function communityTabIcon(name: string) {
  return function TabIcon({ tintColor }: Props) {
    return <MaterialCommunityIcons name={name} color={tintColor} size={24} />;
  };
}
