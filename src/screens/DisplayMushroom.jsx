import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
const DisplayMushroom = ({ route, navigation, id }) => {
  const { asset, mushroomType } = route.params;
  const [comment, setComment] = useState("");
  console.log(id);
  const handleSubmit = () => {
    const date = String(Date());
    const addNoteRequest = axios.post(
      "https://find-a-champ-working-version.onrender.com/notes/add",
      {
        content: comment,
        author: id,
        url: asset.uri,
        date: date,
      }
    );

    const addFindRequest = axios.post(
      "https://find-a-champ-working-version.onrender.com/finds/add",
      {
        species: mushroomType.type,
        url: asset.uri,
        id: id,
        found: date,
      }
    );

    axios
      .all([addNoteRequest, addFindRequest])
      .then((responses) => {
        // Handle the responses here
        console.log("Note and find added successfully");
        navigation.navigate("Plaza");
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error adding note and find:", error);
      });
  };

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
