import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Post from "../Home/Post";

const listPros = [
  "username",
  "gender",
  "birthday",
  "description",
  "address",
  "city",
];

const UserInformationDetail = ({ user }) => {
  // console.log(user);
  return (
    <View>
      <Text>Chi tiết</Text>
      {listPros.map((pros, index) => {
        if (user.hasOwnProperty(pros)) {
          return (
            <View key={index} style={styles.infoContainer}>
              <Text>{pros}</Text>
              <Text>{user[pros]}</Text>
            </View>
          );
        } else {
          return <View key={index}></View>;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
  },
});

export default UserInformationDetail;
