import React, { memo, useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { acceptInviteAPI, denyInvite, removeInvite } from "../../api/firendApi";
import { fileApi } from "../../api/fileApi";

const Friend = ({ friend, navigation, token, route }) => {
  const [accept, setAccept] = useState("Normal");

  useEffect(() => {
    if (route.params?.userId) {
      const status = route.params.status;
      switch (status) {
        case "Delete Friend":
          setAccept("Accept");
          break;
        case "Send Invite":
          setAccept("Remove");
          break;
        default:
          setAccept("Normal");
          break;
      }
    }
  }, [route.params]);

  const imageSource =
    friend?.avatar != null
      ? { uri: fileApi({ filename: friend.avatar.fileName }) }
      : require("../../assets/user.png");
  const handleAcceptFriend = async () => {
    console.log("Confirm invite");
    const data = {
      token: token,
      userId: friend?._id,
    };
    await acceptInviteAPI(data).then((res) => {
      if (res.isSuccess) {
        setAccept("Accept");
      }
    });
  };

  const handleRemoveInvite = async () => {
    console.log("Remove invite");
    const data = {
      token: token,
      userId: friend?._id,
    };
    await removeInvite(data).then((res) => {
      if (res.isSuccess) {
        setAccept("Remove");
      }
    });
  };
  const UserImage = () => {
    return <Image source={imageSource} style={styles.avatar} />;
  };

  const AcceptArea = ({ selection }) => {
    switch (selection) {
      case "Accept":
        return (
          <View>
            <Text style={{ padding: 10, fontSize: 24 }}>Accepted</Text>
          </View>
        );
      case "Remove":
        return (
          <View>
            <Text style={{ padding: 10, fontSize: 24 }}>Removed</Text>
          </View>
        );
      default:
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
              }}
            >
              <View>
                <TouchableOpacity onPress={handleAcceptFriend}>
                  <Text style={styles.confirmBtn}>Confirm</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={handleRemoveInvite}>
                  <Text style={styles.deleteBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };

  const showUserDetail = () => {
    navigation.navigate("UserDetailScreen", {
      user: friend,
    });
  };

  return (
    <View style={styles.inviteContainer}>
      <View style={styles.avatarContainer}>
        <UserImage />
      </View>
      {/* Right */}
      <View
        style={{
          flexDirection: "column",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <View>
            <TouchableOpacity onPress={showUserDetail}>
              <Text style={{ fontSize: 24 }}>{friend.username}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AcceptArea selection={accept} />
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

export default memo(Friend, (props, nextProps) => {
  if (nextProps.route.params?.userId === props.friend._id) {
    return false;
  }
  return true;
});
