import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Friends from "../components/Friends/Friends";
import Header from "../components/Home/Header";
import NavbarTab from "../components/Home/NavbarTab";
import { getListFriendAPI, getListInviteAPI } from "../api/firendApi";

const FriendScreen = ({ navigation, route }) => {
  const [friendInvite, setInvite] = useState([]);
  const token = useSelector((store) => store?.token);

  useEffect(() => {
    getListInviteAPI({ token: token }).then((res) => {
      if (res.isSuccess) {
        setInvite(res.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <NavbarTab navigation={navigation} />
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <Friends
          inviteFriends={friendInvite}
          navigation={navigation}
          route={route}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendScreen;
