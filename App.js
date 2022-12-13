// import { StatusBar } from "expo-status-bar";
import SignUp from "./screens/RegistrationScreen";
import SignIn from "./screens/LoginScreen";
import { StyleSheet, View } from "react-native";

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
