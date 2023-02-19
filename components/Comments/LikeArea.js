import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { likeAPI } from "../../api/postApi";

const LikeArea = ({ token, post, comments, handleUpdatePost }) => {
  const [isLike, setLike] = useState(post?.isLike);
  const [like, setListLike] = useState(post.like);
  const likePost = async () => {
    const data = {
      token: token,
      postID: post?._id,
    };
    await likeAPI(data).then((res) => {
      if (res.isSuccess) {
        setLike(!isLike);
        setListLike(res.data.like);
        handleUpdatePost({
          isLike: res.data.isLike,
          like: res.data.like,
        });
        console.log("Like successfully");
      } else {
        console.log("Like fail");
      }
    });
  };
  return (
    <View style={styles.postLikes}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={likePost}>
          <AntDesign name={isLike?"like1":"like2" } size={24} color={isLike ? "blue" : "#606060"} />
        </TouchableOpacity>
        <Text styles={{ fontSize: 26 }}>{` ${like.length}`}</Text>
      </View>
      <View>
        <Text>{`${comments.length} comments`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postLikes: {
    paddingVertical: 8,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
    borderColor: '#dcdcdc',
    borderWidth: 0.5,
  },
});

export default LikeArea;
