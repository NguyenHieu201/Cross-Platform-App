import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Messages = ({ rooms, navigation }) => {
  const ChatRoom = ({ room }) => {
    const imageSource =
      room?.friend?.avatar != null ? {} : require("../../assets/user.png");
    const username = room?.friend?.username;
    const latestMessage = room?.lastMessage?.content;
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

  return (
    <View>
      <Text style={styles.messageText}>Messages</Text>

      <FlatList
        data={rooms}
        id={(item) => {
          return item.index;
        }}
        renderItem={(item) => {
          return <ChatRoom room={item.item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  messageText: {
    fontSize: 20,
    fontWeight: "900",
    paddingLeft: 10,
    paddingVertical: 10,
    borderBottomColor: "#D8DADF",
    borderBottomWidth: 1,
  },
});

export default Messages;
