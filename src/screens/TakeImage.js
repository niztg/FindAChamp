// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text } from "react-native";
// import { Camera } from "react-native-camera";
// import ImagePicker from "react-native-image-picker";

// import styles from "./components/styles";

// import ImageTaken from "./helpers/ImageTaken";
// import CameraScreen from "./helpers/CameraScreen";
// import DisplayMushroom from "./helpers/DisplayMushroom";

// export default function TakeImage() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [image, setImage] = useState(null);
//   const [screenComp, setscreenComp] = useState("camera");
//   const [asset, setAsset] = useState(null);
//   const [mushroomType, setMushroomType] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestCameraPermissions();
//       setHasCameraPermission(cameraStatus === "authorized");
//     })();
//   }, []);

//   const handleImageCapture = () => {
//     const options = {
//       mediaType: "photo",
//       quality: 1,
//       includeBase64: true,
//     };

//     ImagePicker.launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log("Image capture cancelled");
//       } else if (response.error) {
//         console.log("Image capture error:", response.error);
//       } else {
//         const imageData = response.base64;
//         const source = { uri: `data:image/jpeg;base64,${imageData}` };
//         setImage(source);
//         setscreenComp("image");
//       }
//     });
//   };

//   if (hasCameraPermission === false) {
//     return <Text>No Access To Camera</Text>;
//   }

//   if (screenComp === "camera") {
//     return (
//       <CameraScreen
//         handleImageCapture={handleImageCapture}
//         setscreenComp={setscreenComp}
//       />
//     );
//   } else if (screenComp === "image") {
//       return (
//         <ImageTaken
//           image={image}
//           setscreenComp={setscreenComp}
//           asset={asset}
//           setMushroomType={setMushroomType}
//         />
//       );
//     } else if (screenComp === "mushroom") {
//       return <DisplayMushroom mushroomType={mushroomType} asset={asset} />;
//     }
//   }
