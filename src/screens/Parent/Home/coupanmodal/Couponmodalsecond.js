import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import colors from "@const/colors";
import PrimaryButton from "../../../../components/PrimaryButton";
import { AntDesign } from "@expo/vector-icons";
import CheckBox from "../../../../components/CheckBox";
import { useSelector } from "react-redux";

const Couponmodalsecond = ({
  productModalVisible,
  closePdModal,
  secondModalVisible,
  thirdModalVisible,
  firstModalVisible,
  data,
  setData,
  item,
}) => {
  const [slecetAll, setSelectAll] = useState(false);
  const product = useSelector((state) => state.product);
  let initialProducts = [];

  const [porducts, setProducts] = useState(initialProducts);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (item && item?.targetProducts) {
      product.products.map((prod) => {
        let boo = false;
        for (var id of item?.targetProducts) {
          if (id === prod._id) {
            boo = true;
          }
        }
        if (boo) {
          initialProducts.push({
            pid: prod._id,
            name: prod.product_name,
            isChecked: true,
          });
        } else
          initialProducts.push({
            pid: prod._id,
            name: prod.product_name,
            isChecked: false,
          });
      });
    } else {
      product.products.map((prod) => {
        initialProducts.push({
          pid: prod._id,
          name: prod.product_name,
          isChecked: false,
        });
      });
    }
    // console.log(initialProducts, item?.targetProducts);
    setErrorMsg("");
    setProducts(initialProducts);
  }, [item, productModalVisible]);
  // console.log(initialProducts, item?.targetProducts);
  // useEffect(() => {
  //   setProducts(initialProducts);
  // }, [productModalVisible]);
  // useEffect(() => {
  //   if (item) {
  //     // console.log(item.allowedOnProduct)
  //     editProducts = porducts.map((e) => {
  //       const matchedProduct = item.allowedOnProduct.find((element) => {
  //         return (
  //           element.name.trim().toLowerCase() == e.name.trim().toLowerCase()
  //         );
  //       });
  //       if (matchedProduct) {
  //         return {
  //           ...e,
  //           isChecked: true,
  //         };
  //       } else {
  //         return e;
  //       }
  //     });
  //     setProducts(editProducts);
  //   } else {
  //     console.log("item not found");
  //   }
  // }, [item]);

  const submitForm = () => {
    // const newData = porducts.filter((item) => {
    //   // console.log(item);
    //   return item.isChecked == true;
    // });
    let newData = [];
    porducts.map((prod) => {
      if (prod.isChecked === true) {
        newData.push(prod.pid);
      }
    });
    if (newData.length === 0) {
      return setErrorMsg("Select atleast 1 product");
    }
    // console.log("nss", newData);
    setErrorMsg("");
    setData((prev) => ({ ...prev, targetProucts: newData }));
    thirdModalVisible(true);
    secondModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={productModalVisible}
      onRequestClose={() => {
        secondModalVisible(!productModalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <ScrollView>
          <View style={styles.onboardingForm}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  color: "#404040",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  secondModalVisible(false);
                  firstModalVisible(true);
                }}
              >
                <AntDesign name="arrowleft" size={22} color="black" />
                <Text
                  style={{
                    fontFamily: fonts.PRIMARY_FONT_600,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    lineHeight: 28,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closePdModal}
                style={{
                  marginBottom: 10,
                  padding: 4,
                  borderRadius: 50,
                  backgroundColor: "#E3E3E3",
                }}
              >
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 0.8,
                borderStyle: "solid",
                borderColor: "#E5E7EB",
                marginTop: 20,
              }}
            ></View>
            <View style={{ marginTop: 15 }}>
              <CheckBox
                label="Select all products"
                isChecked={slecetAll}
                onClick={() => {
                  setSelectAll(!slecetAll);
                  const updatedProducts = porducts.map((item) => ({
                    ...item,
                    isChecked: !slecetAll,
                  }));
                  setProducts(updatedProducts);
                }}
              />
            </View>

            <View
              style={{
                borderWidth: 0.8,
                borderStyle: "solid",
                borderColor: "#E5E7EB",
              }}
            ></View>
            <View style={{ marginTop: 15 }}>
              {porducts.map((item, index) => {
                return (
                  <CheckBox
                    key={index}
                    label={item.name}
                    isChecked={item.isChecked}
                    onClick={() => {
                      const updatedProducts = [...porducts];
                      updatedProducts[index].isChecked =
                        !updatedProducts[index].isChecked;
                      setProducts(updatedProducts);
                    }}
                  />
                );
              })}
            </View>
            {errorMsg && (
              <Text
                style={{
                  color: "red",
                  paddingHorizontal: 15,
                  // marginTop: 20,
                  fontFamily: fonts.PRIMARY_FONT_500,
                }}
              >
                {errorMsg}
              </Text>
            )}
            <View style={[styles.btnContainer, { marginVertical: 15 }]}>
              <PrimaryButton width="100%" onPress={submitForm}>
                Next
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Couponmodalsecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    height: 125,
    width: "100%",
    padding: 24,
    backgroundColor: colors.HEADER_GREEN_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.PRIMARY_FONT_700,
    color: "rgba(255, 255, 255, 1)",
  },
  btnsContainer: {
    // gap: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    marginVertical: 16,
  },
  btnHeading: {
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 7,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
    color: "#555",
  },
  coupanContainer: {
    paddingHorizontal: 23,
  },
  addOffer: {
    color: "#93908F",
    borderWidth: 1,
    borderColor: "#93908F",
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 3,
    // backgroundColor: "red",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    marginVertical: 10,
  },
  coupanCard: {
    paddingHorizontal: 19,
    paddingTop: 20,
    marginBottom: 10,
  },
  cardLine1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBoldText: {
    color: "#555",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 15,
  },
  cardDateText: {
    color: "#93908F",
    fontSize: 13,
  },
  cardSaveText: {
    color: "#3ABD9E",
    fontSize: 13,
    paddingHorizontal: 34,
    // backgroundColor: 'red',
    marginVertical: 10,
  },
  cardLine3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EBFFEB",
  },
  button: {
    flexDirection: "row",
    width: "30%",
    paddingVertical: 15,
    // backgroundColor: 'red',
    justifyContent: "center",
  },
  onboardingForm: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: "5%",
    paddingVertical: 23,
    borderWidth: 4,
    borderColor: "white",
    borderStyle: "solid",
    borderRadius: 20,
  },
  twoInputFieldBox: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  halfinput: {
    flex: 1,
    width: "45%",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
