import React, { useState } from "react";
import { ScrollView, Modal, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Home/Header";
import NavbarTab from "../components/Home/NavbarTab";
import Post from "../components/Home/Post";
import PostOption from "../components/Home/PostOption";
import AddStatus from "../components/Status/AddStatus.js";
import { useSelector } from "react-redux";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const posts = useSelector((store) => store?.posts);
  const CreatePost = () => {
    return <PostOption navigation={navigation} />;
  };

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
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
