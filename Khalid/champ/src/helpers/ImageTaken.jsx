// import React from "react";
// import { Text, View, TouchableOpacity, Image } from "react-native";
// import { CameraRoll } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import styles from "./components/styles";
// import useModel from "../hook/useModel";

// const ImageTaken = ({ image, setscreenComp, asset, setMushroomType }) => {
//   const addToAlbum = async () => {
//     console.log("HI");
//     CameraRoll.save(image, { type: "photo" })
//       .then(() => {
//         console.log("Image saved to album");
//         console.log(asset);
//       })
//       .catch((error) => {
//         console.log("Error: ", error);
//       });
//     sendRequest();
//   };

//   const sendRequest = async () => {
//     const formData = new FormData();
//     formData.append("image", {
//       uri: image,
//       type: "image/jpeg",
//       name: "image.jpg",
//     });

//     axios
//       .post("My IP Address/mushroom", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then((response) => {
//         console.log(response.data.probabilities, "sk");
//         const data = response.data.probabilities;
//         let highestValue = -1;
//         let highestKey = "";
//         for (const key in data) {
//           if (data[key] > highestValue) {
//             highestValue = data[key];
//             highestKey = key;
//           }
//         }
//         console.log(highestKey, highestValue);
//         setMushroomType({ type: highestKey, prob: highestValue });
//         setscreenComp("mushroom");
//       })
//       .catch((error) => {
//         console.log("err", JSON.stringify(error));
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={[styles.backContainer, styles.imageIconContainer]}>
//         <TouchableOpacity onPress={() => setscreenComp("camera")}>
//           <FontAwesomeIcon icon={faArrowAltCircleLeft} size={40} style={styles.icon} />
//         </TouchableOpacity>
//       </View>
//       <Image source={{ uri: image }} style={styles.fixedRatio} />
//       <View style={[styles.nextContainer, styles.imageIconContainer]}>
//         <View style={styles.nextIconContainer}>
//           <TouchableOpacity onPress={addToAlbum}>
//             <FontAwesomeIcon icon={faArrowAltCircleRight} size={40} style={styles.icon} />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.next}>Next</Text>
//       </View>
//     </View>
//   );
// };

// export default ImageTaken;
