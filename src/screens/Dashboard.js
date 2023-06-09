//*! Dashboard.js v1.0 June 1 2023

// temp homescreen for testing purposes

import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

// child navigation
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
        What's up champs, welcome to Find a Champ: helping avid nature enjoyers find mushrooms since circa '23!
      </Paragraph>
      <Button
        mode="outlined" onPress={logout} style={{marginTop: 10 }}> Log Out </Button>
        {/* <Button
        mode="outlined" onPress={camera} style={{marginTop: 10 }}> Camera </Button> */}
    </Background>
  );
};
