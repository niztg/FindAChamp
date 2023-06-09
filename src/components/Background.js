//*! Background.js v1.0 June 1 2023

import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default function Background({ children }) {
  return (
    <ImageBackground
    //background image
      source={require('../assets/gradient.png')}
      style={styles.background}
    >
    {/* //auto adjust when keyboard appears */}
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

//styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
