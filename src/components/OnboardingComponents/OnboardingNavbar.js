import { View, Text, StyleSheet } from "react-native";
import colors from "@const/colors";
import Subtitle from "../Subtitle";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OnboardingNavbar = ({ lable }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <AntDesign name="arrowleft" style={{ paddingHorizontal: 5 }} size={25} color="#fff" onPress={() => navigation.goBack()} />
      <Subtitle>{lable}</Subtitle>
    </View>
  );
};

export default OnboardingNavbar;
const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // position: 'absolute',
    backgroundColor: colors.HEADER_GREEN_COLOR,
    width: "100%",
    height: 90,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
