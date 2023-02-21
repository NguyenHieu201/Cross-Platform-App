import { useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { RegisterAPI } from "../api/userApi";
import { showPostAPI } from "../api/userApi";
import { loginAction, getListPostAction } from "../redux/actions/userActions";

const SignupScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [ndPassword, againPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const onSignupPress = async () => {
    const data = {
      username: username,
      password: password,
      phonenumber: phoneNumber,
    };
    await RegisterAPI(data).then(async (registerRes) => {
      if (registerRes.isSuccess) {
        await showPostAPI({ token: registerRes.data.token }).then(
          (showPostRes) => {
            if (showPostRes.isSuccess) {
              dispatch(
                loginAction({
                  token: registerRes.data.token,
                  userInfo: registerRes.data.data,
                })
              );
              dispatch(getListPostAction({ posts: showPostRes.posts }));
              navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              });
            } else {
              console.log("ShowPost Error");
            }
          }
        );
      } else {
        console.log("Register error");
      }
    });
  };

  return (
    <SafeAreaView>
      <Text>Phone number</Text>
      <TextInput
        placeholder="Input phone number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Input your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text>Nhap lai password</Text>
      <TextInput
        placeholder="Nhap lai password"
        secureTextEntry
        value={ndPassword}
        onChangeText={(text) => againPassword(text)}
      />

      <Text>username</Text>
      <TextInput
        placeholder="Chon ten hien thi cua ban"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Button title="Sign up" onPress={onSignupPress} />
    </SafeAreaView>
  );
};

export default SignupScreen;
