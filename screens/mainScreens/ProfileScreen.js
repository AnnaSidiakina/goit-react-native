import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import {
  authSignOutUser,
  authChangeUserAvatar,
} from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getName, getAvatar } from "../../redux/auth/selectors";
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import Add from "../../assets/images/add.svg";
import db from "../../firebase/config";

import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const userId = useSelector(getUserId);
  const userName = useSelector(getName);
  const userAvatar = useSelector(getAvatar);
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewAvatar(result.assets[0].uri);
    }
  };

  const uploadPictureToServer = async () => {
    try {
      const response = await fetch(newAvatar);
      const file = await response.blob();
      const uniqueAvatarId = uuid.v4();
      await db.storage().ref(`avatar/${uniqueAvatarId}`).put(file);

      const processedPicture = await db
        .storage()
        .ref("avatar")
        .child(uniqueAvatarId)
        .getDownloadURL();
      return processedPicture;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      const avatar = await uploadPictureToServer();
      dispatch(authChangeUserAvatar({ avatar }));
      Alert.alert("Your avatar has been added");
      setNewAvatar(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadLikes = async (item) => {
    let likes = item.likes ? item.likes + 1 : 0 + 1;
    await db
      .firestore()
      .collection("posts")
      .doc(item.id)
      .set({ ...item, likes });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBgr}
        source={require("../../assets/images/imageBgr.png")}
        resizeMode="cover"
      >
        <View style={styles.formBgr}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.avatar}>
              {newAvatar ? (
                <Image
                  source={{ uri: newAvatar }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              ) : (
                <Image
                  source={{ uri: userAvatar }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              )}
              {newAvatar ? (
                <TouchableOpacity onPress={handleSubmit}>
                  <AntDesign
                    style={styles.addButton}
                    name="checkcircleo"
                    size={24}
                    color="#439A97"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pickImage}>
                  <Add style={styles.addButton} width={25} height={25}></Add>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={signOut}
              activeOpacity={0.7}
              style={styles.logoutIcon}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.title}>{userName}</Text>
          </View>

          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postsContainer}>
                <View>
                  <Image
                    source={{ uri: item.picture }}
                    style={{ height: 240, borderRadius: 8 }}
                  />
                </View>
                <View style={styles.descriptionWrapper}>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                </View>

                <View style={styles.commentsLocationWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comments", {
                        item,
                      });
                    }}
                  >
                    <View style={{ flexDirection: "row", marginRight: 27 }}>
                      <Fontisto
                        name="comment"
                        size={20}
                        color="#BDBDBD"
                        style={styles.icon}
                      />
                      <Text style={styles.commentsNumber}>
                        {item.commentsCount ? item.commentsCount : 0}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity onPress={() => uploadLikes(item)}>
                      <AntDesign
                        name="like2"
                        size={24}
                        color="#FF6C00"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.commentsNumber}>
                      {item.likes ? item.likes : "0"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Map", {
                        location: item.location,
                      });
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        style={styles.icon}
                        name="location-outline"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.locationText}>{item.place}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
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
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,

    // alignItems: "center",
    marginTop: 147,
  },
  avatar: {
    position: "absolute",
    top: -150,
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
  logoutIcon: {
    position: "absolute",
    top: -90,
    right: 0,
    marginTop: 24,
    marginRight: 19,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontWeight: "normal",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    // marginTop: 92,
  },
  postsContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  descriptionWrapper: {
    marginTop: 8,
  },
  descriptionText: {
    color: "#212121",
    fontFamily: "RobotoBold",
    fontSize: 16,
  },
  commentsLocationWrapper: {
    // flex: 1,
    marginTop: 11,
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  commentsNumber: {
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  locationText: {
    color: "#212121",
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },
});
