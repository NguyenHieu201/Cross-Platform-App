import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
// import { getFriendStatus } from "../api/firendApi";
import { useSelector } from "react-redux";
import { getFriendStatus } from "../api/firendApi";

const UserDetailScreen = ({ navigation, route }) => {
  const user = route.params.user;
  const token = useSelector((store) => store?.token);

  useEffect(() => {
    getFriendStatus({ token: token, userId: user?._id }).then((res) => {
      const userStatus = res.data;
      console.log(userStatus);
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const SearchBar = () => {
    const [searchInfo, setSearchInfo] = useState(user?.username);
    return (
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search on Fabo"
          value={searchInfo}
          onChangeText={(text) => setSearchInfo(text)}
          onSubmitEditing={() => {
            console.log("Search");
          }}
        />
      </View>
    );
  };

  const UserDetail = () => {
    // "author": {"_id": "63d7e3ebed919a51b8523e35", "avatar": null, "phonenumber": "0987738700", "username": "filial"}
    const avatar =
      user?.avatar != null
        ? { uri: user?.avatar }
        : require("../assets/user.png");
    const username = user?.username;
    const addFriend = () => {
      console.log("Add friend");
    };

    const blockUser = () => {
      console.log("Block User");
    };
    return (
      <View style={styles.userDetail}>
        <Image source={avatar} style={styles.userAvatar} />
        <Text style={styles.username}>{username}</Text>

        <View style={styles.userOptions}>
          <TouchableOpacity style={styles.userOptionBlock} onPress={addFriend}>
            <Text style={styles.userOption}>Add Friend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userOptionBlock} onPress={blockUser}>
            <Text style={styles.userOption}>Block</Text>
          </TouchableOpacity>
        </View>
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

      <UserDetail />
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
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 15,
    padding: 5,
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
    backgroundColor: "#1A6ED8",
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
    width: 150,
    alignItems: "center",
    backgroundColor: "#1A6ED8",
  },
});

export default UserDetailScreen;
