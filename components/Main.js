import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUp from "../screens/auth/RegistrationScreen";
import SignIn from "../screens/auth/LoginScreen";
import Home from "../screens/mainScreens/Home";
import { getStateChange } from "../redux/auth/selectors";

const AuthStack = createNativeStackNavigator();

export default function Main() {
  const stateChange = useSelector(getStateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      {stateChange ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
}
