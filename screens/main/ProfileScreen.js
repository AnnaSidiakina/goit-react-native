import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Add from "../../assets/images/add.svg";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBgr}
        source={require("../../assets/images/imageBgr.png")}
        resizeMode="cover"
      >
        <View style={styles.formBgr}>
          <View style={styles.avatar}>
            <Add style={styles.addButton} width={25} height={25}></Add>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.logoutIcon}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>Anna Sidiakina</Text>
          <View style={styles.form}></View>
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
    alignItems: "center",
    marginTop: 147,
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
  logoutIcon: {
    position: "absolute",
    top: 0,
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
});
