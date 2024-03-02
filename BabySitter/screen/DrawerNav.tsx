import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { allMeals, color } from "../src/Data";
import Meals from "../src/Meals";
import { Context } from "../src/Context/Context";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "../FireBase/firebase";

const DrawerNav = () => {
  const { user, favIds, setFavId } = useContext(Context);
  const readData = () => {
    const thisRef = ref(db, "users/" + user.uid);
    onValue(thisRef, (snapshot) => {
      const data = snapshot.val();
      try {
        setFavId(JSON.parse(data.favs));
      } catch (error) {
        setFavId([]);
      }
    });
  };

  useLayoutEffect(readData, []);
  const createList = () => {
    let favMeals = new Array(0);
    for (let i = 0; i < favIds.length; i++) {
      favMeals = [...favMeals, allMeals.find((meal) => meal.id == favIds[i])];
    }
    return favMeals;
  };
  if (createList().length == 0) {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: color.yellow,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginTop: 30 }}>
          You don't have any favourite meals yet.
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: color.yellow,
      }}
    >
      <Text></Text>
      <FlatList
        data={createList()}
        renderItem={({ item }) => <Meals {...item} />}
        keyExtractor={(item: any) => item.name}
        numColumns={1}
      />
    </View>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
