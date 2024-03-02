import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState, useLayoutEffect } from "react";
import { color } from "../src/Data";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../FireBase/firebase";
import { Context } from "../src/Context/Context";
import { FontAwesome } from "@expo/vector-icons";

import { onValue, ref, set, update } from "firebase/database";
import { db } from "../FireBase/firebase";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const img = "../assets/Profile/banana.jpg";
const Profile = () => {
  const { username, setUsername, setVerify } = useContext(Context);
  const { user, setUser } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [about, setAbout] = useState("");
  const [img, setImg] = useState<any>("");

  const [image, setImage] = useState<any>(null);

  const readData = () => {
    const thisRef = ref(db, "users/" + user.uid);
    onValue(thisRef, (snapshot) => {
      const data = snapshot.val();
      setUsername(data.username);
      setAbout(data.about);
      if (data.profilePic) {
        setImage(data.profilePic);
      } else setImage(null);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      update(ref(db, "users/" + user.uid), {
        profilePic: result.assets[0].uri,
      })
        .then()
        .catch();
    }
  };

  useLayoutEffect(readData, []);
  return (
    <ScrollView>
      <View
        style={{ width: "100%", height: 150, backgroundColor: color.orange }}
      ></View>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              borderWidth: 0.1,
              marginTop: -52,
              marginLeft: 20,
            }}
          />
        ) : (
          <Image
            source={require("../assets/Profile/user2.png")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              borderWidth: 8,
              marginTop: -52,
              marginLeft: 20,
            }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          marginVertical: 2,
          marginLeft: 16,
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        {username}
      </Text>
      <Text style={{ marginLeft: 16, paddingBottom: 6 }}>{user.email}</Text>

      <Text style={{ fontWeight: "100", alignSelf: "center" }}>
        ________________________________________________
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            paddingLeft: 16,
            fontSize: 18,
            fontWeight: "600",
            paddingVertical: 4,
          }}
        >
          About Me
        </Text>
        <TouchableOpacity
          onPress={() => {
            setEdit(true);
          }}
        >
          <FontAwesome
            name="pencil"
            size={20}
            color="black"
            style={{ padding: 8 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={{ paddingHorizontal: 4, paddingVertical: 4 }}
          editable={edit}
          onEndEditing={() => {
            update(ref(db, "users/" + user.uid), {
              about: about,
            })
              .then()
              .catch();
            setEdit(false);
          }}
          onChangeText={(text) => setAbout(text)}
          placeholder="Write something about yourself"
        >
          {about}
        </TextInput>
      </View>
      <Text style={{ fontWeight: "100", alignSelf: "center" }}>
        ________________________________________________
      </Text>
      <TouchableOpacity
        onPress={async () => {
          const useremail = user.email;
          await AsyncStorage.removeItem("myKey");
          signOut(auth);
          setVerify(false);
        }}
        style={[styles.form, { backgroundColor: color.grey, marginTop: 15 }]}
      >
        <Text
          style={{
            color: "#f8552c",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: 38,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  form: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",

    width: "90%",
    marginLeft: "5%",
    paddingHorizontal: 15,
    marginVertical: 4,
  },
});
