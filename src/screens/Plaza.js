import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import Navbar from "../components/Navbar";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import HomeImages from "../components/HomeImages";
import Line from "../components/Line";
const HEIGHT = Dimensions.get("window").height;
const IMAGE = { uri: "https://i.imgur.com/9pJlwyq.png" };

export default function Plaza({ navigation, id }) {
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
      .then((res) => res.json())
      .then((data2) => {
        console.log(data, data2, "shippopu");
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
  console.log("damn boy", data, data2);
  if (data.length === 0) {
    console.log("negative");
  } else {
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
        <ScrollView>
          <View>
            <Text style={styles.title_text}>
              Good morning, {data["account_name"]}.
            </Text>
          </View>
          {data2 && data2.length > 0 && (
            <HomeImages user={data["account_name"]} images={data2} />
          )}
          <Line />
        </ScrollView>
        <Navbar navigation={navigation} />
      </View>
    );
  }
}

// stylesheets

const styles = StyleSheet.create({
  title_text: {
    fontSize: 40,
    includeFontPadding: true,
    fontWeight: "bold",
    padding: 30,
    paddingBottom: 5,
    paddingTop: HEIGHT - 0.95 * HEIGHT,
    color: "#493003",
  },
});
