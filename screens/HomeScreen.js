import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, Modal, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Home/Header";
import NavbarTab from "../components/Home/NavbarTab";
import Post from "../components/Home/Post";
import PostOption from "../components/Home/PostOption";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { updatePostAction } from "../redux/actions/postActions";

const HomeHeader = memo(({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Header navigation={navigation} />
      <NavbarTab navigation={navigation} />
    </View>
  );
});

const HomeScreen = ({ navigation, route }) => {
  const posts = useSelector((store) => store?.posts);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#f7f7f7", marginBottom: 60, height: "100%" }}
    >
      <HomeHeader navigation={navigation} />

      <FlatList
        data={posts}
        renderItem={(item) => {
          return (
            <Post
              navigation={navigation}
              index={item.index}
              route={route}
              postData={item.item}
            />
          );
        }}
        key={(item) => item.index}
        nestedScrollEnabled={true}
        ListHeaderComponent={<PostOption navigation={navigation} />}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
