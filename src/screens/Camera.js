/**
 * Camera Main Screen Component
 *
 * This component handles the camera functionality and image capture.
 */

import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import ImageTaken from "../components/ImageTaken";
import CameraScreen from "../components/CameraScreen";

export default function CameraMainScreen({ navigation }) {
  // State variables
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [screenComp, setscreenComp] = useState("camera");
  const [asset, setAsset] = useState(null);
  const [mushroomType, setMushroomType] = useState(null);

  // Request camera and media permissions on component mount
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted"); //[1],[2]

      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaStatus.status === "granted"); // [1],[3]
    })();
  }, []);

  // Render component based on permissions and screenComp state
  if (hasCameraPermission === false) {
    return <Text>No Access To Camera</Text>;
  } else if (hasMediaPermission === false) {
    return <Text>No Access To Media</Text>;
  }

  if (screenComp === "camera") {
    return (
      <CameraScreen
        image={image}
        navigation={navigation}
        setImage={setImage}
        setscreenComp={setscreenComp}
        setAsset={setAsset}
      />
    );
  } else if (screenComp === "image") {
    return (
      <ImageTaken
        image={image}
        setscreenComp={setscreenComp}
        asset={asset}
        setMushroomType={setMushroomType}
        navigation={navigation}
        mushroomType={mushroomType}
      />
    );
  }
}

/*
[1] “PermissionsAndroid · REACT NATIVE,” React Native RSS, https://reactnative.dev/docs/permissionsandroid (accessed Jun. 10, 2023). 
[2] “Camera,” Expo Documentation, https://docs.expo.dev/versions/latest/sdk/camera/ (accessed Jun. 10, 2023). 
[3] “MediaLibrary,” Expo Documentation, https://docs.expo.dev/versions/latest/sdk/media-library/ (accessed Jun. 10, 2023). 

*/
