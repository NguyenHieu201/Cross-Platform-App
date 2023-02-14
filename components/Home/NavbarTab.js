import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const NavbarTab = ({ navigation }) => {
  return (
    <View style={{ marginTop: 15, marginBottom: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomColor: "#05050538",
          borderBottomWidth: 1,
        }}
      >
        {/* Home */}
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("../../assets/home.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        {/* Friends */}
        <TouchableOpacity onPress={() => navigation.navigate("FriendScreen")}>
          <Image
            source={require("../../assets/friends.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        {/* Messages */}
        <TouchableOpacity onPress={() => navigation.navigate("MessagesScreen")}>
          <Image
            source={require("../../assets/messenger.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        {/* Notifications */}
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationsScreen")}
        >
          <Image
            source={require("../../assets/bell.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarTab;
