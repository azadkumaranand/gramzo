import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProductHeader from "@/ProductHeader";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import fonts, { textStyle } from "@const/fonts";
import SearchBox from "@/SearchBox";
import CheckBox from "@/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import DropdownDemo from "@/OnboardingComponents/DropdownDemo";
import {
  addSelectedProduct,
  fetchProductOfferings,
  addProductsFromOfferings,
} from "@rdx/ProductSlice";
import { list } from "firebase/storage";

// const ItemCatagerory = {
//   Sweet: ["Jaggery", "MangoPickle", "Amla", "Thekua"],
//   Spice: ["MysorePak", "DarjeelingTea", "Honey", "Saffron"]
// }

const cityData = [
  { label: "Sweet", value: "Sweet" },
  { label: "Spice", value: "Spice" },
];

const ProductSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const listedProduct = useSelector((state) => state.product.ProductListed);
  const [setcategory, setsetcategory] = useState("");
  const [addNewProduct, setaddNewProduct] = useState(true);
  const [newlistedProduct, setnewlistedProduct] = useState(false);
  const [newItem, setnewItem] = useState("");
  const [searchItem, setsearchItem] = useState("");
  const [selectedProductsCount, setselectedProductsCount] = useState(0);
 
  // console.log(JSON.stringify(listedProduct, null, 2));

  const toast = useToast();

  useEffect(() => {
    dispatch(fetchProductOfferings());
  }, []);

  const handleToast = (status) => {
    toast.show(`Item ${status} successfully`, {
      type: status == "Add" ? "success" : "danger",
      placement: "bottom",
      duration: 2000,
      offsetBottom: 100,
      animationType: "zoom-in",
    });
  };

  const selectItem = (item, category) => {
    const status = item.isChecked ? "Remove" : "Add";
    handleToast(status);
    if (status === "Add") {
      setselectedProductsCount(selectedProductsCount + 1);
    } else if (status === "Remove" && selectedProductsCount > 0) {
      setselectedProductsCount(selectedProductsCount - 1);
    }
    // console.log(item, category);
    dispatch(
      addSelectedProduct({
        item: item,
        isChecked: !item.isChecked,
        category: category,
      })
    );
  };

  const addNewCategory = () => {
    setnewlistedProduct(!newlistedProduct);
  };

  const onhandleTextChange = () => {
    setsearchItem("");
  };

  const handleNewproduct = () => {
    let exists = false;
    if (setcategory && newItem) {
      Object.keys(listedProduct).map((category, index) =>
        listedProduct[category].map((item) => {
          if (item.name.toUpperCase() === newItem.toUpperCase()) {
            exists = true;
            return alert("this product is already listed in item");
          }
          // item.name.toUpperCase() == newItem.toUpperCase()
          //   ? setaddNewProduct(false)
          //   : setaddNewProduct(true);
        })
      );
      if (exists) return;
      dispatch(
        addSelectedProduct({
          category: setcategory,
          addNewProduct: addNewProduct,
          item: {
            id: listedProduct[setcategory].length + 1,
            _id: listedProduct[setcategory].length + 1,
            name: newItem,
            category: setcategory,
            isChecked: true, // Assuming the default value should be true
          },
        })
      );
      setselectedProductsCount(selectedProductsCount + 1);
      setnewlistedProduct(false);
      setnewItem("");
    } else {
      alert("Please fill all details about the product.");
    }
  };
  const user = useSelector((state) => state.vendor.user);

  const saveProducts = () => {
    var newlisted = [];
    for (const key in listedProduct) {
      if (listedProduct[key].length > 0) {
        listedProduct[key].map((item) => {
          if (item.isChecked === true) {
            newlisted.push({
              name: item.name,
              category: item.category,
              // id: item._id,
            });
          }
        });
      }
    }
    // console.log(newlisted, user._id);
    if (newlisted.length > 0) {
      dispatch(addProductsFromOfferings(newlisted, user._id));
      navigation.navigate("ParentScreen", {
        screen: "Products",
      });
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ProductHeader selectedProductsCount={selectedProductsCount} />

      <ScrollView>
        {newlistedProduct ? (
          <>
            <View style={styles.newProduct}>
              <TextInput
                placeholder="Enter Name"
                style={styles.newProductInput}
                value={newItem}
                onChangeText={setnewItem}
              />

              <DropdownDemo
                item={cityData}
                dropdown_type="category"
                handleChange={setsetcategory}
                catagory={true}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleNewproduct}
              >
                <Text
                  style={textStyle(
                    14,
                    fonts.PRIMARY_FONT_600,
                    "rgba(255, 255, 255, 1)"
                  )}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.AfterHeader}>
            <SearchBox
              value={searchItem}
              onChangeText={setsearchItem}
              iconChange={searchItem.length > 0 ? true : false}
              onhandleTextChange={onhandleTextChange}
            />

            {!(searchItem.length > 0) && (
              <View style={styles.selectproduct}>
                {Object.keys(listedProduct).map((category, index) => (
                  <View key={category} style={styles.checkbox}>
                    {listedProduct[category]
                      .filter((item) => item.isChecked)
                      .map((product, index) => (
                        <CheckBox
                          key={index}
                          label={product.name}
                          isChecked={product.isChecked}
                          onClick={() => selectItem(product, category)}
                        />
                      ))}
                  </View>
                ))}
              </View>
            )}

            {searchItem.length > 0 ? (
              <View style={styles.productContainer}>
                {Object.keys(listedProduct).map((category, index) => (
                  <View key={category} style={styles.checkbox}>
                    {listedProduct[category]
                      .filter((item) =>
                        item.name
                          .toUpperCase()
                          .includes(searchItem.toUpperCase())
                      )
                      .map((filteredItem) => (
                        <CheckBox
                          key={filteredItem.name + filteredItem._id}
                          label={filteredItem.name}
                          isChecked={filteredItem.isChecked}
                          onClick={() => selectItem(filteredItem, category)}
                        />
                      ))}
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.productContainer}>
                {Object.keys(listedProduct).map((category, index) => (
                  <View key={category} style={styles.checkbox}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    {listedProduct[category]
                      .filter((item) => !item.isChecked)
                      .map((product, index) => (
                        <CheckBox
                          key={index}
                          label={product.name}
                          isChecked={product.isChecked}
                          onClick={() => selectItem(product, category)}
                        />
                      ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerOtherProd}>
          <View style={{ alignItems: "center" }}>
            <CheckBox
              label={""}
              onClick={addNewCategory}
              isChecked={newlistedProduct}
            />
          </View>

          <View>
            <Text style={styles.footerText}>Other Product</Text>
            <Text style={styles.footerText}>
              (Can’t find the name of products here)
            </Text>
          </View>
        </View>
        {selectedProductsCount > 0 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={styles.footerProdCount}>
              {selectedProductsCount} Products drafted in your list{" "}
            </Text>
            <TouchableOpacity style={styles.saveBtn} onPress={saveProducts}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: fonts.PRIMARY_FONT_500,
                  // lineHeight: 20,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  AfterHeader: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  checkbox: {
    gap: 5,
  },
  productContainer: {
    paddingHorizontal: 15,
    // marginTop: 10,
  },
  selectproduct: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  categoryTitle: {
    color: "#555555",
    fontSize: 18,
    fontFamily: fonts.PRIMARY_FONT_600,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    marginBottom: 2,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
    paddingVertical: 18,
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
    // backgroundColor: "red",
    backgroundColor: "rgba(255, 255, 255, 1)",
    zIndex: 9999,
  },
  footerOtherProd: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerProdCount: {
    color: "#68BA3C",
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 15,
    lineHeight: 20,
    width: 130,
  },
  saveBtn: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    // alignItems:"center",
    // justifyContent:"center",
    // width:60,
    // height:20,
    backgroundColor: "#68BA3C",
    borderRadius: 4,
  },
  newProduct: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 15,
    marginTop: 30,
  },
  newProductInput: {
    width: 100,
    // height: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "rgba(147, 144, 143, 1)",
    borderRadius: 3,
    height: 36,
    fontSize: 14,
    fontFamily: "Mukta-400",
    color: "rgba(147, 144, 143, 1)",
  },
  catagory: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(147, 144, 143, 1)",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 4,
    backgroundColor: "rgba(104, 186, 60, 1)",
  },
  footerText: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
    color: "#333",
  },
});

export default ProductSelection;
