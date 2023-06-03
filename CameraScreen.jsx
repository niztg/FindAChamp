import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons/faCircleDot";
import { faRepeat } from "@fortawesome/free-solid-svg-icons/faRepeat";

import styles from "../styles/styles";

const CameraScreen = ({ image, setImage, setscreenComp, setAsset }) => {
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
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
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => takePicture()}>
            <FontAwesomeIcon icon={faCircleDot} style={styles.icon} size={50} />
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
            <FontAwesomeIcon icon={faRepeat} style={styles.icon} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;
