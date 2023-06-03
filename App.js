import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import styles from "./styles/styles";

import ImageTaken from "./components/ImageTaken";
import CameraScreen from "./components/CameraScreen";
import DisplayMushroom from "./components/DisplayMushroom";
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [screenComp, setscreenComp] = useState("camera");
  const [asset, setAsset] = useState(null);
  const [mushroomType, setMushroomType] = useState(null);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaStatus.status === "granted");
      console.log(hasMediaPermission);
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No Access To Camera</Text>;
  } else if (hasMediaPermission === false) {
    return <Text>No Access To Media</Text>;
  }
  if (screenComp === "camera")
    return (
      <CameraScreen
        image={image}
        setImage={setImage}
        setscreenComp={setscreenComp}
        setAsset={setAsset}
      />
    );
  else if (screenComp === "image")
    return (
      <ImageTaken
        image={image}
        setscreenComp={setscreenComp}
        asset={asset}
        setMushroomType={setMushroomType}
      />
    );
  else if (screenComp === "mushroom")
    return <DisplayMushroom mushroomType={mushroomType} asset={asset} />;
}
