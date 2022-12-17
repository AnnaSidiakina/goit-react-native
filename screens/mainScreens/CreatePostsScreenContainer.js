import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DefaultCreatePostsScreen from "../nestedScreens/DefaultCreatePostsScreen";

const DeleteTab = createBottomTabNavigator();

export default function CreatePostsScreenContainer({ navigation }) {
  return (
    <DeleteTab.Navigator
      initialRouteName="CreatePosts"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <DeleteTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity activeOpacity={1}>
              <Feather
                name="trash-2"
                size={24}
                color="#BDBDBD"
                focused={focused}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={1}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        }}
      ></DeleteTab.Screen>
    </DeleteTab.Navigator>

    // <View style={styles.container}>
    //   <Text>CreatePostsScreen</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
