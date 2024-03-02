import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React from "react";
import MyButton from "./Button";
import { color } from "./Data";

interface ThisButton extends TextInputProps {
  text: any;
}
const AnotherButton = (props: ThisButton) => {
  return (
    <View style={{ marginVertical: 6 }}>
      <Text style={{ color: color.darkGrey, marginLeft: 2, marginBottom: -4 }}>
        {props.text}
      </Text>
      <MyButton {...props} thisbackgroundColor="white" />
    </View>
  );
};

export default AnotherButton;

const styles = StyleSheet.create({});
