import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import SearchBar from "../components/SearchBar";
import SafeView from "../components/SafeView";
import { MealCard, SmallMealCard } from "../components/MealCard";
import { FontAwesome } from "@expo/vector-icons";
import tabIcon from "../components/tabIcon";
import Carousel from "../components/Carousel";
import Padded from "../components/Padded";
import { Section } from "../components/Label";
import theme, { padding } from "../lib/theme";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searching: false
    };
  }

  static navigationOptions = {
    tabBarIcon: tabIcon("home")
  };

  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
          display: "flex"
        }}
        colors={["#FFAFBD", "#FFC3A0"]}
      >
        <ScrollView
          vertical
          contentContainerStyle={{ paddingBottom: padding * 3 }}
        >
          <SafeView>
            <Padded top horizontal>
              <SearchBar open={this.state.searching} />
            </Padded>
            <Section light>Recent recipes</Section>
            <Carousel>
              <MealCard />
              <MealCard />
              <MealCard />
              <MealCard />
            </Carousel>
            <Section light>Recommended for you</Section>
            <Carousel>
              <SmallMealCard />
              <SmallMealCard />
              <SmallMealCard />
              <SmallMealCard />
            </Carousel>
            <Section light>Weeknight eats</Section>
            <Carousel>
              <MealCard />
              <MealCard />
              <MealCard />
              <MealCard />
            </Carousel>
          </SafeView>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex"
  }
});

export default Home;
