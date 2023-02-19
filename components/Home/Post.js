import { Image, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { fileApi } from "../../api/fileApi";
import { Icon } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { memo, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAPI, listCommentAPI, likeAPI } from "../../api/postApi";
import { Dimensions } from "react-native";
import { updatePostAction } from "../../redux/actions/postActions";
import PostHeader from "../Post/PostHeader";
import PostDescribe from "../Post/PostDescribe";
import PostImage from "../Post/PostImage";

const defaultAvatar = require("../../assets/user.png");

const Post = ({ navigation, index, route }) => {
  const [post, setPost] = useState(useSelector((store) => store?.posts[index]));
  const token = useSelector((store) => {
    return store?.token;
  });
  const avatar = useSelector((store) => store?.avatar);
  const id = useSelector((store) => store?.id);

  const PostLikes = () => {
    const [isLike, setLike] = useState(post.isLike);
    const likePost = async () => {
      const data = {
        token: token,
        postID: post?._id,
      };
      await likeAPI(data).then((res) => {
        if (res.isSuccess) {
          console.log("Like successfully");
          setPost({ ...post, like: res.data.like, isLike: !isLike });
        } else {
          console.log("Like fail");
        }
      });
    };
    const showAllComment = async () => {
      console.log("List all comment of this post");
      const data = {
        token: token,
        postID: post?._id,
      };
      await listCommentAPI(data).then((res) => {
        if (res.isSuccess) {
          const comments = res.comments;
          navigation.navigate("PostDetailScreen", {
            comments: comments,
            post: post,
            index: index,
          });
        } else {
          console.log("Get comment fail");
        }
      });
    };
    return (
      <View style={styles.postLikes}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={likePost}>
            <AntDesign
              name="like1"
              size={24}
              color={isLike ? "blue" : "#606060"}
            />
          </TouchableOpacity>

          <Text styles={{ fontSize: 26 }}>{` ${post.like.length}`}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={showAllComment}>
            <Text>{`${post?.countComments} comments`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CommentFooter = ({ avatar }) => {
    const [comment, setComment] = useState("");
    const imageSource =
      avatar != null
        ? { uri: fileApi({ filename: avatar.fileName }) }
        : defaultAvatar;

    const sendComment = async () => {
      const data = {
        token: token,
        postID: post?._id,
        comment: comment,
      };

      await createCommentAPI(data).then((res) => {
        if (res.isSuccess) {
          console.log("Create comment successfully");
          setComment("");
          setPost({ ...post, countComments: post?.countComments + 1 });
        } else {
          console.log("Create comment error");
        }
      });
    };
    return (
      <View
        style={{
          paddingTop: 5,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={imageSource}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
          }}
        />
        <View
          style={{ width: "95%", flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            placeholder="Write your comment..."
            multiline={true}
            numberOfLines={2}
            style={styles.commentInput}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            onPress={sendComment}
            style={{
              marginLeft: 5,
            }}
          >
            <FontAwesome name="send" size={20} color='#505050'/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.post}>
      <PostHeader
        username={post.author.username}
        avatar={post.author.avatar}
        editPost={() => {
          if (id == post.author._id)
            navigation.navigate("EditPostScreen", {
              post: post,
            });
          else {
            console.log("Cannot edit this post");
          }
        }}
      />
      <PostDescribe described={post.described} />
      <PostImage images={post.images} />
      <PostLikes />
      <CommentFooter avatar={avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    // borderTopColor: "#05050538",
    // borderTopWidth: 1,
    marginTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomColor:"#f0f0f0",
    borderBottomWidth: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 5,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: "#166ada",
    borderWidth: 2.5,
  },
  postImage: {
    flexDirection: "column",
    width: "100%",
  },
  singleImage: {
    height: 400,
    resizeMode: "contain",
  },
  postLikes: {
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  postDescribe: { paddingHorizontal: 10, fontSize: 17 },
  commentInput: {
    marginLeft: 10,
    backgroundColor: "#f5f5f5",
    height: 40,
    width: "85%",
    paddingLeft: 10,
    position: "relative",
    borderRadius: 30,
  },
});

export default memo(Post, (props, nextProps) => {
  if (nextProps.route.params?.index != nextProps.index) {
    return true;
  }
  return false;
});
