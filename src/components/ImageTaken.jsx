/*
 Component for displaying the taken image and handling actions related to it.
*/
import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ImageTaken = ({
  navigation,
  image,
  setscreenComp,
  asset,
  setMushroomType,
  mushroomType,
}) => {
  const AddToAlbum = async () => {
    // Creates an album in the device's media library and adds the taken image to it

    MediaLibrary.createAlbumAsync("Expo", asset)
      .then(() => {
        console.log("Album created");
      })
      .catch((error) => {
        console.log("Error: ", error);
      }); // [1]
    sendRequest();
  };
  const sendRequest = async () => {
    /* Sends a post api request to the machine learning api with the image taken, waits for a response and records the mushroom species type and the probability */
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    axios
      .post("http://IP ADDRESS:5000/mushroom", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        response = response;
        data = response.data.probabilities;
        let highestValue = -1;
        let highestKey = "";
        for (const key in data) {
          if (data[key] > highestValue) {
            highestValue = data[key];
            highestKey = key;
          }
        }
        setMushroomType({ type: highestKey, prob: highestValue });
        if (mushroomType !== null) {
          navigation.navigate("DisplayMushroom", {
            asset: asset,
            mushroomType: mushroomType,
          });
        }
      })
      .catch((error) => {
        console.log("err", JSON.stringify(error));
      }); // [2]
  };
  return (
    <View style={styles.container}>
      <View style={[styles.backContainer, styles.imageIconContainer]}>
        <TouchableOpacity
          onPress={() => {
            setscreenComp("camera");
          }}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            size={40}
            style={styles.icon}
          />{" "}
          {/*[3]*/}
        </TouchableOpacity>
      </View>
      <Image source={{ uri: image }} style={styles.fixedRatio} />
      <View style={[styles.nextContainer, styles.imageIconContainer]}>
        <View style={styles.nextIconContainer}>
          <TouchableOpacity
            onPress={() => {
              AddToAlbum();
            }}
          >
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              size={40}
              style={styles.icon}
            />{" "}
            {/*[3]*/}
          </TouchableOpacity>
        </View>

        <Text style={styles.next}>Next</Text>
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
});
export default ImageTaken;

/*
Bibliography
[1] “MediaLibrary,” Expo Documentation, https://docs.expo.dev/versions/latest/sdk/media-library/ 
[2] “Getting started,” Getting Started |&nbsp;Axios Docs, https://axios-http.com/docs/intro
[3] Icons - Expo Documentation, https://docs.expo.dev/guides/icons/ 

*/
