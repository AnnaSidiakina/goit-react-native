import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import PostsScreen from "./PostsScreen";
// import CreatePostsScreenContainer from "./CreatePostsScreenContainer";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
const MainTab = createBottomTabNavigator();
const DeleteTab = createBottomTabNavigator();

export default function Home() {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
        // headerTitleAlign​: 'center',
        tabBarStyle: {
          paddingHorizontal: 60,
          height: 83,
          paddingBottom: 25,
          paddingTop: 9,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity activeOpacity={1}>
              <Feather
                name="grid"
                size={size}
                color={color}
                focused={focused}
              />
            </TouchableOpacity>
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,
          },
          headerRight: () => (
            <TouchableOpacity activeOpacity={1} style={{ marginRight: 20 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerShown: false,
          headerTitleAlign: "center",
          // tabBarStyle: { display: "none" },
        }}
      />

      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 70,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                backgroundColor: "#FF6C00",
              }}
            >
              <Feather name="plus" size={size} color="#fff" focused={focused} />
            </TouchableOpacity>
          ),
          // tabBarItemStyle: {
          //   backgroundColor: "#FF6C00",
          //   width: 70,
          //   height: 40,
          //   borderRadius: 20,
          // },
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
            <TouchableOpacity activeOpacity={1}>
              <Feather
                name="user"
                size={size}
                color={color}
                focused={focused}
              />
            </TouchableOpacity>
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,
          },
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
