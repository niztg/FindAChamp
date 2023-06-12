import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
//import SQLite from 'react-native-sqlite-storage';
//import { fetch } from 'react-native-ssl-pinning';

// screen function
// child navigation
const LoginScreen = ({ navigation, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // login function (called later)
  const login = async () => {
    try {
      // api request
      const response = await fetch(
        "https://find-a-champ-working-version.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      // error handling
      const data = await response.json();
      //success from api
      if (data.message === "Login successful") {
        Alert.alert("Login successful");
        setId(data.account.id);
        // continues to homescreen
        navigation.navigate("Plaza");
      } else {
        // raises alert
        Alert.alert("Invalid email or password");
      }
    } catch (error) {
      // error logging
      console.error(error);
    }
  };

  return (
    // formatting
    <Background>
{/* return button */}
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back Champ-Seeker.</Header>
      <TextInput
      // text fields passed to api
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {/* login button */}
      <Button mode="contained" onPress={login} style={{ marginTop: 10 }}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

// styling
const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default LoginScreen;
