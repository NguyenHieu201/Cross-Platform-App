import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { showMeAPI, showUserAPI } from "../../api/userApi";
import { fileApi } from "../../api/fileApi";

const PostOption = ({ navigation }) => {
  const token = useSelector((store) => store?.token);
  const avatar = useSelector((store) => store?.avatar);
  const showUserDetail = async () => {
    await showMeAPI({ token: token }).then((res) => {
      if (res.isSuccess) {
        const user = res.data;
        console.log(user);
        navigation.navigate("MeScreen", {
          user: user,
        });
      } else {
        console.log("Fetch me failed");
      }
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
              source={
                avatar != null
                  ? { uri: fileApi({ filename: avatar.fileName }) }
                  : defaultAvatar
              }
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
