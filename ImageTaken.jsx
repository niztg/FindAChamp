import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "../styles/styles";
import useModel from "../hook/useModel";
const ImageTaken = ({ image, setscreenComp, asset, setMushroomType }) => {
  const AddToAlbum = async () => {
    console.log("HI");
    MediaLibrary.createAlbumAsync("Expo", asset)
      .then(() => {
        console.log("Album created");
        console.log(asset);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    sendRequest();
  };
  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    axios
      .post("http://192.168.50.187:5000/mushroom", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data.probabilities, "sk");
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
        console.log(highestKey, highestValue);
        setMushroomType({ type: highestKey, prob: highestValue });
        setscreenComp("mushroom");
      })
      .catch((error) => {
        console.log("err", JSON.stringify(error));
      });
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
          />
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
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.next}>Next</Text>
      </View>
    </View>
  );
};

export default ImageTaken;
