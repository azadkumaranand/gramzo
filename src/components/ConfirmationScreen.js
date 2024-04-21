import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import fonts, { textStyle } from "@const/fonts";

const ConfirmationScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (!params?.productSelection) return;

    const timeout = setTimeout(() => {
      navigation.replace("ParentScreen");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainBox}>
        <View style={styles.checkBox}>
          <Feather name="check" size={50} color="rgba(75, 167, 78, 1)" />
        </View>
        <Text style={styles.text}>Great work!</Text>
        {!params?.productSelection && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProductSelection")}
          >
            <Text style={styles.buttonText}>Add your products</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.SkipButton}
          onPress={() => navigation.navigate("ParentScreen")}
        >
          <Text style={textStyle(18, fonts.PRIMARY_FONT_500, "white")}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SkipButton: {
    borderBottomWidth: 1.5,
    borderColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "rgba(75, 167, 78, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBox: {
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  checkBox: {
    width: 88,
    height: 88,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 999999,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Mukta-500",
    fontSize: 23,
    color: "rgba(255, 255, 255, 1)",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: "Mukta-500",
    fontSize: 16,
    color: "rgba(75, 167, 78, 1)",
  },
});

export default ConfirmationScreen;
