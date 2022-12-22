// import { Ionicons } from "@expo/vector-icons";
// import { Fontisto } from "@expo/vector-icons";
// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import db from "../../firebase/config";

// export default function DefaultPostsScreen({ navigation }) {
//   const [posts, setPosts] = useState([]);

//   const getAllPosts = async () => {
//     await db
//       .firestore()
//       .collection("posts")
//       .onSnapshot((data) =>
//         setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//       );
//   };

//   useEffect(() => {
//     getAllPosts();
//   }, []);
//   console.log("posts", posts);

//   return (
//     <View style={styles.container}>
//       <View style={styles.userWrapper}>
//         <View style={styles.imageWrapper}>
//           <Image
//             style={styles.avatar}
//             resizeMode="cover"
//             source={require("../../assets/images/avatar.jpg")}
//           />
//         </View>
//         <View>
//           <Text style={styles.name}>Name</Text>
//           <Text>Email</Text>
//         </View>
//       </View>
//       <View>
//         <FlatList
//           data={posts}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.postsContainer}>
//               <View>
//                 <Image
//                   source={{ uri: item.picture }}
//                   style={{ height: 240, borderRadius: 8 }}
//                 />
//               </View>
//               <View style={styles.descriptionWrapper}>
//                 <Text style={styles.descriptionText}>{item.description}</Text>
//               </View>

//               <View style={styles.commentsLocationWrapper}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate("Comments", {
//                       postId: item.id,
//                       picture: item.picture,
//                     });
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Fontisto
//                       name="comment"
//                       size={20}
//                       color="#BDBDBD"
//                       style={styles.icon}
//                     />
//                     <Text style={styles.commentsNumber}>0</Text>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate("Map", {
//                       location: item.location,
//                     });
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Ionicons
//                       style={styles.icon}
//                       name="location-outline"
//                       size={24}
//                       color="#BDBDBD"
//                     />
//                     <Text style={styles.locationText}>{item.place}</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 32,
//     paddingBottom: 100,
//     backgroundColor: "#fff",
//   },
//   userWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingBottom: 32,
//   },
//   imageWrapper: {
//     // borderRadius: 16,
//     marginRight: 8,
//     // backgroundColor: "transparent",
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 16,
//   },
//   name: {
//     fontFamily: "RobotoBold",
//     fontSize: 13,
//   },
//   email: {
//     fontFamily: "RobotoRegular",
//     fontSize: 11,
//   },
//   postsContainer: {
//     marginBottom: 32,
//   },
//   descriptionWrapper: {
//     marginTop: 8,
//   },
//   descriptionText: {
//     color: "#212121",
//     fontFamily: "RobotoBold",
//     fontSize: 16,
//   },
//   commentsLocationWrapper: {
//     marginTop: 11,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   commentsNumber: {
//     color: "#BDBDBD",
//     fontFamily: "RobotoMedium",
//     fontSize: 16,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   locationText: {
//     color: "#212121",
//     fontFamily: "RobotoMedium",
//     fontSize: 16,
//   },
// });
