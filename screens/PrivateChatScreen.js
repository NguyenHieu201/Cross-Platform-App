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
import React, { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { getAllChatWithFriendId } from "../api/chatApi";
import { useSelector } from "react-redux";
import { fileApi } from "../api/fileApi";
import { io } from "socket.io-client";
// import socket from "../utils/socket";

const Header = ({ friend, goBack }) => {
  const imageSource =
    friend?.avatar != null
      ? { uri: fileApi({ filename: friend.avatar.fileName }) }
      : require("../assets/user.png");
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="chevron-back" size={24} color={"#3b5998"} />
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Image source={imageSource} style={styles.friendAvatar} />
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {friend.username}
        </Text>
      </View>
    </View>
  );
};

const SingleMessage = React.memo(({ message, isFriend, avatar }) => {
  return (
    <View
      style={{
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {!isFriend && <Text style={{ flex: 1 }}></Text>}
      {isFriend && <UserAvatar userImage={avatar} />}
      <Text
        style={{
          fontSize: 18,
          borderRadius: 15,
          padding: 10,
          maxWidth: "50%",
          backgroundColor: isFriend ? "#DCDCDC" : "#1E90FF",
          color: isFriend ? "#black" : "white",
        }}
      >
        {message.content}
      </Text>
    </View>
  );
});

const InputMessage = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <TextInput
      style={styles.chat_input}
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

const UserAvatar = ({ userImage }) => {
  const imageSource =
    userImage !== null
      ? { uri: fileApi({ filename: userImage.fileName }) }
      : require("../assets/user.png");
  return (
    <Image
      source={imageSource}
      style={{
        height: 25,
        width: 25,
      }}
    />
  );
};

const PrivateChatScreen = ({ navigation, route }) => {
  const [chats, setChats] = useState([]);
  const room = route.params.room;
  const friendId = room?.friend._id;
  const token = useSelector((store) => store?.token);
  const socket = useSelector((store) => store?.socket);

  // console.log(room.chatId);

  useEffect(() => {
    socket.on("message", (msg) => {
      setChats((previousChats) => [msg, ...previousChats]);
    });
  }, []);

  useLayoutEffect(() => {
    getAllChatWithFriendId({
      token: token,
      friendId: friendId,
    }).then((res) => {
      if (res.isSuccess) {
        setChats(res.data.reverse());
      } else {
        console.log("Fetch chat for room error");
      }
    });
  }, []);

  const goBack = () => {
    const routes = navigation.getState()?.routes;
    const pvRoute = routes[routes.length - 2].name;
    if (pvRoute == "MessagesScreen") {
      navigation.navigate(pvRoute, {
        roomId: room.chatId,
        latestMessage: chats[0],
      });
    } else {
      navigation.navigate(pvRoute);
    }
  };

  const handleSendMessage = ({ message }) => {
    socket.emit("chatmessage", {
      token: token,
      receiverId: friendId,
      content: message,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header friend={room.friend} goBack={goBack} />

      <View style={{ flex: 1 }}>
        <FlatList
          inverted={true}
          maxToRenderPerBatch={20}
          data={chats}
          key={(item) => {
            item.index;
          }}
          renderItem={(item) => {
            return (
              <SingleMessage
                message={item.item}
                isFriend={item.item.senderId == friendId}
                index={item.index}
                avatar={room.friend.avatar}
              />
            );
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
    backgroundColor: "#F5F5F5",
    borderColor: "gray",
    borderBottomWidth: 0.5,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    radius: 15,
    marginRight: 10,
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
    height: 50,
    fontSize: 25,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  chat_input: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 10,
  },
});

export default PrivateChatScreen;
