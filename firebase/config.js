import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBijOvjukXagBVuURlXvEfGgEW51T3IE-s",
  authDomain: "react-native-student.firebaseapp.com",
  projectId: "react-native-student",
  storageBucket: "react-native-student.appspot.com",
  messagingSenderId: "150876837086",
  appId: "1:150876837086:web:7487431760b66e63b59e4f",
  measurementId: "G-RKSQML6C1L",
};

// const firebaseApp = initializeApp(firebaseConfig);

// export default firebaseApp;
export default firebase.initializeApp(firebaseConfig);
