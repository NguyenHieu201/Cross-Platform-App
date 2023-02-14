import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const PostOption = ({ navigation }) => {
  const showUserDetail = () => {
    navigation.navigate("UserDetailScreen", {
      user: null,
    });
  };
  const postTapAction = () => {
    navigation.navigate("PostScreen");
  };
  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View>
          <TouchableOpacity onPress={showUserDetail}>
            <Image
              source={require("../../assets/user.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity onPress={postTapAction}>
            <Image
              source={require("../../assets/placeholder.jpg")}
              style={{
                width: 300,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              source={require("../../assets/photo.jpg")}
              style={{
                height: 50,
                width: 50,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostOption;
