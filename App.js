// import { StatusBar } from "expo-status-bar";
import SignUp from "./screens/RegistrationScreen";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <SignUp />
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
  imgBgr: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formBgr: {
    height: 549,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 78,
  },
  title: {
    // fontFamily: "RobotoBold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    marginTop: 92,
  },
  form: {
    // alignItems: "center",
    // marginHorizontal: 16,
    // justifyContent: "center",
  },
  input: {
    height: 50,
    // fontFamily: "RobotoRegular",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },

  button: {
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    // fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    textAlign: "center",
  },
  bottomTextContainer: {
    // justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    // fontFamily: "RobotoRegular",
    color: "#1B4371",
    fontSize: 16,
  },
});
