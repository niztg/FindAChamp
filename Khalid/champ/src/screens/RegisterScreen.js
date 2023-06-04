import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
//import Auth0 from 'react-native-auth0';
//import SQLite from 'react-native-sqlite-storage';
var sha512 = require('js-sha512');

//const auth0Config = {
//  domain: "dev-2lijd8z8mrczim5h.us.auth0.com",
//  clientId: "DxY9zznu6ZY1jdPPACxzbXgBoFyMgRCq",
//};

//const auth0 = new Auth0(auth0Config);
//const db = SQLite.openDatabase({ name: 'accounts.db', createFromLocation: 1 });

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = async () => {
    try {
      const response = await fetch('https://find-a-champ-working-version.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Request Failed with status ' + response.status);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response content type: ' + contentType);
      }

      const data = await response.json();

      if (data.message === 'Email already exists') {
        Alert.alert('This email is already taken. Try another one.');
    } else {
		Alert.alert('You have been successfully registered');
		}
	} catch (error) {
      console.error(error);
      Alert.alert('Error. Please try again later!');
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
        Sign Up
      </Button>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
