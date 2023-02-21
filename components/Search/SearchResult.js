import { Text, View, Image, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { fileApi } from "../../api/fileApi";

const defaultAvatar = require("../../assets/user.png");

const SingleResult = ({ result, navigation }) => {
  const username = result.username;
  const avatar = result.avatar;
  const showUserDetail = () => {
    navigation.navigate("UserDetailScreen", {
      user: result,
    });
  };
  const imageSource =
    avatar != null
      ? { uri: fileApi({ filename: avatar.fileName }) }
      : defaultAvatar;
  return (
    <View style={styles.itemContainer}>
      <Image source={imageSource} style={styles.avatar} />
      <View>
        <Text>{username}</Text>
        <Button title="Xem trang ca nhan" onPress={showUserDetail} />
      </View>
    </View>
  );
};

const SearchResult = ({ results, navigation }) => {
  return results !== null ? (
    <View>
      <FlatList
        data={results}
        key={({ index, item }) => index}
        renderItem={({ index, item }) => (
          <SingleResult result={item} navigation={navigation} />
        )}
      />
    </View>
  ) : (
    <View>
      <Text>No Search result</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default SearchResult;
