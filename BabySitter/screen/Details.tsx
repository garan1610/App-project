import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { color, mealList } from "../src/Data";
import Meals from "../src/Meals";

const DetailsScreen = ({ route }: any) => {
  const thisItem = mealList.find((item) => item.name == route.params.paramKey);
  const navigation = useNavigation<any>();
  useEffect(() => {
    navigation.setOptions({
      title: thisItem?.name,
    });
  });
  return (
    <View
      style={{
        backgroundColor: color.lightGreen,
        height: "100%",
      }}
    >
      <FlatList
        data={thisItem?.items}
        renderItem={({ item }) => <Meals {...item} />}
        keyExtractor={(item: any) => item.name}
        numColumns={1}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
