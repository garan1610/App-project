import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as Picker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { color } from "./Data";

const ImagePicker = () => {
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,

              marginVertical: 30,
            }}
          />
        ) : (
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              backgroundColor: color.lightGrey,
              marginVertical: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="camera" size={24} color="black" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({});
