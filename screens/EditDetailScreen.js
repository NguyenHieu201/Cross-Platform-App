import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { editUserDetailAPI, showMeAPI } from "../api/userApi";
import { convertBase64 } from "../utils/convertBase64";
import { useSelector } from "react-redux";
import { fileApi } from "../api/fileApi";

const Header = ({ goBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="chevron-back" size={24} color={"#3b5998"} />
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>
        Chỉnh sửa trang cá nhân
      </Text>
    </View>
  );
};

const AvatarEdit = ({ avatar, token }) => {
  const imageSource =
    avatar != null
      ? { uri: fileApi({ filename: avatar?.fileName }) }
      : require("../assets/user.png");
  const [avatarCurr, setAvatar] = useState(imageSource);

  const handleChangeAvatar = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    }).then(async (result) => {
      if (!result.canceled) {
        // addPic(result?.assets[0]);
        setAvatar({
          uri: result?.assets[0].uri,
        });
        await convertBase64(result?.assets[0]).then(async (base64Img) => {
          const data = {
            token: token,
            detail: {
              avatar: base64Img,
            },
          };
          await editUserDetailAPI(data).then((res) => {
            console.log(res);
            if (res.isSuccess) console.log("Take photo from gallery");
          });
        });
      } else {
        console.log("Not take photo");
      }
    });
  };
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Ảnh đai diện</Text>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleChangeAvatar}>
          <Text>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={avatarCurr}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          borderRadius: 50,
          borderColor: "#166ada",
          borderWidth: 2.5,
        }}
      />
    </View>
  );
};

const DescriptionEdit = ({ description, token }) => {
  const [descInput, setDescInput] = useState("");
  const handleChangeDesc = async () => {
    const data = {
      token: token,
      detail: {
        description: descInput,
      },
    };
    await editUserDetailAPI(data).then((res) => {
      if (res.isSuccess) {
        console.log("Change description successfully");
      }
    });
  };
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Tiểu sử</Text>
      </View>
      <TextInput
        placeholder={description != null ? description : "Mô tả bản thân ..."}
        onSubmitEditing={handleChangeDesc}
        value={descInput}
        onChangeText={(text) => {
          setDescInput(text);
        }}
      />
    </View>
  );
};

const CityEdit = ({ address, city, token }) => {
  const [cityInput, setCityInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const handleChangeCity = async () => {
    const data = {
      token: token,
      detail: {
        city: cityInput,
      },
    };
    await editUserDetailAPI(data).then((res) => {
      if (res.isSuccess) {
        console.log("Change city successfully");
      }
    });
  };
  const handleChangeAddress = async () => {
    const data = {
      token: token,
      detail: {
        address: addressInput,
      },
    };
    await editUserDetailAPI(data).then((res) => {
      if (res.isSuccess) {
        console.log("Change address successfully");
      }
    });
  };
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Chi tiết</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <AntDesign name="home" size={24} />
        <TextInput
          placeholder={city != null ? city : "Tỉnh/thành phố hiện tại"}
          value={cityInput}
          onChangeText={(text) => {
            setCityInput(text);
          }}
          onSubmitEditing={handleChangeCity}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="work-outline" size={24} />
        <TextInput
          placeholder={address != null ? address : "Nơi làm việc hiện tại"}
          value={addressInput}
          onChangeText={(text) => {
            setAddressInput(text);
          }}
          onSubmitEditing={handleChangeAddress}
        />
      </View>
    </View>
  );
};

const EditDetailScreen = ({ navigation, route }) => {
  const user = route.params?.user;
  const [avatar, setAvatar] = useState(user.avatar);
  const [description, setDesc] = useState(user?.description);
  const [address, setAddress] = useState(user?.address);
  const token = useSelector((store) => store?.token);
  const goBack = () => {
    navigation.goBack({
      refresh: true,
    });
  };
  // console.log(user);
  // useLayoutEffect(() => {
  //   showMeAPI({ token: token }).then((res) => {
  //     console.log(res);
  //   });
  // }, []);
  return (
    <SafeAreaView>
      <Header goBack={goBack} />
      <AvatarEdit avatar={avatar} token={token} />
      <DescriptionEdit
        description={description}
        changeDesc={setDesc}
        token={token}
      />
      <CityEdit city={user?.city} address={address} token={token} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "90%",
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default EditDetailScreen;
