import React, { useState } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Plaza,
  Account,
  NotesScreen,
  CameraMainScreen,
  DisplayMushroom,
} from "./src/screens";

// parent navigator
const Stack = createStackNavigator();

export default function App() {
  const [id, setId] = useState("");
  console.log("id", id);
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen">
            {(props) => <LoginScreen {...props} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="Plaza">
            {(props) => <Plaza {...props} id={id} />}
          </Stack.Screen>
          <Stack.Screen name="NotesScreen">
            {(props) => <NotesScreen {...props} id={id} />}
          </Stack.Screen>
          <Stack.Screen name="Account">
            {(props) => <Account {...props} id={id} />}
          </Stack.Screen>
          <Stack.Screen name="CameraMainScreen" component={CameraMainScreen} />
          <Stack.Screen name="DisplayMushroom">
            {(props) => <DisplayMushroom {...props} id={id} />}
          </Stack.Screen>
          {/* <Stack.Screen name="TakeImage" component={TakeImage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
