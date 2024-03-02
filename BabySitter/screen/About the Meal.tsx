import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { allMeals, color } from "../src/Data";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigate from "../src/Header";
import Fav from "../src/Fav";

const TextBox = (props: any) => {
  return (
    <View style={[styles.textBox, { borderRadius: 10, width: "93%" }]}>
      <Text style={{ fontSize: 20, lineHeight: 25, textAlign: props.align }}>
        {props.item}
      </Text>
    </View>
  );
};

const About = ({ route }: any) => {
  const thisMeal = allMeals.find((meal) => meal.id == route.params.paramKey);
  const navigation = useNavigation<any>();
  useEffect(() => {
    navigation.setOptions({
      title: thisMeal?.name,
      headerStyle: {
        backgroundColor: "green",
      },
      headerTintColor: "yellow",
      headerTitleStyle: {
        fontSize: 25,
      },
      headerLeft: HeaderNavigate,
      headerRight: () => <Fav id={thisMeal?.id} />,
    });
  });

  return (
    <View
      style={{
        backgroundColor: color.lightGreen,
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView>
        <View style={[styles.container]}>
          <Image
            source={thisMeal?.img}
            style={{ width: "90%", height: 200, marginVertical: 12 }}
          />
          <Text style={{ fontSize: 40, fontWeight: "bold", paddingBottom: 4 }}>
            {thisMeal?.name}
          </Text>
          <TextBox item={thisMeal?.dif} />
          <TextBox item={thisMeal?.time} />
          <TextBox item={thisMeal?.price} />
          <Text style={{ fontSize: 40, fontWeight: "bold", paddingTop: 4 }}>
            Recipe
          </Text>
          <Text style={{ fontSize: 25, paddingBottom: 4 }}>Ingredients</Text>
          {thisMeal?.ingredients.map((item, index) => {
            return <TextBox key={index} item={item} />;
          })}
          <Text style={{ fontSize: 30, paddingVertical: 8 }}>How To Make</Text>
          {thisMeal?.recipe.map((item, index) => {
            return <TextBox key={index} item={item} align={"center"} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  textBox: {
    backgroundColor: color.lightBlue,

    paddingVertical: 3,
    paddingHorizontal: 6,

    marginVertical: 4,
    marginHorizontal: 8,
  },
});
