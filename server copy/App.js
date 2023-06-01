import { StyleSheet, View } from "react-native";


import React from 'react';
import Account from "./screens/Accounts";
import Plaza from "./screens/Plaza"
import NotesScreen from "./screens/NotesScreen";

export default function App (){
    const user = 5269507;

  return(
    <View>
      <Plaza user={user}/>
    </View>
  );
  
};