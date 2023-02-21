import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserInformationDetail from "../components/UserDetails/UserDetail";
import { FlatList } from "react-native-gesture-handler";
import Post from "../components/Home/Post";
import { getUserPostAPI } from "../api/postApi";
import { fileApi } from "../api/fileApi";

const MeDetailScreen = ({ navigation, route }) => {
  const user = useSelector((store) => store);
  const token = useSelector((store) => store?.token);
  const [posts, setPosts] = useState([]);

  // console.log(route.params);

  useLayoutEffect(() => {
    getUserPostAPI({ token: token, userId: user?._id }).then((res) => {
      if (res.isSuccess) setPosts(res.posts.reverse());
      else {
        console.log("Fetch post of user failed");
      }
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const editUserInform = () => {
    console.log("Edit user");
    navigation.navigate("EditDetailScreen", {
      user: user,
    });
  };

  const SearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <Text style={{ flex: 1, textAlign: "center" }}>{user?.username}</Text>
        <TouchableOpacity onPress={editUserInform}>
          <MaterialIcons name="edit" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const UserDetail = () => {
    // "author": {"_id": "63d7e3ebed919a51b8523e35", "avatar": null, "phonenumber": "0987738700", "username": "filial"}
    const avatar =
      user?.avatar != null
        ? { uri: fileApi({ filename: user.avatar.fileName }) }
        : require("../assets/user.png");
    const username = user?.username;

    return (
      <View style={styles.userDetail}>
        <Image source={avatar} style={styles.userAvatar} />
        <Text style={styles.username}>{username}</Text>

        <View style={styles.userOptions}>
          <TouchableOpacity
            style={styles.userOptionBlock}
            onPress={editUserInform}
          >
            <Text style={styles.userOption}>Edit home page</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const FlatListHeader = () => {
    return (
      <View>
        <UserDetail />
        {/* <UserInformationDetail user={user} /> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="chevron-back" size={24} color={"#3b5998"} />
        </TouchableOpacity>

        <SearchBar />
      </View>

      <FlatList
        data={posts}
        renderItem={(item) => {
          return (
            <Post
              postData={item.item}
              navigation={navigation}
              index={item.index}
              route={route}
            />
          );
        }}
        key={(item) => item.index}
        nestedScrollEnabled={true}
        maxToRenderPerBatch={5}
        ListHeaderComponent={FlatListHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
  },
  header: {
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchBar: {
    width: "90%",
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  userDetail: {
    flexDirection: "column",
    alignItems: "center",
  },
  userAvatar: {
    width: 100,
    height: 100,
  },
  username: {
    fontSize: 28,
  },
  userOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userOption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: "#fff",
    borderRadius: 8,
    fontSize: 15,
  },
  userOptionBlock: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    height: 40,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1A6ED8",
  },
});

export default MeDetailScreen;
