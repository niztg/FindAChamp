import { View, Text } from "react-native";


import {React, useState, useEffect} from 'react';
import Account from "./screens/Accounts";
import Plaza from "./screens/Plaza"
import NotesScreen from "./screens/NotesScreen";

export default function App (){
    const user = 5269507;
    
    const [data, setData] = useState([])
    useEffect(() => {
      fetch(`https://find-a-champ-working-version.onrender.com/finds/get/${String(user)}`).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
        }
      )
    }, [])
  return(
    <View>
      <NotesScreen user={user} slides={data}/>
    </View>
  );
  
};