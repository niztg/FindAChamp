// This file contains the Notes display screen
// NotesScreen.js v1.0

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput,
  ImageBackground,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/Navbar";

// device-specific height and width
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
// as mentioned in other files, this is necessary as js doesn't have the Gregorian calendar names for months built in.

// function to format the date string
function date_f(date_str) {
  d = new Date(date_str);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// background image
const IMAGE = { uri: "https://i.imgur.com/9pJlwyq.png" };

export default function NotesScreen({ navigation, id }) {
  /*properties in order:
    - data: notes data (contains notes)
    - data2: finds data (contains species)
    - img: index of scroll menu 
    - note: The note the user enters in the input textbox or the content of the given note in the scroll menu
    - date: the date of the given find in the scroll menu 
    */
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [img, setimg] = useState(0);

  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  // function which handles posting new notes.
  const insertContent = () => {
    fetch(
      `https://find-a-champ-working-version.onrender.com/edit/${String(
        id
      )}/${String(date)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
          body: JSON.stringify({ content: note }),
        },
      }
    ).then((resp) => resp.json());
  };

  // two API requests, one to notes and one to finds
  // configured such that if the requests turn up blank the user is assigned a placeholder value.
  useEffect(() => {
    fetch(
      `https://find-a-champ-working-version.onrender.com/notes/get/${String(
        id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length == 0) {
          setData([
            {
              content: "You do not have any notes. Start exploring!",
              url: "https://i.imgur.com/FbJd63q.jpg",
              author: id,
              date: Date(),
            },
          ]);
        } else {
          setData(data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://find-a-champ-working-version.onrender.com/finds/get/${String(
        id
      )}`
    )
      .then((res) => res.json())
      .then((data2) => {
        if (data2.length == 0) {
          setData2([
            {
              url: "https://i.imgur.com/FbJd63q.jpg",
              species: " Click camera and start exploring!",
              found: Date(),
              id: id,
            },
          ]);
        } else {
          setData2(data2);
        }
      });
  }, []);
  console.log("Data1", data, "Data2", data2);
  if (data.length === 0 || data2.length === 0) {
    console.log("negative");
  } else {
    obj = data[img];

    // sliding mechanics
    onchange = (nativeEvent) => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== img && slide < data.length) {
          setimg(slide);
          setNote(data[img]["content"]);
          setDate(data[img]["date"]);
        }
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: "center",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          source={IMAGE}
          resizeMode="cover"
        />
        <ScrollView
          style={styles.whole}
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        >
          <SafeAreaView>
            <Text style={styles.title_text}>Notes</Text>
            <View style={styles.ovr_wrap}>
              <ScrollView
                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={true}
                pagingEnabled
                horizontal
                style={styles.wrap}
              >
                {data.map((e, index) => (
                  <Image
                    key={e["url"]}
                    resizeMode="cover"
                    style={styles.wrap}
                    source={{ uri: e["url"] }}
                  />
                ))}
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                top: 10,
                paddingLeft: 25,
              }}
            >
              <Text style={{ color: "#493003", alignSelf: "flex-start" }}>
                {date_f(obj["date"])} | {data2[img]["species"]}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#493003",
                  paddingBottom: HEIGHT - 0.98 * HEIGHT,
                }}
              >
                {obj["content"]}
              </Text>

              <TextInput
                placeholder="Enter your note! (Max 500 characters)"
                placeholderTextColor="gray"
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  top: 10,
                  marginBottom: 10,
                  padding: 15,
                  paddingTop: 15,
                  width: WIDTH - WIDTH * 0.15,
                  alignSelf: "flex-start",
                }}
                numberOfLines={12}
                multiline={true}
                editable={true}
                maxLength={500}
                onChangeText={(text) => setNote(text)}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#493003",
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                  alignSelf: "flex-start",
                }}
                onPress={() => insertContent()}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Save Note!</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
        <Navbar navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whole: {
    color: "#493003",
  },
  title_text: {
    fontSize: 35,
    includeFontPadding: true,
    padding: 20,
    paddingTop: HEIGHT - 0.93 * HEIGHT,
    paddingBottom: 5,
    color: "#493003",
    fontWeight: "bold",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },

  wrap: {
    width: WIDTH - WIDTH * 0.15,
    height: HEIGHT * 0.25,
    paddingTop: 5,
    borderRadius: 20,
    alignSelf: "center",
  },

  ovr_wrap: {
    paddingTop: 10,
  },
});
