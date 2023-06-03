//*! Dashboard.js v1.0 June 1 2023

import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function Dashboard({ navigation }) {
  const logout = () => {
  	navigation.navigate('StartScreen');
  }
  // const camera = () => {
  //   	navigation.navigate('TakeImage');
  //   }

  return (
    <Background>
      <Logo />
      <Header>Be a CHAMP</Header>
      <Paragraph>
        What's up mfs, welcome to find a champ: helping junkies find shrooms since circa '23!
      </Paragraph>
      <Button
        mode="outlined" onPress={logout} style={{marginTop: 10 }}> Log Out </Button>
        {/* <Button
        mode="outlined" onPress={camera} style={{marginTop: 10 }}> Camera </Button> */}
    </Background>
  );
};
