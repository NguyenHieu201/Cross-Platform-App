import { StyleSheet, View, TextInput, TouchableOpacity, Image, Button } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, getListPostAction } from "../redux/actions/userActions";
import { loginAPI, showPostAPI } from "../api/userApi";

const styles = StyleSheet.create({
  phone_input: {
    borderColor: "#5F9EA0",  
    borderWidth: 3,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    height: 50,
  },
  container_login: {
    flex: 1,
    justifyContent:'center',
    marginHorizontal: 10,
    marginBottom: 80,
  },
  imglogin:{
    width: "100%",
    height: 150,
    marginBottom: 50,
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
            dispatch(
              loginAction({
                token: loginRes.token,
                userInfo: loginRes.userInfo,
              })
            );
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
    <SafeAreaView style={styles.container_login}>
    <Image 
        source={require("../assets/fblogo.jpg")} 
        style={styles.imglogin}
        ></Image>
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

      <Button 
        onPress={onLoginPress}
        style={styles.login_btn}
        title="Login"
        color='#2E8B57'     
      >
      </Button>
      <Button 
        onPress={onLoginPress}
        style={styles.login_btn}
        title="Login"
        color='#2E8B57'     
      >
      </Button>
    </SafeAreaView>
  );
}
