/**
 * Display Mushroom Component
 *
 * This component displays the captured mushroom image, mushroom type, and allows the user to add a note.
 */

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";

const DisplayMushroom = ({ route, navigation, id }) => {
  // Extract parameters from the route
  const { asset, mushroomType } = route.params;

  // State variables
  const [comment, setComment] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    const date = String(Date());

    // Send a request to add a note [1]
    const addNoteRequest = axios.post(
      "https://find-a-champ-working-version.onrender.com/notes/add",
      {
        content: comment,
        author: id,
        url: asset.uri,
        date: date,
      }
    );

    // Send a request to add a find [1]
    const addFindRequest = axios.post(
      "https://find-a-champ-working-version.onrender.com/finds/add",
      {
        species: mushroomType.type,
        url: asset.uri,
        id: id,
        found: date,
      }
    );

    // Send both requests in parallel [2]
    axios
      .all([addNoteRequest, addFindRequest])
      .then((responses) => {
        navigation.navigate("Plaza");
      })
      .catch((error) => {
        console.error("Error adding note and find:", error);
      });
  };

  // Adjust probability value if it's 100%
  if (mushroomType.prob === 100) {
    mushroomType.prob = 99;
  }

  return (
    <View style={[styles.container, styles.primary]}>
      <View style={[styles.MushroomImageParent]}>
        <Image
          source={{ uri: asset.uri }}
          style={[styles.displayMushroomImage]}
        />
      </View>

      <View style={styles.mushroomTitle}>
        <Text style={styles.titles}>{mushroomType.type}</Text>
        <Text style={styles.titles}>
          Percent likelihood: {mushroomType.prob}
        </Text>
      </View>

      <View>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Add note..."
          value={comment}
          onChangeText={setComment}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Add note"
            onPress={handleSubmit}
            color="#4D7C91"
            style={styles.submitButton}
          />
        </View>
      </View>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 9 / 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 30,
  },
  icon: {
    color: "#78909c",
  },
  backContainer: {
    marginTop: 40,
    marginLeft: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
  imageIconContainer: {
    position: "absolute",
    zIndex: 2,
  },
  nextContainer: {
    bottom: 0,
    right: 0,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 50,
    backgroundColor: "rgba(0,0,0,0.01)",
  },
  nextIconContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginTop: 5,
  },
  next: {
    textAlign: "center",
    color: "#FFF",
  },
  displayMushroomImage: {
    marginTop: 15,
    aspectRatio: 9 / 16,
    width: "70%",
    borderColor: "#78909C",
    borderWidth: 2,
  },
  MushroomImageParent: {
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#E6d6B6",
  },
  mushroomTitle: {
    marginTop: 10,
    marginLeft: 30,
    alignItems: "flex-start",
  },
  titles: {
    fontSize: 20,
  },
  textArea: {
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 8,
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
    marginLeft: 30,
  },
  submitButton: {
    borderRadius: 10,
  },
});

export default DisplayMushroom;

/*
Bibliography

[1] “Getting started,” Getting Started |&nbsp;Axios Docs, https://axios-http.com/docs/intro
[2] Z0q et al., “How to post multiple axios requests at the same time?,” Stack Overflow, https://stackoverflow.com/questions/61385454/how-to-post-multiple-axios-requests-at-the-same-time (accessed Jun. 10, 2023). 
*/
