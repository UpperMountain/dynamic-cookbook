import React from "react";
import { ScrollView } from "react-native";
import tabIcon from "../../components/tabIcon";
import Carousel from "../../components/Carousel";
import { Section } from "../../components/Label";
import { SmallMealCard } from "../../components/MealCard";
import RoundedButton from "../../components/RoundedButton";

const MyMeal = () => (
  <ScrollView>
    <Section>You're Making</Section>
    <Carousel>
      <SmallMealCard />
      <SmallMealCard />
      <SmallMealCard />
      <SmallMealCard />
    </Carousel>
    <RoundedButton size={24} gradient width={171} text="Go!" />
  </ScrollView>
);

MyMeal.navigationOptions = {
  title: "My Meal",
  tabBarIcon: tabIcon("book")
};

export default MyMeal;
