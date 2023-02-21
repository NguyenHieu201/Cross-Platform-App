import { useEffect } from "react";
import PostImage from "./PostImage";
import { useState } from "react";
import { Image, View, StyleSheet, Dimensions, Text } from "react-native";
import { fileApi } from "../../api/fileApi";

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

const PostDetail = ({ described, images }) => {
  return (
    <View>
      <Text style={{ padding: 5, fontSize: 20, paddingLeft: 15 }}>
        {described}
      </Text>
      {images.map((image, index) => {
        return <SinglePostImg image={image} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostDetail;
