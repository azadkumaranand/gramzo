import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/Loader";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { uploadFileAndGetURL } from "../../config/firebase";
import InputFields from "../InputFields";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ProductInfoModal from "./ProductInfoModal";
import DropdownDemo from "../../components/OnboardingComponents/DropdownDemo";
import { addProduct, changeStatus, deleteProduct } from "@rdx/ProductSlice";
import ProductDropDown from "./ProductDropDown";
import CustomDropdown from "./CustomDropdown";
import fonts, { textStyle } from "@const/fonts";
import PhotoZoom from "@/OrderComponents/modal/PhotoZoom";
import HeaderStyle from "@const/HeaderStyle";

const categoryData = [
  { label: "Sweet", value: "Sweet" },
  { label: "Spice", value: "Spice" },
];

const WeigthData = [
  { label: "gm", value: "gm" },
  { label: "Kg", value: "Kg" },
  { label: "L", value: "L" },
  { label: "ml", value: "ml" },
  // { label: "Other", value: "Other" },
];

export default function ProductEditModal({ onhandlemodal, showModal }) {
  const descText = useRef();
  const recipeText = useRef();

  const { params } = useRoute();
  var productDetails = {};
  productDetails = params?.product;
  // console.log(productDetails);
  const [uploadedImages, setUploadedImages] = useState(
    productDetails?.files || []
  );
  const [imagesUploading, setImagesUploading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [productName, setProductName] = useState(
    productDetails?.product_name || ""
  );
  const [productCategory, setProductCategory] = useState(
    productDetails?.product_category || ""
  );
  const [productPrice, setProductPrice] = useState(
    productDetails?.product_price ? productDetails?.product_price + "" : ""
  );
  const [productAmount, setProductAmount] = useState(
    productDetails?.product_quantity
      ? productDetails?.product_quantity + ""
      : ""
  );
  const [productAmountUnit, setProductAmountUnit] = useState("");
  const [stock, setStock] = useState(
    productDetails?.stock ? productDetails?.stock + "" : ""
  );
  const [speciality, setSpeciality] = useState(
    productDetails?.speciality || ""
  );
  const [manufacturer, setManufacturer] = useState(
    productDetails?.manufacturer || ""
  );
  const [generatedUsecase, setGeneratedUsecase] = useState(
    productDetails?.usecase || ""
  );
  const [generatedDescription, setGeneratedDescription] = useState(
    productDetails?.description || ""
  );
  const [descLoading, setDescLoading] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentstockDropdown, setcurrentstockDropdown] = useState(false);
  const [currentstockunit, setcurrentstockunit] = useState("");
  const [photoZoom, setphotoZoom] = useState(false);
  const [urlindex, seturlindex] = useState(0);
  // const product = useSelector((state) => state.product);
  // console.log(product.isLoading);
  const [isLoading, setIsLoading] = useState(false);
  const handlePhotoZoom = (item) => {
    // seturlindex(item);
    setphotoZoom(!photoZoom);
  };

  const handleDropArrow = () => {
    setcurrentstockDropdown(!currentstockDropdown);
  };

  const handelDropdownData = () => {
    handleDropArrow();
  };
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const pickImage = async (type) => {
    if (!type) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspects: [4, 3],
      quality: 1,
      selectionLimit: 5,
      allowsMultipleSelection: true,
    });

    if (result.assets) {
      if (uploadedImages.length + result.assets.length <= 5)
        setUploadedImages([...uploadedImages, ...result.assets]);
      var arr = result.assets;
      if (uploadedImages.length) {
        arr = arr.concat(uploadedImages);
      }
      // setImagesUploading(true);
      // arr.map(async (ra, i) => {
      //   let random = Crypto.randomUUID();
      //   const url = await uploadFileAndGetURL(random, arr[i].uri);
      //   setImagesUrl((imagesUrl) => [...imagesUrl, url]);
      //   // console.log("irl", imagesUrl, url);
      //   setImagesUploading(false);
      // });
    }
  };

  const removeImage = (url) => {
    uploadedImages.map((irl) => {
      if (irl.uri === url) {
        // console.log("irl", irl.uri);
        const index = uploadedImages.indexOf(irl);
        // console.log(index);
        setUploadedImages((oldValues) => {
          return oldValues.filter((_, i) => i !== index);
        });
        uploadedImages.splice(index, 1);
      }
    });
  };

  async function getDescFromGPT() {
    if (!productName) {
      return setErrorMessage("Please enter Product name");
    }
    try {
      setDescLoading(true);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GPT_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `Create a captivating and succinct description for our restaurant's item "${productName}", focusing on its distinctive qualities, flavor profile, and potential health benefits. Showcase its versatility as a culinary ingredient suitable for various dishes or beverages. Bring out the unique essence of the item, whether it's a spice, dish, or beverage, and highlight any notable health advantages. Craft a narrative that resonates with our patrons, combining elements of tradition, taste, and well-being to invite them into a delightful and memorable culinary experience. Your description should be inviting, informative, and tailored to entice our customers' curiosity and taste buds, max 100 words`,
            },
          ],
          temperature: 0,
          max_tokens: 256,
          //   top_p: 1,
          //   frequency_penalty: 0.0,
          //   presence_penalty: 0.0,
          stop: ["\n"],
        }),
      });
      const resjson = await res.json();
      if (descText.current) {
        descText.current.setContentHTML(
          `<div>${resjson.choices[0].message.content}</div>`
        );
      }
      setDescLoading(false);
      setGeneratedDescription(resjson.choices[0].message.content);
    } catch (err) {
      console.log(err);
    }
  }
  async function getRecipeFromGPT() {
    if (!productName) {
      return setErrorMessage("Please Enter Product name");
    }
    try {
      setRecipeLoading(true);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GPT_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `Generate a compelling use case for ${productName}. Imagine a scenario where a customer uses ${productName} to enhance their [specific activity or task]. Describe how ${productName} streamlines processes, saves time, and provides unique value to the user. Ensure the use case is concise, informative, and persuasive, spanning around 100 words`,
            },
          ],
          temperature: 0,
          max_tokens: 256,
          //   top_p: 1,
          //   frequency_penalty: 0.0,
          //   presence_penalty: 0.0,
          stop: ["\n"],
        }),
      });
      const resjson = await res.json();
      if (recipeText.current) {
        recipeText.current.setContentHTML(
          `<div>${resjson.choices[0].message.content}</div>`
        );
      }
      setRecipeLoading(false);
      setGeneratedUsecase(resjson.choices[0].message.content);
    } catch (err) {
      console.log(err);
    }
  }

  async function publishProduct(status) {
    // console.log(uploadedImages);
    var imagesUrlArr = [];
    var promise = uploadedImages.map(async (ra, i) => {
      // setIsLoading(true);
      let random = Crypto.randomUUID();
      // const url = await uploadFileAndGetURL(random, uploadedImages[i].uri);
      // imagesUrlArr.push(url);
    });

    // console.log("iurl", imagesUrlArr);
    if (status === "published") {
      if (
        !productName ||
        !productCategory ||
        !generatedDescription ||
        !productPrice ||
        !productAmount ||
        !productAmountUnit ||
        !stock ||
        !manufacturer ||
        !generatedUsecase
      ) {
        setErrorMessage("Please fill ALL required fields");
        return;
      }
    }
    if (status === "draft" && (!productName || !productCategory)) {
      setErrorMessage("Please Enter Product name and category");
      return;
    }
    Promise.all(promise)
      .then(() => {
        // console.log("iurl khada", imagesUrlArr);
        var filesar = [];
        if (imagesUrlArr.length) {
          imagesUrlArr.map((img) => {
            filesar.push({
              type: "image",
              url: img,
            });
          });
        }
        // console.log("filesar", filesar);
        dispatch(
          addProduct({
            id: productDetails?._id ? productDetails?._id : null,
            product_name: productName,
            product_category: productCategory,
            description: generatedDescription,
            product_price: productPrice,
            product_quantity: productAmount,
            product_status: status,
            usecase: generatedUsecase,
            manufacturer: manufacturer,
            stock: stock,
            speciality: speciality,
            files: filesar,
          })
        );
        setIsLoading(false);
        navigation.navigate("ParentScreen");
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
    console.log("end");
  }

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          paddingTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => {
              navigation.goBack();
              // console.log(params.product);
              // if (product) navigation.goBack();
              // else
              //   navigation.navigate("ProductEditModal", {
              //     Edit: true,
              //     product: productDetails,
              //     addNew: false,
              //   });
            }}
          >
            <AntDesign name="arrowleft" size={24} color="#FFF" />
          </TouchableOpacity>
          <View
            style={{
              width: `${productDetails?.product_name ? "50%" : "90%"}`,
              height: 30,
              overflow: "scroll",
            }}
          >
            <Text style={styles.headingText}>
              {productDetails?.product_name
                ? productDetails?.product_name
                : "Add new Product"}
            </Text>
          </View>
        </View>

        {params?.Edit && (
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              // paddingHorizontal: 10,
            }}
          >
            {productDetails?.product_status === "published" && (
              <TouchableOpacity
                style={styles.TopButton}
                onPress={() => {
                  dispatch(changeStatus(productDetails?._id, "draft"));
                  navigation.navigate("ParentScreen");
                }}
              >
                <Ionicons name="archive-outline" size={18} color="#E4CD00" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.TopButton}
              onPress={() => {
                dispatch(deleteProduct(productDetails?._id));
                navigation.navigate("ParentScreen");
              }}
            >
              <AntDesign name="delete" size={18} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TopButton}
              onPress={() =>
                navigation.navigate("ProductEditModal", {
                  Edit: false,
                  product: productDetails,
                })
              }
            >
              <Feather name="edit-2" size={18} color="#4D952B" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <PhotoZoom
        visible={photoZoom}
        handlemodalChange={handlePhotoZoom}
        item={uploadedImages}
        productDetails={productDetails}
        urlindex={urlindex}
      />

      <View style={styles.Header}>
        <Header />
      </View>
      <ScrollView style={styles.modalContainer}>
        <View style={styles.content}>
          {!params?.Edit && (
            <>
              <View style={styles.uploadedImages}>
                {uploadedImages.map((img, i) => (
                  <View key={"productImage" + i}>
                    <TouchableOpacity
                      onPress={() => {
                        seturlindex(i);
                        handlePhotoZoom();
                      }}
                    >
                      <Image
                        source={{
                          uri: productDetails?.files?.length
                            ? img.url
                            : img.uri,
                        }}
                        style={{
                          width: 100,
                          height: 115,
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={styles.prodImgOverlay} />
                    <View style={styles.imgNumCross}>
                      <View style={styles.imgNum}>
                        <Text>{i + 1}</Text>
                      </View>
                      <Entypo
                        onPress={() =>
                          removeImage(
                            productDetails?.files?.length ? img.url : img.uri
                          )
                        }
                        name="circle-with-cross"
                        size={22}
                        color="white"
                      />
                    </View>
                    <Image source={require("@assets/Icons/cross.svg")} />
                  </View>
                ))}
                {/* {imagesUploading && <Loader size={30} />} */}
              </View>
              <Text style={styles.upload_txt}>Upload File</Text>
              <View
                style={{ flexDirection: "row", gap: 18, alignItems: "center" }}
              >
                <Pressable
                  style={styles.upload_btn}
                  onPress={() => pickImage("aadhaar")}
                >
                  <Text style={styles.upload_btn_txt}>Choose File</Text>
                </Pressable>
                <Text
                  style={{
                    color: "#667085",
                    fontSize: 14,
                    fontFamily: fonts.PRIMARY_FONT_400,
                    lineHeight: 20,
                  }}
                >
                  {uploadedImages.length ? "file uploaded" : "Choose Image"}
                </Text>
              </View>
              <View style={{ marginTop: 34, gap: 6, zIndex: 90 }}>
                <InputFields
                  label="Product Name"
                  value={productName}
                  onChangeText={setProductName}
                />
                <View
                  style={{
                    marginBottom: 12,
                    // marginTop: 10,
                  }}
                >
                  <DropdownDemo
                    item={categoryData}
                    dropdown_type="Category"
                    handleChange={setProductCategory}
                    defaultValue={productDetails.product_category}
                  />
                </View>

                <View style={styles.descTextEditor}>
                  <RichToolbar editor={descText} />
                  <RichEditor
                    ref={descText}
                    onChange={(descriptionText) => {
                      setGeneratedDescription(descriptionText);
                    }}
                    placeholder="Description"
                    androidLayerType="software"
                    initialHeight={100}
                    initialContentHTML={
                      productDetails?.description
                        ? `<p>${productDetails?.description}</p>`
                        : ""
                    }
                  />

                  {descLoading ? (
                    <View
                      style={[
                        styles.writeForMeBtn,
                        {
                          width: "30%",
                          height: 35,
                        },
                      ]}
                    >
                      <Loader size={30} />
                    </View>
                  ) : (
                    <Pressable
                      style={styles.writeForMeBtn}
                      onPress={getDescFromGPT}
                    >
                      <Image
                        style={{ width: 14, height: 14 }}
                        source={require("@assets/Icons/magic.png")}
                      />
                      <Text style={styles.writeForMeBtnTxt}>Write for me</Text>
                    </Pressable>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "42%" }}>
                    <InputFields
                      label="Price"
                      value={productPrice}
                      onChangeText={setProductPrice}
                      keyboardType="numeric"
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: fonts.PRIMARY_FONT_400,
                      fontSize: 14,
                      color: "#aaa",
                      marginBottom: 10,
                    }}
                  >
                    per
                  </Text>

                  <View
                    style={{
                      width: "45%",
                      flexDirection: "row",
                      alignItems: "center",
                      zIndex: 90,
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      <InputFields
                        label="Amount"
                        value={productAmount}
                        onChangeText={setProductAmount}
                        keyboardType="numeric"
                      />

                      <View
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 0,
                          zIndex: 100,
                          // width: "100%"
                        }}
                      >
                        <CustomDropdown
                          item={WeigthData}
                          handelDropdownData={handelDropdownData}
                          setProductAmountUnit={setProductAmountUnit}
                          productAmountUnit={productAmountUnit}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View>
                  <InputFields
                    label="Current Stock"
                    value={stock}
                    onChangeText={setStock}
                    keyboardType="numeric"
                  />

                  <View
                    style={{
                      position: "absolute",
                      right: 30,
                      top: 20,
                    }}
                  >
                    <Text
                      style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}
                    >
                      {productAmountUnit}
                    </Text>
                  </View>
                </View>
                <InputFields
                  label="Any Speciality"
                  value={speciality}
                  onChangeText={setSpeciality}
                />
                <InputFields
                  label="Manufacturer"
                  value={manufacturer}
                  onChangeText={setManufacturer}
                />
                <View style={styles.descTextEditor}>
                  <RichToolbar editor={recipeText} />
                  <RichEditor
                    ref={recipeText}
                    onChange={(descriptionText) => {
                      setGeneratedUsecase(descriptionText);
                    }}
                    placeholder="Use/Recipe"
                    androidLayerType="software"
                    initialHeight={100}
                    initialContentHTML={
                      productDetails?.usecase
                        ? `<p>${productDetails?.usecase}</p>`
                        : ""
                    }
                  />
                  {recipeLoading ? (
                    <View
                      style={[
                        styles.writeForMeBtn,
                        {
                          width: "30%",
                          height: 35,
                        },
                      ]}
                    >
                      <Loader size={30} />
                    </View>
                  ) : (
                    <Pressable
                      style={styles.writeForMeBtn}
                      onPress={getRecipeFromGPT}
                    >
                      <Image
                        style={{ width: 14, height: 14 }}
                        source={require("@assets/Icons/magic.png")}
                      />
                      <Text style={styles.writeForMeBtnTxt}>Write for me</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </>
          )}

          {params?.Edit && <ProductInfoModal product={productDetails} />}
          {errorMessage ? (
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
                color: "#FF3A3A",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
          {!params?.Edit &&
            (isLoading ? (
              <Loader size={30} />
            ) : (
              <View style={styles.btns}>
                <TouchableOpacity
                  style={styles.draftBtn}
                  onPress={() => {
                    publishProduct("draft");
                  }}
                >
                  <Text
                    style={{
                      color: "#FF3A3A",
                      fontSize: 14,
                      fontFamily: fonts.PRIMARY_FONT_700,

                      textAlign: "center",
                    }}
                  >
                    Save as Draft
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.publishBtn}
                  onPress={() => {
                    // if (productDetails?.product_status === "published") return;
                    publishProduct("published");
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontFamily: fonts.PRIMARY_FONT_700,
                      textAlign: "center",
                    }}
                  >
                    Publish
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  TopButton: {
    width: 35,
    height: 35,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "center",
  },
  Header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
    gap: 40,
    height: HeaderStyle.height,
    paddingTop: HeaderStyle.top,
    // top:HeaderStyle.top,
    backgroundColor: "#71C442",
  },
  headerIcon: {
    paddingVertical: 5,
    borderRadius: 40,
  },
  headerIconImg: {
    height: 17,
    width: 17,
  },
  headingText: {
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 20,
    color: "#fff",
  },
  content: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 60,
  },
  uploadedImages: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  prodImgOverlay: {
    width: 100,
    height: 35,
    position: "absolute",
    top: 81,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },
  imgNumCross: {
    position: "absolute",
    top: 88,
    // left: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imgNum: {
    width: 22,
    height: 22,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  upload_txt: {
    color: "#000",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
    // lineHeight: 16,
    marginBottom: 16,
  },
  upload_btn: {
    borderColor: "#D0D5DD",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  upload_btn_txt: {
    color: "#667085",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
    lineHeight: 20,
  },
  editor: {
    flex: 1,
    height: 100,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: "white",
  },
  descTextEditor: {
    // minHeight: 100,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  writeForMeBtn: {
    backgroundColor: "#FF6700",
    borderRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-end",
    position: "relative",
    bottom: 10,
    right: 5,
    // justifyContent: "center",
  },
  writeForMeBtnTxt: {
    color: "#fff",
    fontSize: 14,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 20,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 11,
    marginTop: 30,
  },
  draftBtn: {
    width: "47%",
    height: 40,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 70,
    borderColor: "#FF3A3A",
  },
  publishBtn: {
    width: "47%",
    height: 40,
    borderRadius: 70,
    justifyContent: "center",
    backgroundColor: "rgb(66, 175, 16)",
  },
});
