import { 
  View, 
  SafeAreaView,
  Text, 
  StyleSheet, 
  Dimensions,
  ImageBackground

} from 'react-native'

import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import HomeImages from "../components/HomeImages"
import Line from "../components/Line"

const HEIGHT = Dimensions.get('window').height
const IMAGE = {uri: 'https://i.imgur.com/9pJlwyq.png'}

export default function Plaza(props){ 

const [data, setData] = useState([])

useEffect(() => {
  fetch(`https://find-a-champ-working-version.onrender.com/accounts/get/${String(props.user)}`).then(
    res => res.json()
  ).then(
    data => {
      setData(data)
    }
  )
}, [])  

const [dataa, setDataa] = useState([])
useEffect(() => {
  fetch(`https://find-a-champ-working-version.onrender.com/finds/get/${String(props.user)}`).then(
    res => res.json()
  ).then(
    dataa => {
      setDataa(dataa)
    }
  )
}, [])

if(data.length === 0 || dataa.length === 0){
  console.log('negative')
}
else{
  return (
    <View>
  <ImageBackground style={{flex: 1, justifyContent:'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={IMAGE} resizeMode='cover'/>
    <SafeAreaView>
      <ScrollView>
      <View><Text  style={styles.title_text} >Good morning, {data['account_name']}.</Text></View>
      <HomeImages user={data['account_name']} images={dataa}/>
      <Line/>
      </ScrollView>
    </SafeAreaView>
    </View>
  )
}
};

// stylesheets

const styles = StyleSheet.create({
  title_text: {
    fontSize: 40,
    includeFontPadding: true,
    fontWeight: 'bold',
    padding: 30, 
    paddingBottom: 5,
    paddingTop: HEIGHT-0.95*HEIGHT,
    color: "#493003",
  }
})