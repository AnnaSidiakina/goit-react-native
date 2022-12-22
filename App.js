import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <Main />
      </View>
    </Provider>
  );
}
// <AuthStack.Navigator>
//   <AuthStack.Screen
//     options={{
//       headerShown: false,
//     }}
//     name="Signin"
//     component={SignIn}
//   />
//   <AuthStack.Screen
//     options={{
//       headerShown: false,
//     }}
//     name="Signup"
//     component={SignUp}
//   />
//   <AuthStack.Screen
//     options={{
//       headerShown: false,
//     }}
//     name="Home"
//     component={Home}
//   />
// </AuthStack.Navigator>;
