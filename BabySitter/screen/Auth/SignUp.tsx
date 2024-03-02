import {
  Alert,
  AppState,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { color, screenHeight, screenWidth, storeData } from "../../src/Data";
import { auth, firestore } from "../../FireBase/firebase";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { Context } from "../../src/Context/Context";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { child, push, ref, set } from "firebase/database";
import { db } from "../../FireBase/firebase";
import { reloadAsync } from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colectionRef = collection(firestore, "1");

export function capitalize(s: any) {
  return s[0].toUpperCase() + s.slice(1);
}
const SignUp = () => {
  const { favIds, user, setUser, username, setUsername, verified, setVerify } =
    useContext(Context);
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const [username2, setUsername2] = useState("");

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const signUpHandle = () => {
    if (!username2) Alert.alert("You haven't enter username");
    else {
      if (password != password2) Alert.alert("Password doesn't match");
      else {
        setUsername(username2);
        createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
          .then((userCredential) => {
            setUser(userCredential.user);
            const userId = userCredential.user.uid;
            set(ref(db, "users/" + userId), {
              username: username2,
              email: email,
              about: "",
            })
              .then()
              .catch(() => {
                console.log("Signup error");
              });
            sendEmailVerification(userCredential.user).then(() => {
              Alert.alert("Email verification sent!");
            });
          })
          .catch((error) => {
            if (!email) Alert.alert("You haven't entered an email");
            else if (!password) Alert.alert("You haven't entered an password");
            else {
              let warning = error.code
                .replace("auth/", "")
                .replaceAll("-", " ");
              Alert.alert(capitalize(warning));
            }
          });
      }
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const curUser = auth.currentUser;
        if (curUser) {
          curUser
            .reload()
            .then(async () => {
              if (curUser.emailVerified) {
                await storeData(curUser);
                setVerify(true);
                navigation.navigate("CreateAccount");
              }
            })
            .catch(() => console.log("verify error"));
        }
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          source={require("../../assets/Logo/Logo.png")}
          style={{ width: 165, height: 125, marginBottom: 48, marginTop: 60 }}
        />

        <TextInput
          style={styles.form}
          placeholder="Họ và tên"
          value={username2}
          onChangeText={(text) => setUsername2(text)}
        />

        <TextInput
          style={styles.form}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoComplete="email"
        />

        <View
          style={[styles.form, { alignItems: "center", flexDirection: "row" }]}
        >
          <TextInput
            placeholder="Mật khẩu"
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

        <TextInput
          style={[styles.form]}
          placeholder="Nhập lại mật khẩu"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.form, { backgroundColor: color.cyan }]}
          onPress={signUpHandle}
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
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 100 }}>
        <Text style={{ fontSize: 15, paddingLeft: 4 }}>
          Bạn đã có tài khoản?
        </Text>

        <TouchableOpacity
          onPress={() => {
            const curUser = auth.currentUser;
            if (curUser) {
              if (curUser.emailVerified) {
                curUser
                  .reload()
                  .then(async () => {
                    if (curUser.emailVerified) {
                      await storeData(auth.currentUser);
                      setVerify(true);
                    }
                  })
                  .catch(() => console.log("verify error"));
              } else navigation.navigate("Login");
            } else navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              color: color.blue,
              paddingLeft: 6,
              fontSize: 15,
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          console.log(await AsyncStorage.getAllKeys());
          navigation.navigate("CreateAccount");
        }}
      >
        <Text style={{ fontSize: 30 }}>Buootn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
