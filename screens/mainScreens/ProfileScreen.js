import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Add from "../../assets/images/add.svg";
import { useState } from "react";

export default function ProfileScreen({ navigation }) {
  const [likeCount, setLikeCount] = useState(0);
  const countLikes = () => setLikeCount((prevLikeCount) => prevLikeCount + 1);
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
              <Add style={styles.addButton} width={25} height={25}></Add>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.logoutIcon}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.title}>Anna Sidiakina</Text>
          </View>

          <View style={styles.postsContainer}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#212121",
              }}
            >
              <Image
                // source={{ uri: item.picture }}
                style={{ height: 240, borderRadius: 8 }}
              />
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionText}>Description</Text>
            </View>

            <View style={styles.commentsLocationWrapper}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginRight: 27,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Comments");
                  }}
                >
                  <Fontisto
                    name="comment"
                    size={20}
                    color="#BDBDBD"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>0</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <TouchableOpacity onPress={countLikes}>
                  <AntDesign
                    name="like2"
                    size={24}
                    color="#FF6C00"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>{likeCount}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 4,
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    navigation.navigate("Map");
                  }}
                >
                  <Ionicons
                    style={styles.icon}
                    name="location-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.text}>Place</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#212121",
    fontFamily: "RobotoMedium",
    fontSize: 16,
  },
});
