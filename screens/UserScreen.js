import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useLayoutEffect, useState } from "react";
// import { getFriendStatus } from "../api/firendApi";
import { useSelector } from "react-redux";
import { getFriendStatus, acceptInviteAPI } from "../api/firendApi";
import {
  getAllChatWithFriendId,
  getAllMessageWithChatId,
} from "../api/chatApi";
import { showUserAPI } from "../api/userApi";
import UserInformationDetail from "../components/UserDetails/UserDetail";
import { FlatList } from "react-native-gesture-handler";
import Post from "../components/Home/Post";
import { getUserPostAPI } from "../api/postApi";

const UserDetailScreen = ({ navigation, route }) => {
  const token = useSelector((store) => store?.token);
  const [friendStatus, setStatus] = useState("none");
  const [posts, setPosts] = useState([]);
  const user = route.params.user;

  // useEffect(() => {
  //   getFriendStatus({ token: token, userId: user?._id }).then((res) => {
  //     const userStatus = res.data;
  //     switch (userStatus) {
  //       case "received":
  //         setStatus("Accept");
  //         break;
  //       case "friend":
  //         setStatus("Friend");
  //         break;
  //     }
  //     console.log(userStatus);
  //   });

  //   showUserAPI({ token: token, userId: user?._id }).then((res) => {
  //     if (res.isSuccess) {
  //       setPosts(res.posts);
  //     } else {
  //       console.log("Fetch post failed");
  //     }
  //   });
  // }, []);

  useLayoutEffect(() => {
    getFriendStatus({ token: token, userId: user?._id }).then((res) => {
      const userStatus = res.data;
      switch (userStatus) {
        case "received":
          setStatus("Accept");
          break;
        case "friend":
          setStatus("Friend");
          break;
      }
      console.log(userStatus);
    });

    showUserAPI({ token: token, userId: user?._id }).then((res) => {
      if (res.isSuccess) {
        setPosts(res.posts);
      } else {
        console.log("Fetch post failed");
      }
    });
    getUserPostAPI({ token: token, userId: user?._id }).then((res) => {
      if (res.isSuccess) {
        setPosts(res.posts);
      } else {
        console.log("Fetch posts failed");
      }
    });
  }, []);

  useEffect(() => {
    console.log(route.user);
  }, [route]);

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
    const addFriend = async () => {
      console.log("Add friend");
      const data = {
        token: token,
        userId: user?._id,
      };
      await acceptInviteAPI(data).then((res) => {
        if (res.isSuccess) {
          console.log("Accept invite Successfully");
          setStatus("Friend");
        } else {
          console.log("Accept invite Failed");
        }
      });
    };

    const blockUser = () => {
      console.log("Block User");
    };

    const createMessageRoom = async () => {
      console.log("Message");
      const data = {
        token: token,
        friendId: user?._id,
      };
      await getAllChatWithFriendId(data).then(async (res) => {
        const chatId = res.chatId;
        const room = {
          chatId: chatId,
          friend: user,
        };
        navigation.navigate("PrivateChatScreen", {
          room: room,
        });
      });
    };
    return (
      <View style={styles.userDetail}>
        <Image source={avatar} style={styles.userAvatar} />
        <Text style={styles.username}>{username}</Text>

        <View style={styles.userOptions}>
          <TouchableOpacity style={styles.userOptionBlock} onPress={addFriend}>
            <Text style={styles.userOption}>{friendStatus}</Text>
          </TouchableOpacity>

          {friendStatus == "Friend" && (
            <TouchableOpacity
              style={styles.userOptionBlock}
              onPress={createMessageRoom}
            >
              <Text style={styles.userOption}>Message</Text>
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity style={styles.userOptionBlock} onPress={blockUser}>
            <Text style={styles.userOption}>Block</Text>
          </TouchableOpacity> */}
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
