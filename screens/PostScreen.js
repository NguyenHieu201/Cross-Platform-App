import { View, Text, Image, TextInput, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { fileApi } from "../api/fileApi";
import { useSelector } from "react-redux";
import { createCommentAPI, likeAPI } from "../api/postApi";
import { FontAwesome } from "@expo/vector-icons";
import { memo } from "react";

const defaultAvatar = require("../assets/user.png");

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

const PostDetail = ({ described, images }) => {
  return () => {
    return (
      <View style={styles.postDetail}>
        <Text style={{ padding: 5 }}>{described}</Text>
        <PostImage images={images} />
      </View>
    );
  };
};

const UserComment = React.memo((comment) => {
  const avatar = comment.comment.item.user.avatar;
  const imageSource =
    avatar != null ? fileApi({ filename: avatar.fileName }) : defaultAvatar;
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

const PostDetailScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const cmtLikeHandle = route.params.cmtLikeHandle;
  const [comments, setComments] = useState(route.params.comments.data);
  const [isLike, setLike] = useState(post?.isLike);
  const [like, setListLike] = useState(post.like);
  const [countLike, setCountLike] = useState(post.like.length);
  const token = useSelector((store) => store?.token);

  useEffect(() => {
    setComments([null, ...route.params.comments.data]);
  }, []);

  const goHome = () => {
    navigation.goBack();
    cmtLikeHandle({
      isLike: isLike,
      countComments: comments.length,
      like: like,
    });
  };

  const CommentFooter = ({ avatar }) => {
    const imageSource =
      avatar != null
        ? { uri: fileApi({ filename: avatar.fileName }) }
        : defaultAvatar;
    const [comment, setComment] = useState("");

    const sendComment = async () => {
      const data = {
        token: token,
        postID: post?._id,
        comment: comment,
      };

      await createCommentAPI(data).then((res) => {
        if (res.isSuccess) {
          console.log("Create comment successfully");
          setComments([...comments, res.data]);
          setComment("");
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
        <TextInput
          placeholder="Write your comment..."
          multiline={true}
          numberOfLines={2}
          style={styles.commentInput}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity onPress={sendComment}>
          <FontAwesome name="send" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const CommentArea = memo(({ comments }) => {
    const LikeArea = () => {
      const likePost = async () => {
        const data = {
          token: token,
          postID: post?._id,
        };
        await likeAPI(data).then((res) => {
          if (res.isSuccess) {
            setLike(!isLike);
            setListLike(res.like);
            if (res.data.isLike) {
              setCountLike(countLike + 1);
            } else {
              setCountLike(countLike - 1);
            }
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
              <AntDesign
                name="like1"
                size={24}
                color={isLike ? "blue" : "black"}
              />
            </TouchableOpacity>
            <Text styles={{ fontSize: 26 }}>{` ${countLike}`}</Text>
          </View>
          <View>
            <Text>{`${comments.length} comments`}</Text>
          </View>
        </View>
      );
    };

    return (
      <View style={styles.commentContainer}>
        <FlatList
          data={comments}
          renderItem={(item) => {
            if (item.index == 0) {
              return <LikeArea />;
            } else return <UserComment comment={item} />;
          }}
          key={(item) => item._id}
          nestedScrollEnabled={true}
          ListHeaderComponent={PostDetail({
            described: post.described,
            images: post.images,
          })}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={goHome}>
          <AntDesign name="back" size={24} />
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

      <CommentArea comments={comments} />
      <CommentFooter avatar={null} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailHeader: {
    flexDirection: "row",
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
  },
  postDetail: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  commentArea: {
    marginTop: 10,
    marginBottom: 30,
  },
  postImage: {},
  // singleImage: {
  //   resizeMode: "contain",
  //   width: 95,
  // },
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
  },
  commentFooter: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
  },
});

export default PostDetailScreen;
