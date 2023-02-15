import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Modal, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Home/Header";
import NavbarTab from "../components/Home/NavbarTab";
import Post from "../components/Home/Post";
import PostOption from "../components/Home/PostOption";
import { useSelector } from "react-redux";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { showPostAPI } from "../api/userApi";

const HomeScreen = ({ navigation }) => {
  const token = useSelector((store) => store?.token);
  const [posts, setPosts] = useState([]);
  const CreatePost = () => {
    return <PostOption navigation={navigation} />;
  };

  useLayoutEffect(() => {
    showPostAPI({ token: token }).then((res) => {
      if (res.isSuccess) {
        setPosts(res.posts);
      }
    });
  });

  return (
    <SafeAreaView
      style={{ backgroundColor: "#f7f7f7", marginBottom: 60, height: "100%" }}
    >
      <View style={{ backgroundColor: "#fff" }}>
        <Header />
        <NavbarTab navigation={navigation} />
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <PostOption navigation={navigation} />
        <View>
          {posts.map((post, index) => (
            <Post postData={post} key={index} navigation={navigation} />
          ))}
        </View>
      </ScrollView> */}
      <FlatList
        data={posts}
        renderItem={(item) => {
          return (
            <Post
              postData={item.item}
              navigation={navigation}
              index={item.index}
            />
          );
        }}
        key={(item) => item.index}
        nestedScrollEnabled={true}
        ListHeaderComponent={CreatePost}
        maxToRenderPerBatch={5}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
