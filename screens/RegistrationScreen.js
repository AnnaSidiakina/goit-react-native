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
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialeUserState = {
  name: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [userState, setUserState] = useState(initialeUserState);
  const window = Dimensions.get("window").width - 16 * 2;
  const [dimensions, setDimensions] = useState(window);

  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (window) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, [dimensions]);

  // fonts

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // end fonts

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(userState);
    setUserState(initialeUserState);
  };

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        {/* <View style={styles.container}> */}
        <ImageBackground
          style={styles.imgBgr}
          source={require("../assets/images/imageBgr.png")}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formBgr,
                marginTop: isShowKeyboard ? 147 : 263,
              }}
            >
              <Text style={styles.title}>Sign up</Text>
              <View
                style={{
                  ...styles.form,
                  //   marginBottom: isShowKeyboard ? 32 : 79,
                  //   marginTop: isShowKeyboard ? 147 : 263,
                  width: dimensions,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={userState.name}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setUserState((prevState) => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={userState.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setUserState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={userState.password}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setUserState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTitle}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>
                    Already have an account? Sign in
                  </Text>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        {/* </View> */}
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  imgBgr: {
    flex: 1,
    justifyContent: "center",
    // resizeMode: "cover",
  },
  formBgr: {
    // height: 549,
    flex: 1,
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
    // marginTop: 92,
  },
  form: {
    flex: 1,
    // alignItems: "center",
    // marginHorizontal: 16,
    // justifyContent: "center",
  },
  input: {
    height: 50,
    fontFamily: "RobotoRegular",
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
