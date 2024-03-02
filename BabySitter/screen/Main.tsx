import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNav from "./DrawerNav";
import { color } from "../src/Data";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "red",
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={Home}
        options={{
          title: "Home",

          headerTitleStyle: {
            color: "yellow",
            fontSize: 25,
          },
          headerStyle: {
            height: 75,
            backgroundColor: "red",
          },
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={DrawerNav}
        options={{
          title: "Favourite",

          headerTitleStyle: {
            color: color.blackBlue,
            fontSize: 25,
          },
          headerStyle: {
            height: 75,
            backgroundColor: color.orange,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
