import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { View, Image, Text } from 'react-native'

import { React } from 'react';

import Account from "./screens/Accounts";
import Plaza from "./screens/Plaza"
import NotesScreen from "./screens/NotesScreen";


Tab = createBottomTabNavigator();

export default function App (){
    const user = 371637209;

    return(
      <View>
        <Plaza user={user}/>
      </View>
  );
  
};