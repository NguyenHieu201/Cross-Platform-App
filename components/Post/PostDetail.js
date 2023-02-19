import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PostImage from "./PostImage";

const PostDetail = ({ described, images }) => {
  return (
    <View>
      <Text style={{ padding: 5, fontSize:20, paddingLeft:15}}>{described}</Text>
      <PostImage images={images} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default PostDetail;
