import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Main";
import Profile from "./Profile";
import Chat from "./Chat";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../src/Data";
import Home from "./Home";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: color.grey,
      }}
    >
      <Tab.Screen
        name="Bottom-Main"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Entypo name="home" size={24} color="black" />;
          },
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="chatbubble" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <FontAwesome name="user-circle" size={24} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
