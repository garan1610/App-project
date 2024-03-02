import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const HeaderNavigate = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: 5,
      }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back" size={26} color="black" />
    </TouchableOpacity>
  );
};

export default HeaderNavigate;

const styles = StyleSheet.create({});
