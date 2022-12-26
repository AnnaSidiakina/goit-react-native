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
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperations";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
  };

  const handleEmail = (value) => setEmail(value.trim());
  const handlePassword = (value) => setPassword(value.trim());

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Fill all the fields, please");
    }
    dispatch(authSignInUser({ email, password }));

    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.imgBgr}
          source={require("../../assets/images/imageBgr.png")}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formBgr,
                marginTop: isShowKeyboard ? 273 : 323,
              }}
            >
              <Text style={styles.title}>Sign in</Text>
              <View
                style={{
                  ...styles.form,

                  width: windowWidth,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: isFocusedEmail ? "#fff" : "#F6F6F6",
                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Email"
                  value={email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusedEmail(true);
                  }}
                  onChangeText={handleEmail}
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocusedPassword ? "#fff" : "#F6F6F6",
                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedPassword(true);
                    }}
                    onChangeText={handlePassword}
                  />
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={() => {
                      setSecureText((prevState) => !prevState);
                    }}
                  >
                    {secureText ? (
                      <Text style={styles.passwordInput}>Show</Text>
                    ) : (
                      <Text style={styles.passwordInput}>Hide</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTitle}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                  style={styles.bottomTextContainer}
                >
                  <Text style={styles.bottomText}>
                    Have no account? Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 92,
    alignItems: "center",
  },
  title: {
    fontFamily: "RobotoBold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
  },
  form: {
    flex: 1,
  },
  input: {
    height: 50,
    fontFamily: "RobotoRegular",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordInput: {
    position: "absolute",
    top: -54,
    right: 0,
    paddingRight: 16,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
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
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    textAlign: "center",
  },
  bottomTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontFamily: "RobotoRegular",
    color: "#1B4371",
    fontSize: 16,
  },
});
