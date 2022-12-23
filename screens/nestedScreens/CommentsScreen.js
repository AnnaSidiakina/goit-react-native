import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { getName, getUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const postId = route.params.item.id;
  const picture = route.params.item.picture;
  const currentUserName = route.params.item.name;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(null);
  const name = useSelector(getName);
  const item = route.params.item;

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const date = new Date().toLocaleString();
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, name, date });
    setComment("");
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .set({ ...item, commentsCount: allComments.length + 1 });
  };

  const getAllComments = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.postsContainer}> */}
      <View style={{ height: 240, marginBottom: 32 }}>
        <Image
          source={{ uri: picture }}
          style={{ height: 240, borderRadius: 8 }}
        />
      </View>
      <View style={styles.postsContainer}>
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            currentUserName === item.name ? (
              <View style={styles.commentsContainer}>
                <View
                  style={{
                    ...styles.commentText,
                    marginRight: 16,
                    borderTopLeftRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      color: "#212121",
                      fontSize: 13,
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    {item.comment}
                  </Text>
                  <View>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>
                <View>
                  <Text>{item.name}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.commentsContainer}>
                <View>
                  <Text>{item.name}</Text>
                </View>

                <View
                  style={{
                    ...styles.commentText,
                    marginLeft: 16,
                    borderTopRightRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      color: "#212121",
                      fontSize: 13,
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    {item.comment}
                  </Text>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )
          }
        />
      </View>
      {/* </View> */}
      <KeyboardAvoidingView
        style={{ position: "absolute", left: 16, right: 16, bottom: 16 }}
        behavior="position"
      >
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Leave a comment..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={setComment}
          ></TextInput>
          <TouchableOpacity style={styles.sendBtn} onPress={createComment}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  postsContainer: { paddingBottom: 320 },
  commentsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },

  commentText: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    // width: "100%",
    padding: 16,

    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,

    // width: "100%",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 10,
    marginTop: 8,
  },
  inputSection: {
    // position: "relative",
    // bottom: 0,
    // marginBottom: 40,
    // paddingVertical: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 60,
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },
  sendBtn: {
    position: "absolute",
    bottom: 8,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
});
