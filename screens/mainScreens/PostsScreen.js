import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import db from "../../firebase/config";
import { getName } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const userName = useSelector(getName);
  // const [likeCount, setLikeCount] = useState(0);
  // const countLikes = async (item) => {
  //   let likes = item.likes ? item.likes + 1 : 0 + 1;

  //   await db
  //     .firestore()
  //     .collection("posts")
  //     .doc(item.id)
  //     .set({ ...item, likes });
  // };

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={require("../../assets/images/avatar.jpg")}
          />
        </View>
        <View>
          <Text style={styles.name}>{userName}</Text>
          <Text>Email</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={posts}
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
                {/* <View
                  style={{
                    flexDirection: "row",
                    // flex: 1,
                  }} */}
                {/* > */}
                {/* <TouchableOpacity onPress={countLikes(item)}>
                    <AntDesign
                      name="like2"
                      size={24}
                      color="#FF6C00"
                      style={styles.icon}
                    />
                  </TouchableOpacity> */}
                {/* <Text style={styles.commentsNumber}>
                    {item.likes ? item.likes : "0"}
                  </Text>
                </View> */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 100,
    backgroundColor: "#fff",
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 32,
  },
  imageWrapper: {
    // borderRadius: 16,
    marginRight: 8,
    // backgroundColor: "transparent",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  name: {
    fontFamily: "RobotoBold",
    fontSize: 13,
  },
  email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
  },
  postsContainer: {
    marginBottom: 32,
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
    marginTop: 11,
    flexDirection: "row",
    justifyContent: "space-between",
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
