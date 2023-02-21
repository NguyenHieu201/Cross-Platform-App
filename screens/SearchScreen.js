import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { SearchAPI } from "../api/searchApi";
import SearchBar from "../components/Search/SearchBar";
import SearchResult from "../components/Search/SearchResult";

const SearchScreen = ({ navigation, route }) => {
  const token = useSelector((store) => store?.token);
  const [searchResult, setResults] = useState(null);
  const [initUser, setInitUser] = useState("");

  const search = async ({ key }) => {
    await SearchAPI({ key: key, token: token }).then((res) => {
      if (res.isSuccess) {
        const result = res.result;
        const people = result?.people;
        const friend = result?.friend;
        let results = [];
        if (people !== undefined) {
          if (friend !== undefined) {
            results = [...people, ...friend];
          } else {
            results = people;
          }
        } else {
          if (friend !== undefined) {
            results = friend;
          }
        }
        setResults(results);
      } else {
        console.log(res.message);
      }
    });
  };

  useEffect(() => {
    if (route.params?.searchKey) {
      setInitUser(route.params?.searchKey);
      search({ key: route.params.searchKey });
    }
  }, [route.params]);

  return (
    <SafeAreaView>
      <Text>Search HomeScreen</Text>
      <SearchBar navigation={navigation} search={search} initUser={initUser} />
      <SearchResult results={searchResult} navigation={navigation} />
    </SafeAreaView>
  );
};

export default SearchScreen;
