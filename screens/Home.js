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
import Label from "../components/Label";
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
    const Section = ({ children }) => (
      <Padded horizontal>
        <Label light>{children}</Label>
      </Padded>
    );

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
            <Section>Recent recipes</Section>
            <Carousel>
              <MealCard />
              <MealCard />
              <MealCard />
              <MealCard />
            </Carousel>
            <Section>Recommended for you</Section>
            <Carousel>
              <SmallMealCard />
              <SmallMealCard />
              <SmallMealCard />
              <SmallMealCard />
            </Carousel>
            <Section>Weeknight eats</Section>
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
