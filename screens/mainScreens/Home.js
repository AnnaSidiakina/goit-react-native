import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import PostsScreen from "./PostsScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
const MainTab = createBottomTabNavigator();
const PostsStack = createNativeStackNavigator();
import { useDispatch } from "react-redux";
import CreateIcon from "../../assets/images/createIcon.svg";
export const HomeTabs = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
        // tabBarStyle: {
        //   paddingHorizontal: 60,
        //   height: 83,
        //   paddingBottom: 25,
        //   paddingTop: 9,
        // },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121CC" />,

          headerRight: () => (
            <TouchableOpacity
              onPress={signOut}
              activeOpacity={1}
              style={{ marginRight: 20 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),

          headerTitleAlign: "center",
        }}
      />

      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: () => <CreateIcon width={70} height={40} />,
          tabBarStyle: { display: "none" },
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Feather name="user" size={size} color={color} focused={focused} />
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,
          },

          headerTitleAlign: "center",
        }}
      />
    </MainTab.Navigator>
  );
};
const Home = () => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          title: "Posts",
          headerStyle: {
            color: "#212121",
          },
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Comments",
          headerStyle: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />
      <PostsStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          headerStyle: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />
    </PostsStack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
