import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultCreatePostsScreen from "../nestedScreens/DefaultCreatePostsScreen";

const NestedScreen = createNativeStackNavigator();

const CreatePostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultCreatePosts"
        component={DefaultCreatePostsScreen}
        options={{
          title: "Create Post",
          headerStyle: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerBackVisible: true,
          // headerBackImageSource: '',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={1}
              // style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default CreatePostsScreen;
