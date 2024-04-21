import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Accordian from "../../components/Accordian";
import Header from "../../components/Header";
import fonts from "../../constants/fonts";
import colors from "@const/colors";

const faqitems = [
  {
    boldtext: "How does GramZo work for vendors?",
    accordianContent: [
      "GramZo connects vendors with customers across India looking for authentic, organic, and homemade food products. As a vendor, you'll have a personalized storefront where you can list your products, manage orders, and track sales with our user-friendly dashboard.",
    ],
    status: "archieve",
  },
  {
    boldtext: "What types of products can I sell on GramZo?",
    accordianContent: [
      "We welcome a variety of products including organic, homemade sweets, traditional snacks, spices, and grains. Our focus is on promoting healthy, natural, and traditional Indian foods.",
    ],
    status: "archieve",
  },
  {
    boldtext: "Is there a fee to join GramZo as a vendor?",
    accordianContent: [
      "Joining GramZo as a vendor is free. We believe in supporting our vendors' growth without the barrier of entry fees. A nominal commission is charged on sales to cover operational costs.",
    ],
    status: "publish",
  },
  {
    boldtext: "What is the process for becoming a vendor on GramZo?",
    accordianContent: [
      "The process involves filling out an application form on our website or downloading our vendor app from playstore, submitting the required documentation for verification, and once approved, setting up your personalized storefront. Our team will guide you through each step.",
    ],
    status: "publish",
  },
  {
    boldtext: "Are there any resources available to help grow my sales?",
    accordianContent: [
      "Yes, we offer a range of resources including webinars, marketing tips, and analytics tools designed to help you understand customer preferences and boost your sales.",
    ],
    status: "publish",
  },
  {
    boldtext: "How does GramZo support sustainable practices?",
    accordianContent: [
      "We encourage eco-friendly packaging, support local sourcing to reduce carbon footprints, and promote organic and natural products. We also provide educational resources on sustainable practices for vendors.",
    ],
    status: "publish",
  },
];

const Faq = () => {
  const [clickedIndex, setClickedIndex] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = (index) => {
    setIsExpanded(!isExpanded);
    setClickedIndex(index);
  };

  return (
    <View style={styles.container}>
      <Header title="Frequently asked Questions" />
      <View style={styles.questionsContainer}>
        {faqitems.map((item, index) => {
          return (
            <View key={index} style={styles.quesCont}>
              <TouchableOpacity
                style={styles.questions}
                onPress={() => toggleAccordion(index)}
              >
                <Text style={[styles.mainHeading, { width: "95%" }]}>
                  {item.boldtext}
                </Text>
                <View style={{ paddingHorizontal: 5 }}>
                  <AntDesign
                    name={
                      isExpanded && clickedIndex == index ? "close" : "plus"
                    }
                    color="black"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 8 }}>
                <Accordian
                  isExpanded={isExpanded}
                  clickedIndex={clickedIndex}
                  index={index}
                  content={item.accordianContent}
                  separator={false}
                />
              </View>
            </View>
          );
        })}
        <View style={styles.contactContainer}>
          <Text style={styles.askQuery}>
            Didn’t find the answer you were looking for?
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonBox}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: fonts.PRIMARY_FONT_600,
                }}
              >
                Contact Us
              </Text>
              <AntDesign name="arrowright" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // backgroundColor: colors.SECONDARY_LIGHT_GREEN_COLOR,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
  questionsContainer: {
    marginTop: 32,
    paddingHorizontal: 22,
    gap: 15,
  },
  quesCont: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  questions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 15,
  },
  buttonBox: {
    backgroundColor: "#42AF10",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  mainHeading: {
    color: "#1B1816",
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 21,
  },
  askQuery: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
    fontFamily: fonts.PRIMARY_FONT_600,
    lineHeight: 24,
  },
});
