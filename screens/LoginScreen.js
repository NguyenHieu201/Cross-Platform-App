import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, getListPostAction } from "../redux/actions/userActions";
import { loginAPI, showPostAPI } from "../api/userApi";

const styles = StyleSheet.create({
  phone_input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
  },
  password_input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
  },
});

export default function LoginScreen({ navigation }) {
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLoginPress = async () => {
    const data = {
      phonenumber: phonenumber,
      password: password,
    };
    await loginAPI(data).then(async (loginRes) => {
      if (loginRes.isSuccess) {
        await showPostAPI({ token: loginRes.token }).then((showPostRes) => {
          if (showPostRes.isSuccess) {
            dispatch(loginAction({ token: loginRes.token }));
            dispatch(getListPostAction({ posts: showPostRes.posts }));
            navigation.navigate("HomeScreen");
          } else {
            console.log("ShowPost Error");
          }
        });
      } else {
        console.log("Login Error");
      }
    });
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label="phone"
          placeholder="Phone number"
          keyboardType="numeric"
          returnKeyType="next"
          style={styles.phone_input}
          value={phonenumber}
          onChangeText={(text) => setPhoneNumber(text)}
        ></TextInput>
      </View>

      <View>
        <TextInput
          label="phone"
          placeholder="Password"
          style={styles.phone_input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        ></TextInput>
      </View>

      <TouchableOpacity mode="contained" onPress={onLoginPress}>
        <AntDesign
          name="rightcircle"
          size={50}
          color={"#00bfff"}
          style={{
            width: 100,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
