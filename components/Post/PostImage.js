import { useState } from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { fileApi } from "../../api/fileApi";

const SinglePostImg = ({ image, widthRatio = 1 }) => {
  const [height, setHeight] = useState(0);
  const imageUri = fileApi({ filename: image.fileName });
  const deviceWidth = Dimensions.get("window").width;
  Image.getSize(imageUri, (width, height) => {
    const imageHeight = (deviceWidth / width) * height * widthRatio;
    setHeight(imageHeight);
  });
  return (
    <Image
      source={{ uri: imageUri }}
      style={{ height: height, resizeMode: "contain" }}
    />
  );
};

const SingleImage = ({ image, width, height }) => {
  const imageUri = fileApi({ filename: image.fileName });
  return (
    <View>
      <Image
        source={{ uri: imageUri }}
        style={{ height: height, width: width }}
      />
    </View>
  );
};

const DoubleImg = ({ images }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
      }}
    >
      <SinglePostImg image={images[0]} widthRatio={0.4} />
      <SinglePostImg image={images[1]} widthRatio={0.4} />
    </View>
  );
};

const TripleImg = ({ images }) => {
  const [leftImageHeight, setHeight] = useState(0);
  const imageUri = fileApi({ filename: images[0].fileName });
  const deviceWidth = Dimensions.get("window").width;
  Image.getSize(imageUri, (width, height) => {
    const imageHeight = (deviceWidth / width) * height * 0.5;
    setHeight(imageHeight);
  });
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: "50%" }}>
        <SinglePostImg image={images[0]} widthRatio={0.5} />
      </View>
      <View style={{ width: "50%" }}>
        <SingleImage
          image={images[1]}
          width={"100%"}
          height={leftImageHeight / 2}
        />
        <SingleImage
          image={images[2]}
          width={"100%"}
          height={leftImageHeight / 2}
        />
      </View>
    </View>
  );
};

const QuadImg = ({ images }) => {
  const [leftImageHeight, setHeight] = useState(0);
  const imageUri = fileApi({ filename: images[0].fileName });
  const deviceWidth = Dimensions.get("window").width;
  Image.getSize(imageUri, (width, height) => {
    const imageHeight = (deviceWidth / width) * height * 0.5;
    setHeight(imageHeight);
  });
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: "50%" }}>
        <SinglePostImg image={images[0]} widthRatio={0.5} />
      </View>
      <View style={{ width: "50%" }}>
        <SingleImage
          image={images[1]}
          width={"100%"}
          height={leftImageHeight / 3}
        />
        <SingleImage
          image={images[2]}
          width={"100%"}
          height={leftImageHeight / 3}
        />
        <SingleImage
          image={images[3]}
          width={"100%"}
          height={leftImageHeight / 3}
        />
      </View>
    </View>
  );
};

const PostImage = ({ images }) => {
  const numImage = images.length;
  if (numImage == 0) return null;
  switch (numImage) {
    case 1:
      return <SinglePostImg image={images[0]} />;
    case 2:
      return <DoubleImg images={images} />;
    case 3:
      return <TripleImg images={images} />;
    case 4:
      return <QuadImg images={images} />;
  }
};

const styles = StyleSheet.create({});

export default PostImage;
