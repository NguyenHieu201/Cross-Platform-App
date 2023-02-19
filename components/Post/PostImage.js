import { useState } from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
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

const styles = StyleSheet.create({});

export default PostImage;
