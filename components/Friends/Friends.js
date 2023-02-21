import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { acceptInviteAPI, denyInvite, removeInvite } from "../../api/firendApi";
import Friend from "./Friend";

const Friends = ({ inviteFriends, navigation, route }) => {
  const token = useSelector((store) => store?.token);
  const showAllFriendScreen = () => {
    navigation.navigate("ShowAllFriendsScreen");
  };

  return (
    <View>
      <TouchableOpacity onPress={showAllFriendScreen}>
        <Text
          style={{
            borderWidth: 1,
            borderRadius: 15,
            fontSize: 16,
            padding: 5,
            width: 100,
            textAlign: "center",
            fontWeight: "900",
          }}
        >
          Friends
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.textFriend}>Invitation</Text>
      </View>

      <View>
        <FlatList
          data={inviteFriends}
          key={(item) => {
            return item?.index;
          }}
          renderItem={(item) => {
            return (
              <Friend
                friend={item.item}
                navigation={navigation}
                token={token}
                route={route}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
    paddingTop: 5,
  },
  textFriend: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "900",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  inviteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    paddingVertical: 5,
    paddingLeft: 10,
  },
  confirmBtn: {
    backgroundColor: "#1A6ED8",
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: "#fff",
    borderRadius: 8,
    fontSize: 15,
  },
  deleteBtn: {
    backgroundColor: "#D8DADF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: "#000",
    borderRadius: 8,
    fontSize: 15,
  },
});

export default Friends;
