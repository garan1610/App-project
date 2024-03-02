import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Category from "./src/Category";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Home from "./screen/Home";
import DetailsScreen from "./screen/Details";
import About from "./screen/About the Meal";
import { color } from "./src/Data";
import { Header } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeaderNavigate from "./src/Header";
import Fav from "./src/Fav";
import { Context } from "./src/Context/Context";
import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import DrawerNav from "./screen/DrawerNav";
import Main from "./screen/Main";
import LoginScreen from "./screen/Auth/LoginScreen";
import SignUp from "./screen/Auth/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase/firebase";
import BottomNav from "./screen/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionScreen from "./screen/Auth/OptionScreen";
import CreatAccount from "./screen/Auth/CreatAccount";
import CreateAccount from "./screen/Auth/CreatAccount";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Option">
      <Stack.Screen
        name="Option"
        component={OptionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerShadowVisible: false,
          headerTitle: "Thiết lập tài khoản",
          headerStyle: {},
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 18,
          },

          headerLeft: HeaderNavigate,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "yellow",
          headerTitleStyle: {
            fontSize: 25,
          },
          headerLeft: HeaderNavigate,
        }}
      />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const { user, setUser, verified, setVerify } = useContext(Context);
  const [hasLogin, setHasLogin] = useState(false);

  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("myKey");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };

  useLayoutEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser: any) => {
      let value = await getMyObject();
      if (value && !hasLogin) {
        setUser(value);
        setVerify(true);
        setHasLogin(true);
      } else setUser(authUser ? authUser : null);
    });
    return () => unsub();
  }, [user]);
  return (
    <NavigationContainer>
      {user && verified ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  const [context, setContext] = useState([]);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Context.Provider
      value={{
        favIds: context,
        setFavId: setContext,
        user: user,
        setUser: setUser,
        username: username,
        setUsername: setUsername,
        verified: verified,
        setVerify: setVerified,
        age: age,
        setAge: setAge,
        location: location,
        setLocation: setLocation,
      }}
    >
      <RootNavigator />
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  custom: {
    marginBottom: 4,
  },
});
