import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          title: "Posts",
          headerStyle: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          // headerBackVisible: true,
          // headerBackImageSource: '',
          // headerLeft: () => (
          //   <TouchableOpacity
          //     activeOpacity={1}
          //     // style={{ marginLeft: 10 }}
          //     onPress={() => navigation.goBack()}
          //   >
          //     <Ionicons name="arrow-back" size={24} color="#212121CC" />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <NestedScreen.Screen
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
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          headerStyle: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerBackVisible: true,
          // headerBackImageSource: '',
          // headerLeft: () => (
          //   <TouchableOpacity
          //     activeOpacity={1}
          //     // style={{ marginLeft: 10 }}
          //     onPress={() => navigation.goBack()}
          //   >
          //     <Ionicons name="arrow-back" size={24} color="#212121CC" />
          //   </TouchableOpacity>
          // ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
