import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
} from "react-native";
import colors from "@const/colors";
import Subtitle from "../Subtitle";
import { Ionicons } from "@expo/vector-icons";
import Paragraph from "../Paragraph";
import GiftIcon from "@assets/Icons/gift2.png";
import LanguageIcon from "@assets/Icons/languageIcon.png";
import RBSheet from "react-native-raw-bottom-sheet";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import fonts from "@const/fonts";

const HomeScreenHeader = () => {
  // location and title will be from store
  const store = useSelector((state) => state.vendor.store);

  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);
  const refRBSheet = useRef();

  const languageHandler = () => {
    refRBSheet.current.open();
  };

  const offerHandler = () => {
    navigation.navigate("OfferScreen");
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: fonts.PRIMARY_FONT_500,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              {store?.store_name}
            </Text>
            <View style={styles.address}>
              <Ionicons
                name="location"
                color="white"
                style={{ marginRight: 5 }}
              />
              <Paragraph>{store?.address?.addressLine1}</Paragraph>
            </View>
          </View>
          <View style={styles.btnsContainer}>
            <Pressable style={styles.btn} onPress={languageHandler}>
              <Image source={LanguageIcon} style={{ width: 35, height: 35 }} />
            </Pressable>
            <Pressable style={styles.btn} onPress={offerHandler}>
              <Image source={GiftIcon} style={{ width: 35, height: 35 }} />
            </Pressable>
          </View>
        </View>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          animationType="slide"
          customStyles={{
            wrapper: {
              backgroundColor: "#000000AA",
            },
            container: {
              borderRadius: 30,
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <View style={styles.selectionModal}>
            <View style={styles.languageSelectionCheckBoxCard}>
              <View>
                <Subtitle
                  color={isSelected ? colors.INPUT_BORDER_COLOR : "black"}
                  textAlignC={false}
                >
                  Select Language
                </Subtitle>
              </View>
              <View
                style={[
                  styles.languageSelectionBox,
                  {
                    borderColor: isSelected
                      ? colors.ORANGE_SHADE
                      : colors.INPUT_BORDER_COLOR,
                  },
                ]}
              >
                <View>
                  <Subtitle color="black">English</Subtitle>
                  <Paragraph color={colors.NEUTRAL_TEXT}>
                    Friendly Communication
                  </Paragraph>
                </View>
                <BouncyCheckbox
                  size={25}
                  disabled={isSelected}
                  style={{ width: 40 }}
                  fillColor={colors.ORANGE_SHADE}
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: colors.INPUT_BORDER_COLOR }}
                  textStyle={{ color: "black", textDecorationLine: "none" }}
                  innerIconStyle={{
                    borderWidth: 1,
                    borderColor: colors.INPUT_BORDER_COLOR,
                  }}
                  onPress={(isChecked) => {
                    setIsSelected(isChecked);
                  }}
                />
              </View>
              <View
                style={[
                  styles.languageSelectionBox,
                  {
                    borderColor: isSelected
                      ? colors.ORANGE_SHADE
                      : colors.INPUT_BORDER_COLOR,
                  },
                ]}
              >
                <View>
                  <Subtitle color="black">हिंदी</Subtitle>
                  <Paragraph color={colors.NEUTRAL_TEXT}>
                    भारत की मातृभाषा
                  </Paragraph>
                </View>
                <BouncyCheckbox
                  size={25}
                  disabled={isSelected}
                  style={{ width: 40 }}
                  fillColor={colors.ORANGE_SHADE}
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: colors.INPUT_BORDER_COLOR }}
                  innerIconStyle={{
                    borderWidth: 1,
                    borderColor: colors.INPUT_BORDER_COLOR,
                  }}
                  onPress={(isChecked) => {
                    setIsSelected(isChecked);
                  }}
                />
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  header: {
    height: 125,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.HEADER_GREEN_COLOR,
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btn: {
    height: 35,
    marginHorizontal: 5,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: colors.PRIMARY_GREEN_COLOR,
  },
  languageSelectionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  selectionModal: {
    flex: 1,
    // justifyContent: 'flex-end'
  },
  languageSelectionCheckBoxCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
});
