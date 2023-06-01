import { Component } from "react";
import React from "react";
import { 
    View, 
    SafeAreaView,
    Text, 
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableOpacity,
    ImageBackground

  } from 'react-native'
  
  const WIDTH = Dimensions.get('window').width
  const HEIGHT = Dimensions.get('window').height

  const IMAGE = {uri: 'https://i.imgur.com/9pJlwyq.png'}

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

  function option(list, n){
    if (n !== list.length-1){
      return n+1;
    }
    else{
      return 0;
    }
  };

  function date(date_str) {
    d = new Date(date_str);
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }



class HomeImages extends Component {

    images = [
        {
            url: "https://cdn.britannica.com/90/236590-050-27422B8D/Close-up-of-mushroom-growing-on-field.jpg", 
            species: "Mushrooms.", 
            found: "2023-05-08T05:23:16.902662"
        }, 
        {
            url: "https://cdn.britannica.com/86/237086-050-3F816C87/mushroom-cultivation-farm.jpg", 
            species: "Da white ones", 
            found: "2013-08-09T05:23:16.902662"
          },
          {
            url: "https://static.scientificamerican.com/sciam/cache/file/B0A32197-970A-43DE-803CAD57373C78D6.jpg",
            species: "butterfly mushrooms",
            found: "2003-11-19T05:23:16.902662"
          }
    ]

    current = 0
    state = {
        url: this.images[this.current]['url'],
        name: this.images[this.current]['species'],
        date: this.images[this.current]['found']
    }
    
    change = () => {
        var n = option(this.images, this.current)
        this.setState({url: this.images[n]['url'], name: this.images[n]['species'], date: this.images[n]['found']});
        this.current=n;

    };
    
    render() {
        return (
            <SafeAreaView>
            <View style={{flexDirection: "column", flex: 1, elevation: 1000000}}>
                <TouchableOpacity style={styles.image} underlayColor="none" onPress={this.change}>
                        <Image style={{borderRadius: 25, alignItems: "center", justifyContent:"center"}} source={{
                        uri: this.state.url,
                        width: WIDTH-0.2*WIDTH,
                        height: HEIGHT-0.45*HEIGHT,
                        }}></Image>
                        <Text style={styles.text}>{this.state.name} | {date(this.state.date)}</Text>
              </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
};

export default HomeImages;

const styles = StyleSheet.create({
    image: {
        paddingBottom: 7.5,
        paddingTop: 15,
        borderRadius: 5,
        justifyContent: "center",
        paddingLeft: WIDTH - (0.90*WIDTH)
      },

    text: {
        color: '#493003',
        paddingLeft: WIDTH - (0.90*WIDTH),
        paddingTop: 5,
        paddingLeft: 10
      }
  })