import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { color } from "./Data";

export interface ButtonDefaultProps extends TextInputProps {
  thisbackgroundColor: any;
}

const MyButton = (props: ButtonDefaultProps) => {
  return (
    <View>
      <TextInput
        style={[
          styles.form,
          {
            backgroundColor: props.thisbackgroundColor,
          },
        ]}
        {...props}
      />
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  form: {
    borderRadius: 8,
    height: 40,
    width: 330,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: color.grey,
  },
});
