/*
 Main App Component
 This component sets up the navigation and screens for the app.

 References:
 [1] React Native tutorial to understand concepts of react native
 [2] A StackNavigator tutorial to be able to manipulate routes to access different pages
 [3] A tutorial on how to pass props in StackNavigator
 [4] Flexbox tutorial for css
 */

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
  Plaza,
  Account,
  NotesScreen,
  CameraMainScreen,
  DisplayMushroom,
} from "./src/screens";

// parent navigator
const Stack = createStackNavigator();

export default function App() {
  // State to hold the user ID
  const [id, setId] = useState("");
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
/*
Bibliography
[1] Build and Deploy a React Native App | 2023 React Native Course Tutorial for Beginners. YouTube, 2023. 
[2] “React navigation,” React Navigation RSS, https://reactnavigation.org/docs/stack-navigator/
[3] “React navigation,” React Navigation RSS, https://reactnavigation.org/docs/params/ 
[4] T. V. Damme et al., “A complete guide to flexbox: CSS-tricks,” CSS, https://css-tricks.com/snippets/css/a-guide-to-flexbox/ (accessed Jun. 10, 2023). 
*/
