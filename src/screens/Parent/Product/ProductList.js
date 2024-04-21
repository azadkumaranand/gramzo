import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductListHeader from "@/ProductScreens/ProductListHeader";
import fonts from "@const/fonts";
import ProductTopTab from "./ProductTopTab";
import { textStyle } from "@const/fonts";
import { useNavigation } from "@react-navigation/native";
import { getProducts } from "@rdx/ProductSlice";
import colors from "@const/colors";

const ProductList = () => {
  const navigation = useNavigation();

  const [slectedOption, setslectedOption] = useState("All");

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.vendor.user);

  useEffect(() => {
    dispatch(getProducts());
    // console.log("called");
  }, []);

  const handleTopButton = (type) => {
    setslectedOption(type);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.PRIMARY_BACKGROUND_COLOR }}
    >
      <ProductListHeader
        handleNavigation={() => navigation.navigate("Nortificaion")}
      />

      <View style={styles.stockTabs}>
        <Pressable
          style={[
            styles.stockBtn,
            {
              backgroundColor: slectedOption == "All" ? "#FB7D13" : "#FFFFFF",
              borderWidth: slectedOption == "All" ? 0 : 1,
            },
          ]}
          onPress={() => handleTopButton("All")}
        >
          <Text
            style={[
              styles.tabText,
              { color: slectedOption == "All" ? "#fff" : "#555555" },
            ]}
          >
            All
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.stockBtn,
            {
              backgroundColor:
                slectedOption == "InStock" ? "#FB7D13" : "#FFFFFF",
              borderWidth: slectedOption == "InStock" ? 0 : 1,
            },
          ]}
          onPress={() => handleTopButton("InStock")}
        >
          <Text
            style={[
              styles.tabText,
              { color: slectedOption == "InStock" ? "#fff" : "#555555" },
            ]}
          >
            In Stock
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.stockBtn,
            {
              backgroundColor:
                slectedOption == "OutForStock" ? "#FB7D13" : "#FFFFFF",
              borderWidth: slectedOption == "OutForStock" ? 0 : 1,
            },
          ]}
          onPress={() => handleTopButton("OutForStock")}
        >
          <Text
            style={[
              styles.tabText,
              { color: slectedOption == "OutForStock" ? "#fff" : "#555555" },
            ]}
          >
            Out For Stock
          </Text>
        </Pressable>
      </View>

      <View style={styles.ProductTab}>
        <ProductTopTab selected={slectedOption} />
      </View>

      <TouchableOpacity
        style={styles.AddButton}
        onPress={() => {
          // console.log("pressed");
          // navigation.navigate("Coupan");
          navigation.navigate("ProductEditModal", {
            Edit: false,
            product: {},
          });
        }}
      >
        <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#FFFFFF")}>
          + Add Item
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AddButton: {
    backgroundColor: "#4D952B",
    position: "absolute",
    bottom: 110,
    borderRadius: 8,
    width: 110,
    alignSelf: "center",
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  ProductTab: {
    flex: 1,
  },
  stockTabs: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: "auto",
    marginTop: 24,
    marginBottom: 15,
  },
  stockBtn: {
    width: "25%",
    height: 30,
    fontSize: 13,
    lineHeight: 29,
    fontFamily: fonts.PRIMARY_FONT_500,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#555555",
  },
  tabText: {
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 13,
  },
});

export default ProductList;
