import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import StatisticsScreen from "./Screens/StatisticsScreen";
import { Image } from "react-native";
const Tab = createMaterialBottomTabNavigator();

export default class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Statistics"
          labeled={false}
          barStyle={{
            elevation: 0,
          }}
          shifting={true}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require("../assets/HomeTabIcon.png")}
                  style={{ width: 30, height: 30 }}
                />
              ),
              tabBarColor: "#473F97",
            }}
          />
          <Tab.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require("../assets/statisticsTabIcon.png")}
                  style={{ width: 30, height: 30 }}
                />
              ),
              tabBarColor: "#2980b9",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
