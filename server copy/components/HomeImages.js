import { Component } from "react";
import React from "react";
import { 
    View, 
    SafeAreaView,
    Text, 
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableOpacity
  } from 'react-native'
  
  const WIDTH = Dimensions.get('window').width
  const HEIGHT = Dimensions.get('window').height

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
current = 0
state = {
    url: this.props.images[this.current]['url'],
    name: this.props.images[this.current]['species'],
    date: this.props.images[this.current]['found']
}

change = () => {
    var n = option(this.props.images, this.current)
    this.setState({url: this.props.images[n]['url'], name: this.props.images[n]['species'], date: this.props.images[n]['found']});
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