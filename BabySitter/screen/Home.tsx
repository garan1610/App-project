import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Meals from "./Details";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native-gesture-handler";
import Category from "../src/Category";
import { categories, color } from "../src/Data";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Context } from "../src/Context/Context";

const Home = () => {
  const { user, setUser, verified } = useContext(Context);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(user.uid);
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Category {...item} />}
        keyExtractor={(item: any) => item.name}
        numColumns={2}
      />
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={async () => {
          // await AsyncStorage.removeItem("");
          console.log(await AsyncStorage.getItem("myKey"));
          console.log(auth.currentUser);
        }}
      >
        <Text style={{ fontSize: 30 }}>Buootn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",

    width: "90%",
    marginLeft: "5%",
    paddingHorizontal: 15,
    marginVertical: 4,
  },
});
