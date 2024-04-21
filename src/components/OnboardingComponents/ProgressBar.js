import { View, Text, StyleSheet } from "react-native";
import colors from "@const/colors";
import Subtitle from "../Subtitle";
import fonts from "@const/fonts";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const ProgressBar = ({ progressOne, progressTwo, progressThree }) => {
  // const [checkOne, setcheckOne] = useState(false)
  // const [checkTwo, setcheckTwo] = useState(false)
  // const [checkThree, setcheckThree] = useState(false)
  // const [checkFour, setchecKFOur] = useState(false)

  const getBackgroundColor = (progress) => {
    if (progress === "done") {
      return colors.PRIMARY_GREEN_COLOR;
    } else if (progress === "onit") {
      return "#fff";
    } else if (progress === "not") {
      return "#fff";
    }
  };

  const getSubtitleColor = (progress) => {
    if (progress === "done") {
      return "#FFF";
    } else if (progress === "onit") {
      return "#000";
    } else if (progress === "not") {
      return "black";
    }
  };

  const getConnectionLineStyle = (progress) => {
    if (progress === "done") {
      return "solid";
    } else if (progress === "onit") {
      return "dashed";
    } else if (progress === "not") {
      return "dashed";
    }
  };

  const getConnectionLine = (progress) => {
    if (progress === "done") {
      return colors.PRIMARY_GREEN_COLOR;
    } else if (progress === "onit" || progress === "not") {
      return "#000";
    }
  };
  const getBorderColor = (progress) => {
    if (progress === "done") {
      return colors.PRIMARY_GREEN_COLOR;
    } else if (progress === "onit") {
      return "#000";
    } else if (progress === "not") {
      return "#999";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progressBox}>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressNumber,
                {
                  backgroundColor: getBackgroundColor(progressOne),
                  borderColor: getBorderColor(progressOne),
                  borderWidth: 1,
                },
              ]}
            >
              {getBackgroundColor(progressOne) ===
              colors.PRIMARY_GREEN_COLOR ? (
                <FontAwesome5 name="check" size={15} color="white" />
              ) : (
                <Text
                  style={[
                    styles.Subtitle,
                    { color: getSubtitleColor(progressOne) },
                  ]}
                >
                  1
                </Text>
              )}
            </View>

            <View
              style={[
                styles.progressLine,
                // {
                //   borderColor: getConnectionLine(progressOne),
                //   borderStyle: getConnectionLineStyle(progressOne),
                // },
              ]}
            ></View>
          </View>
        </View>
        <View style={styles.progressBox}>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressNumber,
                {
                  backgroundColor: getBackgroundColor(progressTwo),
                  borderColor: "#bbb",
                  borderWidth: 1,
                },
              ]}
            >
              {getBackgroundColor(progressTwo) ===
              colors.PRIMARY_GREEN_COLOR ? (
                <FontAwesome5 name="check" size={15} color="white" />
              ) : (
                <Text
                  style={[
                    styles.Subtitle,
                    { color: getSubtitleColor(progressTwo) },
                  ]}
                >
                  {progressTwo !== "onit" ? (
                    <AntDesign name="lock" size={25} color="#999" />
                  ) : (
                    "2"
                  )}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.progressLine,
                {
                  // borderColor: getConnectionLine(progressTwo),
                  // borderStyle: getConnectionLineStyle(progressTwo),
                },
              ]}
            ></View>
          </View>
        </View>
        <View style={styles.progressBox}>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressNumber,
                {
                  backgroundColor: getBackgroundColor(progressThree),
                  borderColor: getBorderColor(progressThree),
                  borderWidth: 1,
                },
              ]}
            >
              {getBackgroundColor(progressThree) ===
              colors.PRIMARY_GREEN_COLOR ? (
                <FontAwesome5 name="check" size={15} color="white" />
              ) : (
                <Text
                  style={[
                    styles.Subtitle,
                    { color: getSubtitleColor(progressThree) },
                  ]}
                >
                  {progressThree !== "onit" ? (
                    <AntDesign name="lock" size={25} color="#999" />
                  ) : (
                    "3"
                  )}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text
          style={[styles.step_name, { color: getBorderColor(progressOne) }]}
        >
          Basic Details
        </Text>
        <Text
          style={[styles.step_name, { color: getBorderColor(progressTwo) }]}
        >
          Store Address
        </Text>
        <Text
          style={[styles.step_name, { color: getBorderColor(progressThree) }]}
        >
          Documents
        </Text>
        {/* <Text style={styles.step_name}>Store Location</Text> */}
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomColor: colors.PRIMARY_GREEN_COLOR,
    borderBottomWidth: 1,
    backgroundColor: "white",
    paddingVertical: 18,
  },
  progressBar: {
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "row",
  },
  progressContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  step_name: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 12,
    lineHeight: 16,
    // color: "#333",
    textAlign: "center",
    // marginRight: 10,
    width: 115,
  },
  progressNumber: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.PRIMARY_GREEN_COLOR,
    height: 35,
    width: 35,
    borderRadius: 25,
    paddingVertical: 2,
    // paddingHorizontal: 12,
  },
  progressLine: {
    width: 95,
    height: 1,
    borderColor: "#BBBBBB",
    opacity: 0.3,
    borderWidth: 1,
  },

  bottom: {
    marginTop: 8,
    // display: "grid",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 12,
  },
  Subtitle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
