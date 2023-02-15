import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import FriendScreen from "./FriendScreen";
import MessagesScreen from "./MessagesScreen";
import NotificationsScreen from "./NotificationsScreen";
import UserDetailScreen from "./UserScreen";
import LoginScreen from "./LoginScreen";
import AddStatus from "../components/Status/AddStatus";
import PostDetailScreen from "./PostScreen";
import ShowAllFriendScreen from "./ShowAllFriendScreen";
import PrivateChatScreen from "./PrivateChatScreen";
import MeDetailScreen from "./UserHomeScreen";
import EditDetailScreen from "./EditDetailScreen";
import EditPostScreen from "./EditPostScreen";

export default function MainScreen() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FriendScreen" component={FriendScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
        />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
        <Stack.Screen name="PostScreen" component={AddStatus} />
        <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
        <Stack.Screen
          name="ShowAllFriendsScreen"
          component={ShowAllFriendScreen}
        />
        <Stack.Screen name="PrivateChatScreen" component={PrivateChatScreen} />
        <Stack.Screen name="MeScreen" component={MeDetailScreen} />
        <Stack.Screen name="EditDetailScreen" component={EditDetailScreen} />
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
