import { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { fileApi } from "../../api/fileApi";
import { FontAwesome } from "@expo/vector-icons";
import { createCommentAPI } from "../../api/postApi";

const defaultAvatar = require("../../assets/user.png");

const CommentFooter = ({ avatar, token, postID, handleAddComment }) => {
  const [commentInput, setCommentInput] = useState("");
  const imageSource =
    avatar != null
      ? { uri: fileApi({ filename: avatar.fileName }) }
      : defaultAvatar;

  const sendComment = async () => {
    const data = {
      token: token,
      postID: postID,
      comment: commentInput,
    };

    await createCommentAPI(data).then((res) => {
      if (res.isSuccess) {
        console.log("Create comment successfully");
        handleAddComment(res.data);
        setCommentInput("");
        Keyboard.dismiss();
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
        value={commentInput}
        onChangeText={(text) => setCommentInput(text)}
        onSubmitEditing={sendComment}
      />
      <TouchableOpacity onPress={sendComment}>
        <FontAwesome name="send" size={20} color='#505050'/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInput: {
    backgroundColor:'#eCeCeC',
    height: 40,
    width: "80%",
    paddingLeft:10,
    borderRadius: 30,
  },
});

export default CommentFooter;
