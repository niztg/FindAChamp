import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableHighlight,
    Button,
    ImageBackground,
  } from 'react-native'
  
  import React, {useState} from 'react';
  import { ScrollView } from 'react-native-gesture-handler';

  import Line from "../components/Line"

import { SafeAreaView } from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const data = {
  account_name: "Mushroom father",
  dob: "1954-02-21T00:00:00",
  email: "mushroomite2@gmail.ca",
  id: 5269507,
  password: "c8afeec4e9d29fa6307bc246965fe136a95bc47a9cfdedba0df256358eaa45ec0bf8d7a4333a4b13dc9a5508137d0f4d212272b27e64e41d4745a66b5f480759"
};

const notes = [
{
  author: 5269507,
  content: "This is one red mushroom!",
  date: "2023-05-08T05:23:16.902662",
  url: "https://cdn.britannica.com/90/236590-050-27422B8D/Close-up-of-mushroom-growing-on-field.jpg"
},
{
  author: 5269507,
  content: "Wow",
  date: "2013-08-09T05:23:16.902662",
  url: "https://cdn.britannica.com/86/237086-050-3F816C87/mushroom-cultivation-farm.jpg"
},
{
  author: 5269507,
  content: "I am at a loss for words.",
  date: "2003-11-19T05:23:16.902662",
  url: "https://static.scientificamerican.com/sciam/cache/file/B0A32197-970A-43DE-803CAD57373C78D6.jpg"
}
]

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

const IMAGE = {uri: 'https://i.imgur.com/9pJlwyq.png'}

function date(date_str) {
  d = new Date(date_str);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
  
export default function Account(props){  
  const [img, setimg] = useState(0);

obj = notes[img]

  onchange = (nativeEvent) => {
    if(nativeEvent){
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== img && slide < notes.length){
        setimg(slide)
      }
    }
  }

    return (
      <View>
        <ImageBackground style={{flex: 1, justifyContent:'center', width: WIDTH, height: HEIGHT}} source={IMAGE} resizeMode='cover'/>
      <View style={styles.whole}>
        <ScrollView>
        <View style={{flexDirection:'row', paddingTop: HEIGHT-0.9*HEIGHT}}>
          <Text style={styles.title_text}>{data['account_name']}</Text>
          <Text paddingTop={42.5} style={{color:'#493003', fontStyle:'italic'}}>{data['id']}</Text>
        </View>

        <View style={{flexDirection:'column', padding:20, paddingTop: 5, paddingLeft: 30}}>
          <Text style={{color:'#493003', fontSize:20}}>{data['email']}</Text>
        </View>

        <Line/>

        <SafeAreaView style={{flex: 1, height: HEIGHT/2, elevation:100000}}>
          <Text style={styles.title_text}>
            Your finds ({notes.length})
          </Text>
          <View style={styles.ovr_wrap}>
            <ScrollView 
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={true}
            pagingEnabled
            horizontal
            style={styles.wrap}
            >
              {
                notes.map((e, index) => <Image key={e['url']} resizeMode='cover' style={styles.wrap} source={{uri: e['url']}}/>)
              }
            </ScrollView>
          </View>
            <View style={{flexDirection:'column', alignItems:'flex-start', top:10, paddingLeft:25}}>
            <Text style={{color: '#493003', alignSelf: 'flex-start'}}>{date(obj['date'])}</Text>
            <Text style={{fontWeight: 'bold', color: '#493003'}}>{obj['content']}</Text>
          </View>
        </SafeAreaView>
        <Line/>
        </ScrollView>
      </View>
      </View>
    )
  };
  
  // stylesheets
  
  const styles = StyleSheet.create({
    whole: {
      height: HEIGHT,
      width: WIDTH,
      color: '#493003',
      paddingTop: HEIGHT-0.97*HEIGHT
    },
  
    title_text: {
      fontSize: 30,
      includeFontPadding: true,
      padding: 30,
      paddingBottom: 5,
      color: "#493003",
      fontWeight:'bold'
    },
    
    wrap: {
      width: WIDTH-50, 
      height: HEIGHT * 0.25,
      paddingTop: 5,
      borderRadius: 20,
      alignSelf: 'center',
      shadowColor:"black", shadowOffset: {width: 0, height: 1}, shadowOpacity:0.8, shadowRadius: 0.5, backgroundColor:"#0000"
    },

    ovr_wrap: {
      width: WIDTH,
      height: 0.25*HEIGHT,
        }
  })