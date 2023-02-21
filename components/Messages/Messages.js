import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ChatRoom from "./ChatRoom";

const Messages = ({ rooms, navigation, route }) => {
  return (
    <View>
      <Text style={styles.messageText}>Messages</Text>

      <FlatList
        data={rooms}
        key={({ index, item }) => {
          return index;
        }}
        renderItem={(item) => {
          return (
            <ChatRoom
              roomData={item.item}
              navigation={navigation}
              route={route}
            />
          );
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
