import { StyleSheet, TouchableOpacity } from "react-native";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, db, firestore } from "../FireBase/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { onValue, ref } from "firebase/database";
import { Context } from "../src/Context/Context";
const colectionRef = collection(firestore, "chats");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [ava, setAva] = useState(
    "file:///var/mobile/Containers/Data/Application/B2442E2D-B62A-4013-B213-C3E9070CEFBE/Library/Caches/ExponentExperienceData/%2540anonymous%252FNewApp-4e36751f-10e2-476e-805c-71249f14a816/ImagePicker/D00A5008-F360-47C8-806C-6AE49F200CE7.jpg"
  );
  const { user } = useContext(Context);
  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

    const thisRef = ref(db, "users/" + user.uid);
    onValue(thisRef, (snapshot) => {
      const data = snapshot.val();
      if (data.profilePic) {
        setAva(data.profilePic);
      } else {
        setAva(
          "file:///var/mobile/Containers/Data/Application/B2442E2D-B62A-4013-B213-C3E9070CEFBE/Library/Caches/ExponentExperienceData/%2540anonymous%252FNewApp-4e36751f-10e2-476e-805c-71249f14a816/ImagePicker/D00A5008-F360-47C8-806C-6AE49F200CE7.jpg"
        );
      }
    });

    const q = query(colectionRef, orderBy("createAt", "desc"));
    const unsubcribe = onSnapshot(q, (snapshot: any) => {
      setMessages(
        snapshot.docs.map((item: any) => {
          return {
            _id: item.id,
            createAt: item.data().createAt,
            text: item.data().text,
            user: item.data().user,
          };
        })
      );
      return () => unsubcribe();
    });
  }, [navigation, auth]);
  const onSend = useCallback<any>(async (messages = []) => {
    try {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      // console.log(messages);

      const { _id, text, user } = messages[0];
      await addDoc(colectionRef, {
        _id,
        createAt: Date.now(),
        text,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email as string,
        avatar: ava,
      }}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
