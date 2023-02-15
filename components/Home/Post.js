import { Image, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { fileApi } from "../../api/fileApi";
import { Icon } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAPI, listCommentAPI, likeAPI } from "../../api/postApi";
import { Dimensions } from "react-native";
import { updatePostAction } from "../../redux/actions/postActions";

const defaultAvatar = require("../../assets/user.png");

const PostHeader = ({ username, avatar, editPost }) => {
  const imageSource =
    avatar != null
      ? { uri: fileApi({ filename: avatar.fileName }) }
      : defaultAvatar;
  return (
    <View style={styles.postHeader}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image source={imageSource} style={styles.userAvatar} />
        <View>
          <Text> {` ${username}`}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={editPost}>
          <Text style={{ fontWeight: "900" }}>...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostDescribe = ({ described }) => {
  return (
    <View>
      <Text style={styles.postDescribe}>{described}</Text>
    </View>
  );
};

const SinglePostImg = ({ image }) => {
  const [height, setHeight] = useState(0);
  const imageUri = fileApi({ filename: image.fileName });
  const deviceWidth = Dimensions.get("window").width;
  Image.getSize(imageUri, (width, height) => {
    const imageHeight = (deviceWidth / width) * height;
    setHeight(imageHeight);
  });
  return (
    <Image
      source={{ uri: imageUri }}
      style={{ height: height, resizeMode: "contain" }}
    />
  );
};

const PostImage = ({ images }) => {
  const numImage = images.length;
  if (numImage > 0)
    return (
      <View style={styles.postImage}>
        {numImage > 0 &&
          images.map((image, index) => {
            return <SinglePostImg image={image} key={index} />;
          })}
      </View>
    );
};

const Post = ({ postData, navigation, index }) => {
  const [post, setPost] = useState(postData);
  const dispatch = useDispatch();
  const token = useSelector((store) => {
    return store?.token;
  });
  const id = useSelector((store) => store?.id);

  useEffect(() => {
    dispatch(updatePostAction({ index: index, post: post }));
  }, [post]);

  const cmtLikeHandle = (updatedInfo) => {
    setPost({
      ...post,
      ...updatedInfo,
    });
    dispatch(updatePostAction({ index: index, post: post }));
  };

  const isNavigate = navigation !== undefined;

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
          if (isNavigate)
            navigation.navigate("PostDetailScreen", {
              comments: comments,
              post: post,
              cmtLikeHandle: cmtLikeHandle,
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
              color={isLike ? "blue" : "black"}
            />
          </TouchableOpacity>

          <Text styles={{ fontSize: 26 }}>{` ${post?.like.length}`}</Text>
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
            <FontAwesome name="send" size={20} />
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
      <CommentFooter avatar={post.author.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    // borderTopColor: "#05050538",
    // borderTopWidth: 1,
    marginTop: 10,
    backgroundColor: "#fff",
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
    paddingTop: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  postDescribe: { paddingHorizontal: 10, fontSize: 16 },
  commentInput: {
    marginLeft: 10,
    borderColor: "#f0f2f5",
    height: 40,
    borderWidth: 1,
    width: "85%",
    paddingLeft: 10,
    position: "relative",
    borderRadius: 30,
  },
});

export default Post;
