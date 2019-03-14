import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const tabIcon = name => ({ tintColor }) => (
  <FontAwesome name={name} color={tintColor} size={24} />
);

export default tabIcon;
