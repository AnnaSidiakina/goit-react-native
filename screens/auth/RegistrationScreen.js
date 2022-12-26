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
  Image,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import Add from "../../assets/images/add.svg";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid";

// const initialeUserState = {
//   name: "",
//   email: "",
//   password: "",
// };

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [userState, setUserState] = useState(initialeUserState);
  const [secureText, setSecureText] = useState(true);

  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log(
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }
    })();
  }, []);

  const handleName = (value) => setName(value.trim());
  const handleEmail = (value) => setEmail(value.trim());
  const handlePassword = (value) => setPassword(value.trim());

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
    setIsFocusedName(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };
  const uploadPictureToServer = async () => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      const uniqueAvatarId = nanoid();
      await db.storage().ref(`avatar/${uniqueAvatarId}`).put(file);

      const processedPicture = await db
        .storage()
        .ref("avatar")
        .child(uniqueAvatarId)
        .getDownloadURL();
      console.log(processedPicture);
      return processedPicture;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        Alert.alert("Please, fill all the fields");
      }
      Alert.alert(`Welkome, ${name}!`);
      const avatar = await uploadPictureToServer();
      dispatch(authSignUpUser({ name, email, password, avatar: avatar }));
      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
    } catch (error) {
      console.log(error.message);
    }
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
                marginTop: isShowKeyboard ? 147 : 263,
              }}
            >
              <View style={styles.avatar}>
                <Image
                  source={{ uri: avatar }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
                <TouchableOpacity onPress={pickImage}>
                  <Add style={styles.addButton} width={25} height={25}></Add>
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Sign up</Text>
              <View
                style={{
                  ...styles.form,

                  width: windowWidth,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: isFocusedName ? "#fff" : "#F6F6F6",
                    borderColor: isFocusedName ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Name"
                  value={name}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusedName(true);
                  }}
                  onChangeText={handleName}
                />
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
                    secureTextEntry={secureText}
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
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTitle}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Signin")}
                  style={styles.bottomTextContainer}
                >
                  <Text style={styles.bottomText}>
                    Already have an account? Sign in
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
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  imgBgr: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formBgr: {
    height: 549,
    // flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    left: 107,
    bottom: 15,
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
  showButton: {
    position: "absolute",
    top: 15,
    right: 0,
  },
  passwordInput: {
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
