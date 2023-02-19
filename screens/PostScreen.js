import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { fileApi } from "../api/fileApi";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { Ionicons } from "@expo/vector-icons";
import CommentArea from "../components/Comments/CommentArea";
import { updatePostAction } from "../redux/actions/postActions";

const defaultAvatar = require("../assets/user.png");

const PostDetailHeader = memo(({ post, goHome }) => {
  return (
    <View style={styles.detailHeader}>
      <TouchableOpacity onPress={goHome}>
        <Ionicons name="chevron-back" size={24} color={"black"} />
      </TouchableOpacity>

      <Image
        source={
          post.author.avatar != null
            ? { uri: fileApi({ filename: post.author.avatar.fileName }) }
            : defaultAvatar
        }
        style={styles.userAvatar}
      />

      <Text style={styles.username}> {post?.author.username}</Text>
    </View>
  );
});

const PostDetailScreen = ({ navigation, route }) => {
  const token = useSelector((store) => store?.token);
  const dispatch = useDispatch();
  const post = route.params.post;
  const comments = route.params.comments.data.reverse();
  const updatePost = post;

  const handleUpdateForPost = (updateInfo) => {
    const fakeInfo = { ...updatePost, ...updateInfo };
    updatePost.isLike = fakeInfo.isLike;
    updatePost.countComments = fakeInfo.countComments;
    updatePost.like = fakeInfo.like;
  };

  const goHome = () => {
    // navigation.goBack();
    const routes = navigation.getState()?.routes;
    const pvRoute = routes[routes.length - 2].name;
    navigation.navigate(pvRoute, {
      index: route.params.index,
    });
    dispatch(
      updatePostAction({
        post: updatePost,
        index: route.params.index,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PostDetailHeader post={post} goHome={goHome} />
      <CommentArea
        commentData={comments}
        token={token}
        post={post}
        handleUpdatePost={handleUpdateForPost}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailHeader: {
    flexDirection: "row",
    marginTop:10,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: "#166ada",
    borderWidth: 2.5,
    marginRight: 10,
  },
  username: {
    fontSize: 24,
    fontWeight:'bold',
  },
  postDetail: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  commentArea: {
    marginTop: 10,
    marginBottom: 30,
  },
  postLikes: {
    paddingTop: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  commentInput: {
    marginLeft: 10,
    borderColor: "black",
    height: 40,
    borderWidth: 1,
    width: "80%",
    paddingLeft: 10,
    borderRadius: 30,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 15,
    backgroundColor:'#ffffff'
  },
  commentFooter: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
  },
});

export default PostDetailScreen;
