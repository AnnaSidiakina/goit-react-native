import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function DefaultCreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState({});
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");

  console.log("loc", location);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePicture = async () => {
    const picture = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("location", location);

    setPicture(picture.uri);
    setLocation(location.coords);
    console.log(picture.uri);
  };

  //   if (errorMsg) {
  //     console.log(errorMsg);
  //   } else if (location) {
  //     console.log(JSON.stringify(location));
  //   }

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const handleSendSubmit = () => {
    navigation.navigate("DefaultPosts", {
      picture,
      description,
      location,
      place,
    });
    resetPost();
  };
  function resetPost() {
    setDescription("");
    setPlace("");
    setPicture(null);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View>
          <Camera style={styles.camera} ref={setCamera}>
            {picture && (
              <View style={styles.takenPictureContainer}>
                <Image
                  source={{ uri: picture }}
                  style={{ width: 100, height: 80 }}
                />
              </View>
            )}
            <TouchableOpacity
              activeOpacity={1}
              style={styles.cameraWrapper}
              onPress={takePicture}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>

          <View>
            <Text style={styles.text}>Take a picture</Text>
          </View>
          <View>
            <TextInput
              placeholder="Image description"
              placeholderTextColor="#BDBDBD"
              style={styles.inputDescription}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.locationContainer}>
            <Ionicons
              style={styles.locationIcon}
              name="location-outline"
              size={24}
              color="#BDBDBD"
            />

            <TextInput
              placeholder="Location"
              placeholderTextColor="#BDBDBD"
              style={styles.inputLocation}
              value={place}
              onChangeText={setPlace}
            />
          </View>
          <TouchableOpacity
            disabled={picture ? false : true}
            activeOpacity={1}
            style={
              picture
                ? { ...styles.button, backgroundColor: "#FF6C00" }
                : styles.button
            }
            onPress={handleSendSubmit}
          >
            <Text
              style={
                picture
                  ? { ...styles.buttonTitle, color: "#fff" }
                  : styles.buttonTitle
              }
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    justifyContent: "space-between",

    // alignItems: "center",
  },
  cameraContainer: {
    marginBottom: 8,
    borderRadius: 8,
    // borderWidth: 1,
    // borderRadius: 8,
  },
  camera: {
    // borderRadius: 8,
    // borderWidth: 1,
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "E8E8E8",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 8,
  },
  cameraWrapper: {
    backgroundColor: "#ffffff4D",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  takenPictureContainer: {
    marginRight: 40,
    position: "absolute",
    left: 0,
    top: 0,
    width: 100,
    height: 80,
  },
  inputDescription: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
    height: 50,
    marginTop: 32,
  },
  locationContainer: {
    flexDirection: "row",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    height: 50,
    marginTop: 32,
  },
  inputLocation: {
    paddingLeft: 28,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    top: 10,
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  button: {
    // marginHorizontal: 16,
    marginTop: 32,
    // marginBottom: 16,
    height: 51,
    backgroundColor: "#F6F6F6",
    // backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    textAlign: "center",
  },
  deleteBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 22,
    marginTop: 120,
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
