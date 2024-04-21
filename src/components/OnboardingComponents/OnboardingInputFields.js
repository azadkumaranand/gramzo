import { Text, TextInput, View, StyleSheet } from "react-native";
import colors from "@const/colors";
import fonts from "@const/fonts";
import Paragraph from "../Paragraph";

const OnboardingInputFields = ({ name, width, height, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <Paragraph color="#344054">{name}</Paragraph>
      <TextInput
        style={[styles.inputField, { width: width, height: height }]}
        {...props}
      />
    </View>
  );
};

export default OnboardingInputFields;

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    fontFamily: fonts.PRIMARY_FONT_400,
    borderColor: colors.INPUT_BORDER_COLOR,
    borderRadius: 50,
    marginTop: 12,
    marginBottom: 12,
    color: "black",
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
