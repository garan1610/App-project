import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import ImagePicker from "../../src/ImagePicker";
import MyButton from "../../src/Button";
import { Context } from "../../src/Context/Context";
import AnotherButton from "../../src/AnotherButton";
import { color } from "../../src/Data";
import DropDownPicker from "react-native-dropdown-picker";

const CreateAccount = () => {
  const { username, setUsername, age, setAge, location, setLocation } =
    useContext(Context);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
      }}
    >
      <ImagePicker />
      <AnotherButton
        text="Họ tên *"
        placeholder="Nhập họ tên"
        value={username}
        setText={setUsername}
      />
      <AnotherButton
        text="Tuổi *"
        placeholder="Nhập tuổi"
        value={age}
        setText={setAge}
      />

      <View style={{ marginVertical: 6 }}>
        <Text
          style={{ color: color.darkGrey, marginLeft: 2, marginBottom: -4 }}
        >
          Địa chỉ *
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.form}
          textStyle={{
            fontSize: 14,
            color: "#a9a9a9",
          }}
        />
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  form: {
    borderRadius: 8,
    height: 10,
    width: 330,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: color.grey,
  },
});
