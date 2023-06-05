import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoginScreen } from "../screens";
const Navbar = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigateToScreen("NotesScreen")}
      >
        <Foundation name="clipboard-notes" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.middleTabButton}
        onPress={() => navigateToScreen("Plaza")}
      >
        <FontAwesome name="home" size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.middleTabButton}
        onPress={() => navigateToScreen("CameraMainScreen")}
      >
        <Entypo name="camera" size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigateToScreen("Account")}
      >
        <MaterialCommunityIcons name="account" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4D7C91",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: -5,
  },
  tabButton: {
    paddingBottom: 5,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  middleTabButton: {
    padding: 10,
  },
});

export default Navbar;
