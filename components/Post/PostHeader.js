import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fileApi } from "../../api/fileApi";

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

const styles = StyleSheet.create({
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
});

export default PostHeader;
