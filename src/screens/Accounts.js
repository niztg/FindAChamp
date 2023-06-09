// This file contains the Account screen
// Accounts.js v1.0

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";

import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/Navbar";
import Line from "../components/Line";

import { SafeAreaView } from "react-native-safe-area-context";

// Fetch width and height properties that are unique to device
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

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
// as js's `Date` object doesn't have a method that formats the integer value for month into its English equivalent we must use this

// background image
const IMAGE = { uri: "https://i.imgur.com/9pJlwyq.png" };

// formats date string
function date(date_str) {
  d = new Date(date_str);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function Account({ navigation, id }) {
  /*two API calls are made: one to the accounts route which fetches base account info. Another is made to the finds route to fetch info about the user's finds including the find's species but not notes*/
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://find-a-champ-working-version.onrender.com/accounts/get/${String(
        id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetch(
      `https://find-a-champ-working-version.onrender.com/finds/get/${String(
        id
      )}`
    )
    /*If data2 turns up blank, this means that the user has no finds associated with their user id. As such, we give them a placeholder find.*/
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

  /*img represents the index of the finds list. We use this in the scroll menu*/
  const [img, setimg] = useState(0);

  if (data.length === 0 || data2.length === 0) {
    /*if either request turns up blank, we recognize that the app may be taking time to perform the request so we wait for it for a bit*/
    console.log("negative");
  } else {
    /*sets the current image in the scroll menu to be the first item in the list as img's initial value is 0*/
    obj = data2[img];
    
    /*code which controls the sliding functionality*/
    onchange = (nativeEvent) => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== img && slide < data2.length) {
          setimg(slide);
        }
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: "center",
            width: WIDTH,
            height: HEIGHT,
          }}
          source={IMAGE}
          resizeMode="cover"
        />
        <View style={styles.whole}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                paddingTop: HEIGHT - 0.9 * HEIGHT,
              }}
            >
              <Text style={styles.title_text}>{data["account_name"]}</Text>
              <Text
                paddingTop={42.5}
                style={{ color: "#493003", fontStyle: "italic" }}
              >
                {data["id"]}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                padding: 20,
                paddingTop: 5,
                paddingLeft: 30,
              }}
            >
              <Text style={{ color: "#493003", fontSize: 20 }}>
                {data["email"]}
              </Text>
            </View>

            <Line />
            
                {/*Code which formats the menu itself.*/}
            <SafeAreaView style={{ flex: 1, height: HEIGHT / 2 }}>
              <Text style={styles.title_text}>Your finds ({data2.length})</Text>
              <View style={styles.ovr_wrap}>
                <ScrollView
                  onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                  showsHorizontalScrollIndicator={true}
                  pagingEnabled
                  horizontal
                  style={styles.wrap}
                >
                  {data2.map((e, index) => (
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

                  paddingLeft: 25,
                }}
              >
                <Text style={{ color: "#493003", alignSelf: "flex-start" }}>
                  {date(obj["found"])}
                </Text>
                <Text style={{ fontWeight: "bold", color: "#493003" }}>
                  Species: {obj["species"]}
                </Text>
                <Text style={{ fontStyle: "italic" }}>
                  Navigate to the notes tab to see notes about this find!
                </Text>
              </View>
            </SafeAreaView>
            <Line />
          </ScrollView>
          <Navbar navigation={navigation} />
        </View>
      </View>
    );
  }
}

// stylesheets

const styles = StyleSheet.create({
  whole: {
    width: WIDTH,
    color: "#493003",
  },

  title_text: {
    fontSize: 30,
    includeFontPadding: true,
    padding: 30,
    paddingBottom: 5,
    color: "#493003",
    fontWeight: "bold",
  },

  wrap: {
    width: WIDTH - 50,
    height: HEIGHT * 0.25,
    paddingTop: 5,
    borderRadius: 20,
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 0.5,
    backgroundColor: "#0000",
  },

  ovr_wrap: {
    width: WIDTH,
    height: 0.3 * HEIGHT,
  },
});
