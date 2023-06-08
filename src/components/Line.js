// This file is used in formatting a simple line for the account and home screens
// Line.js v1.0

import React from 'react'
import { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Dimensions } from 'react-native'

class Line extends Component {
    render() {
        return(        
            <SafeAreaView
                style={{
                borderBottomColor: '#493003',
                borderBottomWidth: StyleSheet.hairlineWidth+1.25,
                paddingTop:10, 
                borderRadius: 0.5,
                width: Dimensions.get('window').width - 85,
                alignSelf: 'center',
                }}
                />
          // from https://stackoverflow.com/questions/43380260/draw-horizontal-rule-in-react-native
          );
    };
};

export default Line;
