import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
let size = 150;
export interface CategoryProps extends TouchableOpacityProps {
  name: any;
  color: any;
}

const Category = (props: CategoryProps) => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", {
            paramKey: props.name,
          });
        }}
        style={{
          height: size,
          backgroundColor: props.color,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          margin: 15,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            width: 150,
            paddingHorizontal: 10,
            textAlign: "center",
          }}
        >
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
