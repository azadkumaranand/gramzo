import React, { useState } from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import fonts from "@const/fonts";

const CustomRating = ({ rating, size, gap, color }) => {
  const [selectedRating, setSelectedRating] = useState(rating);
  const [half, setHalf] = useState(selectedRating % 1 !== 0);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const starColor = i <= selectedRating ? color : "#CCCCCC";

    stars.push(
      <View key={i} style={{ marginRight: i < 5 ? gap : 0 }}>
        {i - selectedRating === 0.5 && (
          <FontAwesome5 name="star-half-alt" size={size} color={color} />
        )}
        {i - selectedRating !== 0.5 && (
          <AntDesign name="star" size={size} color={starColor} />
        )}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {stars}
      <Text
        style={{
          paddingHorizontal: 10,
          fontSize: 12,
          fontFamily: fonts.PRIMARY_FONT_400,
          color: "rgba(156, 163, 175, 1)",
        }}
      >
        {selectedRating} star
      </Text>
    </View>
  );
};

const RatingBox = ({ ratings, size, gap, color }) => {
  const [rating, setRating] = useState(ratings);

  const handleRatingPress = (newRating) => {
    console.log("Rating is: " + newRating);
    setRating(newRating);
  };

  return (
    <View
      style={{
        width: 250,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "rgba(217, 217, 217, 0.3)",
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomRating rating={rating} size={size} gap={gap} color={color} />
    </View>
  );
};

export default RatingBox;
