import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { searchAPI } from "../../api/userApi";

const Header = () => {
  const token = useSelector((store) => store?.token);
  const handleSearch = async () => {
    await searchAPI({ token: token });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <TouchableOpacity>
          <Image
            source={require("../../assets/header/logo.jpg")}
            style={{
              width: 100,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require("../../assets/header/search.jpg")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/header/navbar.jpg")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
