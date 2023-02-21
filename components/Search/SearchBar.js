import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ navigation, search, initUser }) => {
  const [searchInfo, setSearchInfo] = useState(initUser);
  const goBack = () => {
    navigation.goBack();
  };

  const onSearchPress = async () => {
    await search({ key: searchInfo });
  };

  useEffect(() => {
    setSearchInfo(initUser);
  }, [initUser]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="chevron-back" size={24} color={"#3b5998"} />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search on Fabo"
          value={searchInfo}
          onChangeText={(text) => setSearchInfo(text)}
          onSubmitEditing={onSearchPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 15,
    padding: 5,
    flex: 1,
  },
});

export default SearchBar;
