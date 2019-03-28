import React from "react";
import { ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import SafeView from "../components/SafeView";
import { MealCard, SmallMealCard } from "../components/MealCard";
import tabIcon from "../components/tabIcon";
import Carousel from "../components/Carousel";
import Padded from "../components/Padded";
import { Section } from "../components/Label";
import { padding } from "../lib/theme";

class Home extends React.Component {
  static navigationOptions = {
    tabBarIcon: tabIcon("home")
  };

  render() {
    return (
      <ScrollView
        vertical
        contentContainerStyle={{ paddingBottom: padding * 3 }}
        style={{ backgroundColor: "#888" }}
      >
        <SafeView>
          <Padded top horizontal>
            <SearchBar />
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
    );
  }
}

export default Home;
