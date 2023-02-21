import React, { useState, memo, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ChatRoom = ({ roomData, navigation, route }) => {
  const [room, updateChat] = useState(roomData);
  // console.log(room.chatId);
  const imageSource =
    room?.friend?.avatar != null ? {} : require("../../assets/user.png");
  const username = room?.friend?.username;
  const latestMessage = room?.lastMessage?.content;

  useEffect(() => {
    if (route.params?.roomId) {
      updateChat({ ...room, lastMessage: route.params.latestMessage });
    }
  }, [route.params]);

  const navToPrivateChat = () => {
    navigation.navigate("PrivateChatScreen", {
      room: room,
    });
  };
  return (
    <TouchableOpacity onPress={navToPrivateChat}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 20,
        }}
      >
        <Image
          source={imageSource}
          style={{ width: 35, height: 35, borderRadius: 50 }}
        />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 15,
          }}
        >
          <Text style={{ fontWeight: "900", fontSize: 17 }}>{username}</Text>

          <Text style={{ fontWeight: "300", fontSize: 17, color: "black" }}>
            {latestMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ChatRoom, (props, nextProps) => {
  if (nextProps.route.params?.roomId == props.roomData.chatId) {
    return false;
  }
  return true;
});
