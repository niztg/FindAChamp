/**
 * Camera Screen Component
 *
 * This component allows the user to capture images using the device camera.
 */

import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons/faCircleDot";
import { faRepeat } from "@fortawesome/free-solid-svg-icons/faRepeat";

const CameraScreen = ({
  navigation,
  image,
  setImage,
  setscreenComp,
  setAsset,
}) => {
  // State variables
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // Function to take a picture with the camera
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null); //[2]
      setImage(data.uri);
      const asset = await MediaLibrary.createAssetAsync(data.uri); // [3]
      setAsset(asset);
      setscreenComp("image");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"16:9"}
        />{" "}
        {/*[2]*/}
        <View style={[styles.backContainer, styles.imageIconContainer]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              size={40}
              style={styles.icon}
            />{" "}
            {/*[1]*/}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => takePicture()}>
            <FontAwesomeIcon icon={faCircleDot} style={styles.icon} size={50} />{" "}
            {/*[1]*/}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <FontAwesomeIcon icon={faRepeat} style={styles.icon} size={30} />{" "}
            {/*[1]*/}
          </TouchableOpacity>
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
});
export default CameraScreen;

/*
Bibliography
[1] Icons - Expo Documentation, https://docs.expo.dev/guides/icons/ 
[2] “Camera,” Expo Documentation, https://docs.expo.dev/versions/latest/sdk/camera/  
[3] “MediaLibrary,” Expo Documentation, https://docs.expo.dev/versions/latest/sdk/media-library/ 
 
*/
