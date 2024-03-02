import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { color } from "../../src/Data";
import { useNavigation } from "@react-navigation/native";
const OptionScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <ImageBackground
      source={require("../../assets/Options.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={1.5}
    >
      <SafeAreaView style={{ height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 580,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={[
              styles.box,
              {
                backgroundColor: color.cyan,
                marginLeft: 16,
              },
            ]}
          >
            <Text style={[styles.text, { color: "white" }]}>
              Tìm người trông trẻ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.box,
              {
                marginRight: 16,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={[styles.text, { color: color.cyan }]}>
              Tôi là người trông trẻ
            </Text>
            <Entypo name="chevron-right" size={24} color={color.cyan} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OptionScreen;

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    width: 168,
    height: 41,
  },
  text: {
    textAlign: "center",
    lineHeight: 41,
  },
});
