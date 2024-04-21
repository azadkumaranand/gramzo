import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import colors from "@const/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  add_update_coupon_api,
  delete_coupon_api,
  get_coupons_api,
  get_coupon_details_api,
  update_coupon_status,
} from "@func/api_functions";
import { getCoupons, getQuickCoupons } from "@rdx/CouponSlice";
import Loader from "../../../components/Loader";
import SuccessModal from "../../../components/userComplaint/SuccessModal";
import Header from "../../../components/Header";
import FirstModal from "./coupanmodal/Couponmodalfirst";
import SecondModal from "./coupanmodal/Couponmodalsecond";
import ThirdModal from "./coupanmodal/Couponthirdmodal";
import CoupanCard from "./CoupanCard";

const OfferScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [error_message, setError_message] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [targetCustomerModal, setTargetCustomerModal] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const [openDatePicker, setOpenDAtePicker] = useState(false);
  const [dateField, setDateField] = useState("");

  const [coupandata, setCouponData] = useState();
  const [coupandataLoaded, setCoupandataLoaded] = useState(true);

  const [itemForEdit, setItemForEdit] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);

  const vendor_id = useSelector((state) => state.vendor.user._id);
  const store_id = useSelector((state) => state.vendor.store._id);
  useEffect(() => {
    dispatch(getCoupons(store_id, vendor_id));
    dispatch(getQuickCoupons(store_id));
  }, []);
  const coupon = useSelector((state) => state.coupon);
  // console.log("aaaapge", coupon.quickCoupons);

  //open first coupon modal
  const openModal = (element) => {
    // setIsSuccessModalOpen(true);
    // setTargetCustomerModal(true);
    // setProductModalVisible(true);
    setItemForEdit(null);
    if (!element) {
      setModalVisible(true);
    } else {
      // console.log("lodad");
      setItemForEdit(element);
      setModalVisible(true);
    }
  };
  //close first modal
  const closeModal = () => {
    setItemForEdit(null);
    setData(null);
    setError_message("");
    setModalVisible(false);
  };
  //close second modal
  const closePdModal = () => {
    setItemForEdit(null);
    setData(null);
    setProductModalVisible(false);
  };
  //close third modal
  const closeTargetCustomer = () => {
    setItemForEdit(null);
    setData(null);
    setTargetCustomerModal(false);
  };

  const backHandler = () => {
    navigation.goBack();
  };
  const addHandler = () => {
    setIsVisble((prev) => !prev);
  };

  const hideCardHandler = () => {
    setIsVisble(false);
  };

  const HandleDateTimePickerModal = (type) => {
    setOpenDAtePicker(true);
    setDateField(type);
  };
  //fetch all coupons data

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const res = await get_coupons_api();
  //       setCouponData(res.coupons.reverse());
  //       setCoupandataLoaded(true);
  //     } catch (e) {
  //       console.log("fetch error: ", e);
  //     }
  //   };

  //   fetchdata();
  // }, []);

  // Add coupon data
  // useEffect(() => {
  //   const addcoupon = async () => {
  //     try {
  //       // console.log(data);
  //       setCoupandataLoaded(false);
  //       const res = await add_update_coupon_api(data);
  //       if (editEnabled) {
  //         setSuccessMessage("Coupon Updated!");
  //       } else {
  //         setSuccessMessage("Coupon Added!");
  //       }
  //       setItemForEdit(null);
  //       setData(null);
  //       setIsSuccessModalOpen(true);
  //       const rescoupon = await get_coupons_api();
  //       setCouponData(rescoupon.coupons.reverse());
  //       setCoupandataLoaded(true);
  //     } catch (e) {
  //       console.log("coupon error:", e);
  //     }
  //   };

  //   if (isSuccessModal) {
  //     addcoupon();
  //     setIsSuccessModal(false);
  //   }
  // }, [isSuccessModal]);

  const deleteCouponCard = async (id) => {
    setCoupandataLoaded(false);
    const res = await delete_coupon_api({ couponId: id });
    console.log(res);
    const rescoupon = await get_coupons_api();
    setCouponData(rescoupon.coupons.reverse());
    setCoupandataLoaded(true);
    // alert(res.message);
  };

  const headerBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          openModal(null);
        }}
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.PRIMARY_FONT_400,
            fontSize: 14,
          }}
        >
          Add Coupon
        </Text>
      </TouchableOpacity>
    );
  };

  const editCoupon = async (item) => {
    setItemForEdit(null);
    setItemForEdit(item);
    setEditEnabled(true);
    setModalVisible(true);
  };

  const updateStatus = async (id, value) => {
    const res = await update_coupon_status(id, value);
    const rescoupon = await get_coupons_api();
    setCouponData(rescoupon.coupons.reverse());
  };

  return (
    <View style={styles.container}>
      <Header title="Coupons" radious={true} headerBtn={headerBtn} />

      <View style={styles.btnsContainer}>
        <Text style={styles.btnHeading}>Add Quick Coupon</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {coupon?.quickCoupons?.map((item, index) => {
            return (
              <Pressable
                style={styles.addBtn}
                onPress={() => openModal(item)}
                key={index}
              >
                <Text style={styles.addOffer}>{item.couponCode}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FirstModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onClose={closeModal}
        secondModalVisible={setProductModalVisible}
        data={data}
        setData={setData}
        item={itemForEdit}
      />

      <SecondModal
        productModalVisible={productModalVisible}
        closePdModal={closePdModal}
        thirdModalVisible={setTargetCustomerModal}
        firstModalVisible={setModalVisible}
        secondModalVisible={setProductModalVisible}
        data={data}
        setData={setData}
        item={itemForEdit}
      />

      <ThirdModal
        targetCustomerModal={targetCustomerModal}
        secondModalVisible={setProductModalVisible}
        thirdModalVisible={setTargetCustomerModal}
        showSuccessModal={setIsSuccessModalOpen}
        setSuccessMessage={setSuccessMessage}
        data={data}
        setData={setData}
        item={itemForEdit}
      />
      {/* end modal for target customer */}

      {/*start success modal*/}
      <SuccessModal
        isVisible={isSuccessModalOpen}
        handleClose={() => {
          setIsSuccessModalOpen(false);
        }}
        // success={refundSuccess}
        message={successMessage}
        additional=" "
      />

      <ScrollView>
        <View style={styles.coupanContainer}>
          {coupandataLoaded ? (
            <>
              <View>
                <Text style={styles.btnHeading}>Active Coupons</Text>
                {coupon?.coupons
                  .filter((item) => {
                    return item.status == "published";
                  })
                  .map((item, index) => {
                    return (
                      <CoupanCard
                        item={item}
                        store_id={store_id}
                        index={index}
                        addHandler={addHandler}
                        editCoupon={editCoupon}
                        updateStatus={updateStatus}
                      />
                    );
                  })}
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.btnHeading}>Drafted Coupons</Text>
                {coupon?.coupons
                  .filter((item) => {
                    return item.status == "draft";
                  })
                  .map((item, index) => {
                    return (
                      <CoupanCard
                        item={item}
                        store_id={store_id}
                        index={index}
                        addHandler={addHandler}
                        editCoupon={editCoupon}
                        updateStatus={updateStatus}
                      />
                    );
                  })}
              </View>
            </>
          ) : (
            <Loader />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OfferScreen;

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
    marginVertical: 26,
  },
  btnHeading: {
    // paddingVertical: 12,
    marginBottom: 12,
    // paddingHorizontal: 7,
    fontSize: 16,
    // lineHeight: 18,
    fontFamily: fonts.PRIMARY_FONT_600,
    color: "#555",
  },
  coupanContainer: {
    paddingHorizontal: 23,
  },
  addOffer: {
    color: "#93908F",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 13,
  },
  addBtn: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#93908F",
    marginHorizontal: 4,
  },
  onboardingForm: {
    backgroundColor: "#FFF",
    width: "90%",
    height: "100%",
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: "5%",
    paddingVertical: 32,
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
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // backgroundColor: 'red'
  },
});
