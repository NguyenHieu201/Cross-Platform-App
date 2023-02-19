import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import { memo } from "react";
import { fileApi } from "../../api/fileApi";
import CommentFooter from "./CommentFooter";
import PostDetail from "../Post/PostDetail";
import LikeArea from "./LikeArea";
import { useSelector } from "react-redux";

const defaultAvatar = require("../../assets/user.png");

const SingleComment = React.memo((comment) => {
  const avatar = comment.comment.item.user.avatar;
  const imageSource =
    avatar != null
      ? { uri: fileApi({ filename: avatar.fileName }) }
      : defaultAvatar;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 10,
      }}
    >
      <View>
        <Image source={imageSource} style={styles.userAvatar} />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 1,
          flex: 1,
        }}
      >
        <Text>{comment.comment.item.user.username}</Text>
        <Text>{comment.comment.item.content}</Text>
      </View>
    </View>
  );
});

const CommentArea = ({ commentData, token, post, handleUpdatePost }) => {
  const avatar = useSelector((store) => store?.avatar);
  const [comments, setComments] = useState(commentData);

  const handleAddComment = (comment) => {
    handleUpdatePost({
      countComments: comments.length + 1,
    });
    setComments([comment, ...comments]);
  };

  return (
    <View style={styles.commentContainer}>
      <FlatList
        data={comments}
        renderItem={(item) => {
          return <SingleComment comment={item} />;
        }}
        key={(item) => item.index}
        ListHeaderComponent={
          <View>
            <PostDetail described={post.described} images={post.images} />
            <LikeArea
              post={post}
              comments={comments}
              token={token}
              handleUpdatePost={handleUpdatePost}
            />
          </View>
        }
        removeClippedSubviews={true}
      />
      <CommentFooter
        avatar={avatar}
        token={token}
        postID={post?._id}
        handleAddComment={handleAddComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: "#166ada",
    borderWidth: 2.5,
    marginRight: 10,
  },
  commentContainer: {
    flex: 1,
  },
});

export default CommentArea;
