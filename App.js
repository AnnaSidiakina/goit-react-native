// import { StatusBar } from "expo-status-bar";
import SignUp from "./screens/RegistrationScreen";
import SignIn from "./screens/LoginScreen";
import { StyleSheet, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <View style={styles.container}>
      <SignUp />
      {/* <SignIn /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
