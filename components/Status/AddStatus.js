import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { createPostAPI } from "../../api/postApi";
import { convertBase64 } from "../../utils/convertBase64";
import { fileApi } from "../../api/fileApi";
import { addPostAction } from "../../redux/actions/postActions";

const AddStatus = ({ navigation, assets = [] }) => {
  const [pics, setPics] = useState(assets);
  const [content, setContent] = useState("");
  const [create, setCreate] = useState(false);

  const token = useSelector((store) => store?.token);
  const user = useSelector((store) => store);
  const dispatch = useDispatch();
  const addPic = (pic) => {
    setPics([...pics, pic]);
  };
  const createNewPost = async () => {
    const images = [];
    for (let i = 0; i < pics.length; i++) {
      let imageBase64 = await convertBase64(pics[i]);
      images.push(imageBase64);
    }

    const data = {
      described: content,
      images: images,
      token: token,
    };

    if (create)
      await createPostAPI(data).then((res) => {
        if (res.isSuccess) {
          console.log("Post successfully");
          const routes = navigation.getState()?.routes;
          const pvRoute = routes[routes.length - 2].name;
          if (pvRoute == "HomeScreen") {
            dispatch(addPostAction({ post: res.post }));
            // console.log(res.post);
            navigation.navigate(pvRoute, {
              createPost: true,
            });
          } else {
            navigation.navigate(pvRoute);
          }
        } else {
          console.log("Post not success");
        }
      });
    else {
      console.log("Please make a content to create");
    }
  };

  // const chooseImage = () => {
  //   navigation.navigate("ChooseImageScreen");
  // };

  const chooseImageFromCamera = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    }).then((result) => {
      if (!result.canceled) {
        addPic(result?.assets[0]);
        console.log("Take photo from camera");
      } else {
        console.log("Not take photo");
      }
    });
  };

  const chooseImageFromGallery = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      base64: true,
    }).then((result) => {
      if (!result.canceled) {
        // addPic(result?.assets[0]);
        setPics([...pics, ...result?.assets]);
        console.log("Take photo from gallery");
      } else {
        console.log("Not take photo");
      }
    });
  };

  const cancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 50,
          borderBottomWidth: 1,
          borderBottomColor: "#eef",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginLeft: 10, marginTop: 12 }}
            onPress={cancel}
          >
            <Icon name="arrow-back" type="material" color="#333" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 13,
              fontSize: 20,
              fontWeight: "500",
              color: "#333",
            }}
          >
            Add Post
          </Text>
          <View>
            <TouchableOpacity onPress={createNewPost}>
              {create ? (
                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 200,
                    fontSize: 16,
                    fontWeight: "500",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  OK
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 200,
                    fontSize: 16,
                    fontWeight: "500",
                    textTransform: "uppercase",
                    color: "#aaa",
                  }}
                >
                  OK
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <View>
          <Image
            style={{ height: 50, width: 50, borderRadius: 100 }}
            source={
              user?.avatar !== null
                ? { uri: fileApi({ filename: user.avatar.fileName }) }
                : require("../../assets/user.png")
            }
          ></Image>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            color: "#333",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          {user?.username}
        </Text>
      </View>
      <View style={{ marginTop: -40, marginLeft: 70, flexDirection: "row" }}>
        <View
          style={{
            marginLeft: 5,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.addImage}
            onPress={chooseImageFromGallery}
          >
            <View
              style={{
                marginLeft: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="plus" type="octicon" color="#333" size={16} />
            </View>
            <Text style={{ fontWeight: "500", paddingLeft: 3, paddingTop: 4 }}>
              Photos
            </Text>
            <View style={{ marginLeft: -3 }}>
              <Icon name="arrow-drop-down" type="material" color="#333" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addImage}
            onPress={chooseImageFromCamera}
          >
            <View
              style={{
                marginLeft: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="plus" type="octicon" color="#333" size={16} />
            </View>
            <Text style={{ fontWeight: "500", paddingLeft: 3, paddingTop: 4 }}>
              Camera
            </Text>
            <View style={{ marginLeft: -3 }}>
              <Icon name="arrow-drop-down" type="material" color="#333" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          multiline={true}
          numberOfLines={2}
          placeholder="What do you think now?"
          style={{ margin: 10, fontSize: 25 }}
          value={content}
          onChangeText={(post) => {
            if (post.length > 0) {
              setCreate(true);
            } else {
              setCreate(false);
            }
            setContent(post);
          }}
        />
      </View>

      {pics.length > 0 && (
        <View style={{ marginBottom: 0, flexDirection: "row" }}>
          {pics.map((pic, index) => {
            return (
              <Image
                source={{ isStatic: true, uri: pic?.uri }}
                style={{
                  width: 50,
                  height: 100,
                  resizeMode: "cover",
                }}
                key={index}
              />
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddStatus;

const styles = StyleSheet.create({
  addImage: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
});
