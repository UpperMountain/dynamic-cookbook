import React from "react";
import { ScrollView, Text } from "react-native";
import SafeView from "../components/SafeView";
import { padding } from "../lib/theme";
import Padded from "../components/Padded";
import RoundedButton from "../components/RoundedButton";
import { NavigationInjectedProps } from "react-navigation";

const Browse = ({ navigation }: NavigationInjectedProps) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: padding * 3 }}>
      <SafeView>
        <Text style={{ fontSize: 20 }}>Browse Recipes</Text>
        <Padded all>
          <RoundedButton
            onPress={() => navigation.push("Meal")}
            text="Go to Meal"
          />
        </Padded>
      </SafeView>
    </ScrollView>
  );
};

export default Browse;
