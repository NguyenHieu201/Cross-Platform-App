const { Text, View } = require("react-native");
import { useState } from "react";
import { Button, ButtonGroup } from "react-native-elements";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordAPI } from "../api/userApi";
import { logoutAction } from "../redux/actions/userActions";
import { ToastAndroid, Alert, Keyboard } from "react-native";

const ChangePassword = () => {
  const token = useSelector((store) => store?.token);
  const [stPassword, setStPass] = useState("");
  const [ndPassword, setNdPass] = useState("");

  const changePassword = async () => {
    const data = {
      token: token,
      currentPassword: stPassword,
      newPassword: ndPassword,
    };
    Keyboard.dismiss();
    await ChangePasswordAPI(data).then((res) => {
      if (res.isSuccess) {
        ToastAndroid.show("Change password successfully", ToastAndroid.LONG);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG, ToastAndroid.CENTER);
        // Alert.alert(res.message);
        // console.log(res.message);
      }
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Nhap mat khau cu"
        value={stPassword}
        onChangeText={(text) => setStPass(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Nhap mat khau moi"
        value={ndPassword}
        onChangeText={(text) => setNdPass(text)}
        secureTextEntry
      />
      <Button title={"Xac nhan"} onPress={changePassword} />
    </View>
  );
};

const MenuScreen = ({ navigation }) => {
  const [changePassword, hideChangePassword] = useState(false);

  const dispatch = useDispatch();

  const logOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    dispatch(logoutAction());
  };
  return (
    <SafeAreaView>
      <Text>MenuScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("MeScreen")}>
        <Text>Xem trang ca nhan</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => hideChangePassword(!changePassword)}>
        <Text>Doi mat khau</Text>
      </TouchableOpacity>

      {changePassword && <ChangePassword />}

      <TouchableOpacity onPress={logOut}>
        <Text>Dang xuat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MenuScreen;
