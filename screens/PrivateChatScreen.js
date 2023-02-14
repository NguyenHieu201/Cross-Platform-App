import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { getAllChatWithFriendId } from "../api/chatApi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import socket from "../utils/socket";

const Header = ({ navigation, friend }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const imageSource =
    friend?.avatar != null ? {} : require("../assets/user.png");
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="chevron-back" size={24} color={"#3b5998"} />
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Image source={imageSource} style={styles.friendAvatar} />
        <Text
          style={{
            fontSize: 24,
            marginLeft: 10,
          }}
        >
          {friend.username}
        </Text>
      </View>
    </View>
  );
};

const SingleMessage = ({ message }) => {
  return (
    <View>
      <Text>{message.content}</Text>
    </View>
  );
};

const InputMessage = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <TextInput
      placeholder="Input your chat ..."
      onSubmitEditing={() => {
        handleSendMessage({ message: message });
        setMessage("");
      }}
      value={message}
      onChangeText={(text) => setMessage(text)}
    />
  );
};

const UserAvatar = ({ userImage }) => {};

const PrivateChatScreen = ({ navigation, route }) => {
  const [chats, setChats] = useState([]);
  const room = route.params.room;
  const friendId = room?.friend._id;
  const token = useSelector((store) => store?.token);
  const socket = io("http://192.168.1.23:3000", {
    extraHeaders: { token: `${token}` },
  });

  useEffect(() => {
    socket.on("message", (msg) => {
      setChats([...chats, msg]);
    });
  }, []);

  const handleSendMessage = ({ message }) => {
    socket.emit("chatmessage", {
      token: token,
      receiverId: friendId,
      content: message,
    });
  };

  useLayoutEffect(() => {
    getAllChatWithFriendId({
      token: token,
      friendId: friendId,
    }).then((res) => {
      if (res.isSuccess) {
        setChats(res.data);
      } else {
        console.log("Fetch chat for room error");
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} friend={room.friend} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={chats}
          key={(item) => {
            item.index;
          }}
          renderItem={(item) => {
            return <SingleMessage message={item.item} />;
          }}
        />
      </View>

      <View style={styles.inputChat}>
        <InputMessage handleSendMessage={handleSendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderWidth: 1,
    radius: 15,
  },
  container: {
    height: "100%",
  },
  chatArea: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
  },
  inputChat: {
    height: 30,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default PrivateChatScreen;
