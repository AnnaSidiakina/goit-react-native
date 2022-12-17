// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import SignUp from "./screens/auth/RegistrationScreen";
import SignIn from "./screens/auth/LoginScreen";
import Home from "./screens/mainScreens/Home";

SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();

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
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Signin"
            component={SignIn}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Signup"
            component={SignUp}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      </View>
    </NavigationContainer>
  );
}
