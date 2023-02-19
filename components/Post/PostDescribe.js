import { View, Text, StyleSheet } from "react-native";

const PostDescribe = ({ described }) => {
  return (
    <View>
      <Text style={styles.postDescribe}>{described}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postDescribe: { paddingHorizontal: 10, fontSize: 16 },
});

export default PostDescribe;
