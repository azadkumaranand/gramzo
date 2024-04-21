import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CongratulationsImage from "@assets/congratulations.png";
import Paragraph from "@/Paragraph";
import PrimaryButton from "@/PrimaryButton";
import Subtitle from "@/Subtitle";
import colors from "@const/colors";
import CorrectIcon from "@assets/correct.png";
import RequirementIcon from "@assets/orange.png";

const CongratulationScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const type = params?.type || "vendor";
  const pressHandler = () => {
    navigation.navigate("PersonalDetails", { type });
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.SECONDARY_LIGHT_GREEN_COLOR} />
        <View style={styles.topContainer}>
          <Image
            source={CongratulationsImage}
            style={{ height: 218, width: 273, objectFit: "contain" }}
          />
          <View style={styles.txtContainer}>
            <Subtitle
              color={colors.PRIMARY_GREEN_COLOR}
              textAlignC={true}
              style={{ fontWeight: 700, fontSize: 18 }}
            >
              Congratulations 🎉
            </Subtitle>
            <Paragraph color="black" textAlignC={true} margin={10}>
              Only 4 steps, you can see the magic of your hand to India
            </Paragraph>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.stepsContainer}>
            <Subtitle color="black" textAlignC={false} margin={15}>
              4 Steps to get onboards
            </Subtitle>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <Image source={CorrectIcon} style={styles.correctIcon} />
                <Text style={styles.stepTxt}>Basic details</Text>
              </View>
              <View style={styles.step}>
                <Image source={CorrectIcon} style={styles.correctIcon} />
                <Text style={styles.stepTxt}>Home details</Text>
              </View>
            </View>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <Image source={CorrectIcon} style={styles.correctIcon} />
                <Text style={styles.stepTxt}>Address</Text>
              </View>
              <View style={styles.step}>
                <Image source={CorrectIcon} style={styles.correctIcon} />
                <Text style={styles.stepTxt}>Menu Setup</Text>
              </View>
            </View>
          </View>
          <View style={styles.requirementsContainer}>
            <Subtitle color="black" margin={15}>
              Get ready with 2 documents
            </Subtitle>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <Image source={RequirementIcon} style={styles.correctIcon} />
                <Text style={styles.stepTxt}>Aadhar Card</Text>
              </View>
              <View style={styles.step}>
                <Image source={RequirementIcon} style={styles.correctIcon} />
                <Text style={styles.stepTxt}>Pan Card</Text>
              </View>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={pressHandler}>Start Process</PrimaryButton>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CongratulationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  txtContainer: {
    marginVertical: 10,
    width: "70%",
  },
  bottomContainer: {
    // flex: 1,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    width: "100%",
    backgroundColor: colors.SECONDARY_LIGHT_GREEN_COLOR,
    justifyContent: "center",
    paddingHorizontal: 27,
    paddingVertical: 35,
    paddingBottom: 60,
    borderTopRightRadius: 19,
    borderTopLeftRadius: 19,
  },
  step: {
    alignItems: "center",
    flexDirection: "row",
    width: 120,
  },
  stepsList: {
    marginVertical: 12.5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stepTxt: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginHorizontal: 8,
  },
  requirementsContainer: {
    marginTop: 35,
    marginBottom: 25,
  },
  btnContainer: {
    alignItems: "center",
  },
  correctIcon: {
    width: 27,
    aspectRatio: 1,
  },
});
