import React from "react";
import tabIcon from "../components/tabIcon.js";
import { Text, ScrollView, View } from "react-native";
import SafeView from "../components/SafeView";
import Carousel from "../components/Carousel";
import Padded from "../components/Padded";
import { Section } from "../components/Label";
import { MealCard, SmallMealCard } from "../components/MealCard";
import Banner from "../components/Banner";
import RoundedButton from "../components/RoundedButton";

const MyMeal = () => (
  <SafeView style={{ backgroundColor: "white" }}>
    <Banner text={"Your Meal"} />
    <ScrollView style={{ backgroundColor: "#F6F6F6" }}>
      <Section>You're Making</Section>
      <Carousel>
        <SmallMealCard />
        <SmallMealCard />
        <SmallMealCard />
        <SmallMealCard />
      </Carousel>
      <RoundedButton size={24} gradient width={171} text={"Go!"} />
    </ScrollView>
  </SafeView>
);

MyMeal.navigationOptions = {
  title: "My Meal",
  tabBarIcon: tabIcon("book")
};

export default MyMeal;
