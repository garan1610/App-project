import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "./Context/Context";
import { child, onValue, push, ref, set, update } from "firebase/database";
import { db } from "../FireBase/firebase";

const Fav = (props: any) => {
  const { user, favIds, setFavId } = useContext(Context);
  return (
    <TouchableOpacity
      onPress={() => {
        const favRef = ref(db, "users/" + user.uid);
        if (!favIds.includes(props.id)) {
          setFavId([...favIds, props.id]);
          update(favRef, {
            favs: JSON.stringify([...favIds, props.id]),
          })
            .then()
            .catch(() => {
              console.log("faverror");
            });
        } else {
          let newArr = favIds;
          newArr = newArr.filter((item) => item != props.id);
          setFavId(newArr);
          update(favRef, {
            favs: JSON.stringify(newArr),
          })
            .then()
            .catch(() => {
              console.log("faverror");
            });
        }
      }}
    >
      <Entypo
        name={favIds.includes(props.id) ? "star" : "star-outlined"}
        size={30}
        color="orange"
      />
    </TouchableOpacity>
  );
};

export default Fav;

const styles = StyleSheet.create({});
