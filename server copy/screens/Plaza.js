import { 
    View, 
    SafeAreaView,
    Text, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    ImageBackground

  } from 'react-native'
  
  import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import HomeImages from "../components/HomeImages"
import Line from "../components/Line"

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const IMAGE = {uri: 'https://i.imgur.com/9pJlwyq.png'}
  
export default function Plaza(props){ 

  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`http://192.168.86.164:19000/accounts/get/${String(props.user)}`, {
      method: "GET"
    })
    .then(resp => resp.json())
    .then(account => {setData(account)})
  }, []) 

  console.log("data");
  
    return (
      <View>
    <ImageBackground style={{flex: 1, justifyContent:'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={IMAGE} resizeMode='cover'/>
      <SafeAreaView>
        <ScrollView>
        <View><Text  style={styles.title_text} >Good morning, {props.user}.</Text></View>
        <HomeImages user={props.user}/>
        <Line/>
        </ScrollView>
      </SafeAreaView>
      </View>
    )
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
     // backgroundColor: "#6f7690"
    }
  })