import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "@/Paragraph";
import Header from "@/Header";
import { useNavigation } from "@react-navigation/native";
import Loader from "@/Loader";
import StoryInputField from "./StoryInputFiled";
import NextButton from "@/OrderComponents/NextButton";
import * as Crypto from "expo-crypto";
import { uploadFileAndGetURL } from "../../config/firebase";
import { addVendorStory } from "@rdx/VendorSlice";

const randomImg =
  "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2Fbb1a4ae7-17e3-4e32-abf7-f13726247a9e.jpg?alt=media&token=2f258fdd-e9a6-4d9f-9cca-b0c13739ad22";

const Story = () => {
  const { user } = useSelector((state) => state.vendor);
  const vendorStory = user?.vendor_story;
  const [selectedVideo, setSelectedVideo] = useState(vendorStory?.video || "");
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState(vendorStory?.vendor_img || "");
  const [imagesUploading, setImagesUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState({
    uri: vendorStory?.vendor_img,
  });
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
      }
    })();
  }, []);

  //text area handle
  const [text, setText] = useState(vendorStory?.story_text ?? "");
  const maxWords = 125;
  const handleTextChange = (inputText) => {
    if (text.length + 1 <= maxWords) {
      setText(inputText);
    }
  };

  //open video picker
  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
      setSelectedVideo(result.assets[0].uri);
      if (result.assets) {
        setVideoUploading(true);
        let random = Crypto.randomUUID();
        const url = await uploadFileAndGetURL(random, result.assets[0].uri);
        setVideoUrl(url);
        setVideoUploading(false);
      }
    } catch (error) {
      console.log("Error picking video: ", error);
    }
  };

  //open image picker
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setUploadedImage(result.assets[0]);
      if (result.assets) {
        setImagesUploading(true);
        let random = Crypto.randomUUID();
        const url = await uploadFileAndGetURL(random, result.assets[0].uri);
        setImagesUrl(url);
        setImagesUploading(false);
      }
    } catch (error) {
      console.log("Error picking Image: ", error);
    }
  };

  const dispatch = useDispatch();
  //handle form submitting
  const submitForm = () => {
    dispatch(
      addVendorStory({
        story_text: text,
        vendor_img: imagesUrl || randomImg,
        video: videoUrl,
      })
    );
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Header title="Your Story" headerBtn={headerBtn} />

        <View style={styles.aadhar_upload}>
          <View style={styles.container}>
            <View style={styles.textAreaContainer}>
              <StoryInputField
                label="Your store tagline, that attract users"
                value={text}
                onChangeText={handleTextChange}
                multiline
                numberOfLines={5}
              />
              <Text style={styles.textLimit}>
                {maxWords - text.length}/{maxWords}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.upload_heading}>
              Upload your full HD Image with a simple background
            </Text>
            <View style={styles.img_box}>
              {imagesUploading ? (
                <View style={{ width: "30%" }}>
                  <Loader size={30} />
                </View>
              ) : (
                <Pressable
                  style={styles.upload_btn}
                  onPress={() => pickImage("aadhaar")}
                >
                  <Text style={styles.upload_btn_txt}>Choose File</Text>
                </Pressable>
              )}

              <Paragraph color="#000" textAlignC={true}>
                {imagesUploading ? "No file choosen" : "file uploaded"}
              </Paragraph>
            </View>
            {uploadedImage && uploadedImage.uri && (
              <Image
                source={{
                  uri: uploadedImage.uri,
                }}
                style={{ width: 300, height: 100, marginTop: 10 }}
              />
            )}
          </View>
          <View
            style={{
              borderWidth: 0.4,
              borderStyle: "dashed",
              marginVertical: 15,
            }}
          ></View>
          <View>
            <Text style={styles.upload_heading}>Upload your full HD video</Text>
            <View style={styles.img_box}>
              {videoUploading ? (
                <View style={{ width: "30%" }}>
                  <Loader size={30} />
                </View>
              ) : (
                <Pressable
                  style={styles.upload_btn}
                  onPress={() => pickVideo()}
                >
                  <Text style={styles.upload_btn_txt}>Choose File</Text>
                </Pressable>
              )}
              <Paragraph color="#000" textAlignC={true}>
                {videoUrl ? "file uploaded" : "No file choosen"}
              </Paragraph>
            </View>
            {selectedVideo && (
              <Image
                source={{ uri: selectedVideo }}
                style={{ width: 300, height: 100, marginTop: 5 }}
              />
            )}
          </View>


          <View style={{ marginVertical: 15 }}>

            <NextButton lable={"Save"} handlechangeScrenn={submitForm} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Story;

const headerBtn = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#FFF",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 30,
        borderWidth: 0.898,
        borderColor: "#FFF",
      }}
    >
      <Text
        style={{
          color: "#42AF10",
          fontSize: 14,
          fontFamily: fonts.PRIMARY_FONT_500,
        }}
      >
        Preview Store
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  aadhar_upload: {
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  upload_heading: {
    fontSize: 13,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 16,
    color: "#667085",
    marginTop: 12,
  },
  img_box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
    marginTop: 12,
  },
  upload_btn: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#448526",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 41,
    // width: "fit-content",
  },
  addharwithoptbtn: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  numberbox: {
    flex: 1,
  },
  otpbtn: {
    fontWeight: "bold",
  },
  upload_btn_txt: {
    fontFamily: fonts.PRIMARY_FONT_700,
    fontSize: 14,
    lineHeight: 20,
    color: "#448521",
  },
  section_heading: {
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 18,
    lineHeight: 28,
    color: "#000",
    marginBottom: 12,
    marginTop: 12,
  },
  checkboxContainer: {
    width: "90%",
    flexDirection: "row",
    gap: 24,
    marginTop: 54,
    marginBottom: 24,
  },
  checkbox: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 4,
  },
  btn: {
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#55A630",
  },
  btnText: {
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
    textAlign: "center",
  },
  container: {
    // padding: 16,
    // backgroundColor: 'red',
    marginTop: 25,
    width: "100%",
    marginBottom: 20,
  },
  textAreaContainer: {
    height: 95,
    borderWidth: 1,
    borderRadius: 28,
    borderColor: "#D0D5DD",
    position: "relative",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 28,
    padding: 4,
    marginTop: 8,
    minHeight: 100, // Adjust this based on your design
  },
  placeholder: {
    position: "absolute",
    top: 30,
    left: 20,
    color: "#667085",
  },
  textLimit: {
    position: "absolute",
    bottom: 8,
    right: 12,
    color: "#555",
  },
});
