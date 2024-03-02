import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CategoryProps } from "./Category";
import { color } from "./Data";
import { useNavigation } from "@react-navigation/native";

interface MealsProps extends CategoryProps, TouchableOpacityProps {
  time: any;
  dif: any;
  price: any;
  img: any;
  id: any;
  ingredients: any;
  recipe: any;
}

const Meals = (props: MealsProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("About", {
          paramKey: props.id,
        });
      }}
      style={{
        borderRadius: 20,
        backgroundColor: color.white,
        height: 200,
        width: "90%",
        alignItems: "center",
        marginVertical: 16,
        marginLeft: "5%",
      }}
    >
      <Image
        source={props.img}
        style={{ width: "80%", height: "60%", marginTop: 12 }}
      />
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>{props.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Text style={styles.Text}>{props.time}</Text>
        <Text style={styles.Text}>{props.dif}</Text>
        <Text style={styles.Text}>{props.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Meals;

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
  },
});
