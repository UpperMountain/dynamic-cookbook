import React from "react";
import { ScrollView } from "react-native";
import Padded from "./Padded";

const Carousel = ({ children }) => (
  <ScrollView horizontal style={{ overflow: "visible" }}>
    <Padded horizontal style={{ display: "flex", flexDirection: "row" }}>
      {children}
    </Padded>
  </ScrollView>
);

export default Carousel;
