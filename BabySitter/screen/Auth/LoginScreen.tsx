import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { color, screenHeight, screenWidth, storeData } from "../../src/Data";
import { auth } from "../../FireBase/firebase";
import React, { useContext, useEffect, useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { capitalize } from "./SignUp";
import { Entypo } from "@expo/vector-icons";
import { Context } from "../../src/Context/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyButton from "../../src/Button";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const { setVerify } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={[styles.container]}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          source={require("../../assets/Logo/Logo.png")}
          style={{ width: 165, height: 125, marginBottom: 48 }}
        />

        <MyButton
          thisbackgroundColor={color.lightGrey}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoComplete="email"
        />
        <View
          style={[styles.form, { alignItems: "center", flexDirection: "row" }]}
        >
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!viewPass}
            style={{ width: "90%" }}
          />
          <TouchableOpacity
            onPress={() => {
              let newViewPass = !viewPass;
              setViewPass(newViewPass);
            }}
          >
            <Entypo
              name={viewPass ? "eye" : "eye-with-line"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: 330,
            marginTop: 8,
            marginBottom: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              let newViewPass = !isChecked;
              setChecked(newViewPass);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color="black"
            />
            <Text style={{ fontSize: 12, paddingLeft: 4 }}>
              Ghi nhớ đăng nhập
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              sendPasswordResetEmail(auth, email)
                .then(() =>
                  Alert.alert(
                    "A email has been sent to " +
                      email +
                      " to reset your password"
                  )
                )
                .catch((error) => {
                  if (!email) Alert.alert("You haven't entered an email");
                  else {
                    let warning = error.code
                      .replace("auth/", "")
                      .replaceAll("-", " ");
                    Alert.alert(capitalize(warning));
                  }
                })
            }
          >
            <Text
              style={{
                color: color.blue,

                fontSize: 12,
              }}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.form, { backgroundColor: color.cyan }]}
          onPress={() => {
            const curUser = auth.currentUser;
            curUser?.reload();
            signInWithEmailAndPassword(auth, email.toLowerCase(), password)
              .then(async (userCredential) => {
                const curUser = auth.currentUser;
                if (curUser) {
                  if (curUser.emailVerified) {
                    setVerify(true);
                    await storeData(userCredential.user);
                  } else Alert.alert("Email has not been verified");
                }

                const user = userCredential.user;
              })
              .catch((error) => {
                if (!email) Alert.alert("You haven't entered an email");
                else if (!password)
                  Alert.alert("You haven't entered an password");
                else {
                  let warning = error.code
                    .replace("auth/", "")
                    .replaceAll("-", " ");
                  Alert.alert(capitalize(warning));
                }
              });
          }}
        >
          <Text
            style={{
              color: "white",
              lineHeight: 40,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 100 }}>
          <Text style={{ fontSize: 15, paddingLeft: 4 }}>
            Bạn chưa có tài khoản?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                color: color.blue,
                paddingLeft: 6,
                fontSize: 15,
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  font: {
    fontSize: 20,
    marginVertical: 5,
  },
  form: {
    borderRadius: 8,
    backgroundColor: color.lightGrey,
    height: 40,
    width: 330,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
});
