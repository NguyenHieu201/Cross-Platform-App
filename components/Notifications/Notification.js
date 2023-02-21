import React, { useLayoutEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useSelector } from "react-redux";
import { getListNotification } from "../../api/notificationApi";
import { fileApi } from "../../api/fileApi";
import { USERS } from "../../Data/Users";

const Notification = () => {
  const token = useSelector((store) => store?.token);
  const [notifications, setNotification] = useState([]);

  useLayoutEffect(() => {
    getListNotification({ token: token }).then((res) => {
      if (res.isSuccess) {
        setNotification(res.data);
      }
    });
  }, []);

  return (
    <View>
      <View style={{ marginHorizontal: 10, marginVertical: 10, paddingTop: 7 }}>
        {notifications.map((post, index) => (
          <View
            key={index}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D8DADF",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={
                post.source.avatar !== null
                  ? { uri: fileApi({ filename: post.source.avatar.fileName }) }
                  : require("../../assets/user.png")
              }
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginVertical: 10,
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "bold" }}
                  lineBreakMode={true}
                >
                  {"  "}
                  {post.source.username}
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {"  "}
                  {post.described}
                </Text>
              </View>
              {/* <Text> {post.time}</Text> */}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Notification;
