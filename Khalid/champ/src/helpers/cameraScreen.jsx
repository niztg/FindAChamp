// import React, { useState, useRef } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { RNCamera } from "react-native-camera";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faCircleDot } from "@fortawesome/free-solid-svg-icons/faCircleDot";
// import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
// import { CameraRoll } from "react-native";

// import styles from "./components/styles";

// const CameraScreen = ({ setImage, setScreenComp }) => {
//   const cameraRef = useRef(null);
//   const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);


//       CameraRoll.save(data.uri, { type: "photo" });


//       setImage(data.uri);


//       setScreenComp("image");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <RNCamera
//           ref={cameraRef}
//           style={styles.fixedRatio}
//           type={cameraType}
//           ratio="16:9"
//         />
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={takePicture}>
//             <FontAwesomeIcon icon={faCircleDot} style={styles.icon} size={50} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => {
//               setCameraType((prevType) =>
//                 prevType === RNCamera.Constants.Type.back
//                   ? RNCamera.Constants.Type.front
//                   : RNCamera.Constants.Type.back
//               );
//             }}
//           >
//             <FontAwesomeIcon icon={faSyncAlt} style={styles.icon} size={30} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default CameraScreen;
