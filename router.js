import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUp from "./screens/auth/RegistrationScreen";
import SignIn from "./screens/auth/LoginScreen";
import Home from "./screens/mainScreens/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
};
