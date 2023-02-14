import { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getListFriendAPI } from "../api/firendApi";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";

const ShowAllFriendScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const token = useSelector((store) => store?.token);

  useEffect(() => {
    getListFriendAPI({ token: token }).then((res) => {
      if (res.isSuccess) {
        setFriends(res.data);
      }
    });
  }, []);

  const Header = () => {
    const goBack = () => {
      navigation.goBack();
    };
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="chevron-back" size={24} color={"#3b5998"} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 24, fontWeight: "500", textAlign: "center" }}
          >
            Friends
          </Text>
        </View>
      </View>
    );
  };

  const Friend = ({ friend }) => {
    const selectOptionForFriend = () => {
      console.log("Select option for friend");
    };

    const showUserDetail = () => {
      navigation.navigate("UserDetailScreen", {
        user: friend,
      });
    };

    const imageSource =
      friend?.avatar != null ? {} : require("../assets/user.png");
    return (
      <View style={styles.friendContainer}>
        <Image source={imageSource} style={styles.friendAvatar} />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={showUserDetail}
            style={{ flex: 1, marginLeft: 15, alignContent: "center" }}
          >
            <Text style={styles.friendUsername}>{friend?.username}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ alignContent: "center" }}
          onPress={selectOptionForFriend}
        >
          <MaterialCommunityIcons name="dots-horizontal" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>
          {friends.length} friends
        </Text>
      </View>

      <FlatList
        data={friends}
        renderItem={(item) => {
          return <Friend friend={item.item} />;
        }}
        key={(item) => item.index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  headerContainer: {
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  friendContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderWidth: 1,
    radius: 15,
  },
  friendUsername: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ShowAllFriendScreen;
