import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getChatApi } from "../api/chatApi";
import NavbarTab from "../components/Home/NavbarTab";
import Messages from "../components/Messages/Messages";

const MessagesScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const token = useSelector((store) => store?.token);

  useEffect(() => {
    getChatApi({ token: token }).then((res) => {
      console.log("Fetch all chat");
      // console.log(res.data);
      if (res.isSuccess) setRooms(res.data);
      else {
        console.log("Fetch chat error");
      }
    });
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <NavbarTab navigation={navigation} />
      <Messages rooms={rooms} navigation={navigation} />
    </SafeAreaView>
  );
};

export default MessagesScreen;
