import React, {useState} from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Dimensions, 
  SafeAreaView, 
  Image, 
  TextInput, 
  ImageBackground, 
  Alert,
  Button
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Line from '../components/Line'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

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
    
    function date(date_str) {
      d = new Date(date_str);
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    const IMAGE = {uri: 'https://i.imgur.com/9pJlwyq.png'}

export default function NotesScreen() {
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
    <ImageBackground style={{flex: 1, justifyContent:'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={IMAGE} resizeMode='cover'/>
    <ScrollView style={styles.whole}>
        <SafeAreaView style={{flex: 1, height: HEIGHT}}>
            <Text style={styles.title_text}>Notes</Text>
          <View style={styles.ovr_wrap}>
            <ScrollView 
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={true}
            pagingEnabled
            horizontal
            style={styles.wrap}>
              {
                notes.map((e, index) => <Image key={e['url']} resizeMode='cover' style={styles.wrap} source={{uri: e['url']}}/>)
              }
            </ScrollView>
          </View>
            <View style={{flexDirection:'column', alignItems:'flex-start', top:10, paddingLeft:25}}>
            <Text style={{color: '#493003', alignSelf: 'flex-start'}}>{date(obj['date'])}</Text>
            <Text style={{fontWeight: 'bold', color: '#493003', paddingBottom: HEIGHT-0.98*HEIGHT}}>{obj['content']}</Text>            
            <TextInput placeholder='Enter your note! (Max 500 characters)' placeholderTextColor='gray' style={{backgroundColor: 'white', borderRadius: 10, top: 10, height: HEIGHT-0.7*HEIGHT, marginBottom: 10, padding: 15, paddingTop: 15, width: WIDTH-WIDTH*0.15, alignSelf:'flex-start',}} numberOfLines={12} multiline={true} editable={true} maxLength={500}/>
            <Button title="Save Note!" color="#493003" borderRadius={10}/>
          </View>
        </SafeAreaView>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    whole: {
        height: HEIGHT,
        width: WIDTH,
        color: '#493003',
      },
      title_text: {
        fontSize: 35,
        includeFontPadding: true,
        padding: 20, 
        paddingTop: HEIGHT-0.93*HEIGHT,
        paddingBottom: 5,
        color: "#493003",
        fontWeight:'bold'
      },
      
      wrap: {
        width: WIDTH-WIDTH*0.15, 
        height: HEIGHT * 0.25,
        paddingTop: 5,
        borderRadius: 20,
        alignSelf: 'center'
      },
  
      ovr_wrap: {
        width: WIDTH,
        height: 0.25*HEIGHT
      }
})