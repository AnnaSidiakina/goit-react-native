import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.postsContainer}>
        <View style={{ height: 240, borderWidth: 1, borderColor: "#000" }}>
          <Image
            // source={{ uri: item.picture }}
            style={{ height: 240, borderRadius: 8 }}
          />
          <View style={styles.commentsContainer}></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  commentsContainer: {},
  text: {},
});
