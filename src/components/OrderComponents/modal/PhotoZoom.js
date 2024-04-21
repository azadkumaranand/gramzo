import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const PhotoZoom = ({
  visible,
  handlemodalChange,
  item,
  productDetails,
  urlindex,
}) => {
  const [index, setIndex] = useState(urlindex);

  useEffect(() => {
    setIndex(urlindex);
  }, [urlindex]);

  const hanldeLeft = () => {
    setIndex(index - 1);
  };

  const handleRight = () => {
    setIndex(index + 1);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handlemodalChange}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.5}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.63)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.Modal_Conatiner}>
          <View
            style={{
              position: "absolute",
              zIndex: 2222,
              top: 10,
              right: 10,
            }}
          >
            <TouchableOpacity
              style={styles.RightPart}
              onPress={handlemodalChange}
            >
              <Entypo name="cross" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: "absolute",
              zIndex: 2222,
              bottom: 10,
              right: (Dimensions.get("screen").width - 100) / 2,
            }}
          >
            <View style={styles.RightPart}>
              <Text>{index + 1}</Text>
            </View>
          </View>

          {index > 0 && (
            <TouchableOpacity style={styles.LeftArrow} onPress={hanldeLeft}>
              <Entypo name="chevron-thin-left" size={30} color="#ffffff" />
            </TouchableOpacity>
          )}

          {index < item.length - 1 && (
            <TouchableOpacity style={styles.rightArrow} onPress={handleRight}>
              <Entypo name="chevron-thin-right" size={30} color="#ffffff" />
            </TouchableOpacity>
          )}

          <Image
            source={{
              uri: productDetails?.files?.length
                ? item[index]?.url
                : item[index]?.uri,
            }}
            style={styles.RatingImage}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal_Conatiner: {
    borderRadius: 13,
    height: Dimensions.get("screen").height - 320,
    width: Dimensions.get("screen").width - 25,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  RatingImage: {
    height: Dimensions.get("screen").height - 320,
    width: Dimensions.get("screen").width - 25,
    borderRadius: 5,
    objectFit: "cover",
  },

  RightPart: {
    backgroundColor: "#9fa3a6",
    borderRadius: 9999,
    width: 50,
    height: 50,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  LeftArrow: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: "absolute",
    backgroundColor: "#5f6363",
    left: 0,
    zIndex: 999,
    top: (Dimensions.get("screen").height - 320) / 2,
  },
  rightArrow: {
    paddingHorizontal: 5,
    backgroundColor: "#5f6363",
    paddingVertical: 5,
    position: "absolute",
    right: 0,
    zIndex: 999,
    top: (Dimensions.get("screen").height - 320) / 2,
  },
});
export default PhotoZoom;
