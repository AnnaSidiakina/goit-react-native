import { View, Text, StyleSheet, Image } from "react-native";

export default function PostsScreen() {
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
          <Text style={styles.name}>Name</Text>
          <Text>Email</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
});
