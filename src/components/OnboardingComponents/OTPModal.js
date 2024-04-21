import { useEffect, useRef, useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { generate_otp_api, verify_otp_api } from "@func/api_functions";
import OverlayLoading from "@/OverlayLoading";
import Loader from "@/Loader";

const OTPModal = ({
  onVerify,
  otpModalVisible,
  phoneNumber,
  userId,
  setUserId,
  handleClose
}) => {
  const [otp, setOtp] = useState("");

  const [resendTimer, setResendTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpRef = useRef(null);
  const [error, setError] = useState("");

  const btnDisabled = isLoading || otp.length !== 6;

  useEffect(() => {
    if (canResendOtp) return;
    let timer = setInterval(() => {
      if (resendTimer === 0) {
        setCanResendOtp(true);
        clearInterval(timer);
      } else {
        setResendTimer(resendTimer - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [canResendOtp, resendTimer]);

  const resendOtp = async () => {
    setError("");
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setResendTimer(30);
    setCanResendOtp(false);
    setOtp("");
    otpRef.current.clear();

    const [data, err] = await generate_otp_api(phoneNumber);

    if (err) return alert("Error sending OTP");

    const { error, status, userId } = data;
    setUserId(userId);

    if (error) return alert("Error sending OTP");

    if (status === "pending") {
      alert("OTP sent successfully");
    }
  };

  const verifyHandler = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please Enter a valid OTP");
      return;
    }
    setIsLoading(true);

    const [_, err] = await verify_otp_api(userId, otp);
    setIsLoading(false);

    if (err) return setError("Your OTP is incorrect");
    setError("");

    onVerify();

  };

  const handleOTPChange = (code) => {
    setOtp(code);
  };

  return (
    <>
      {/* {!isLoading && <OverlayLoading />} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModalVisible}
        onRequestClose={handleClose}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
        <View
          style={{
            paddingTop: 65,
            paddingHorizontal: 15,
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.63)",
          }}
        >
          <View style={styles.otpscreen}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                gap: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "rgba(52, 64, 84, 1)",
                  }}
                >
                  OTP has been sent to +91 {phoneNumber}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 10,
                }}
              >
                {
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {error}
                  </Text>
                }

                <OTPTextInput
                  containerStyle={styles.otpContainer}
                  inputCount={6}
                  tintColor="gray"
                  offTintColor="gray"
                  inputCellLength={1}
                  handleTextChange={handleOTPChange}
                  ref={otpRef}
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(208, 213, 221, 1)",
                    borderRadius: 8,
                    width: 45,
                    height: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28, // Adjust font size as needed
                    textAlign: "center", // Center the text within the input box
                  }}
                  placeholder="0"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(102, 112, 133, 1)",
                    }}
                  >
                    Haven’t recieved the OTP?
                  </Text>
                </View>

                <TouchableOpacity disabled={!canResendOtp} onPress={resendOtp}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: canResendOtp ? "#FF6700" : "#d6d6d6",
                    }}
                  >
                    {canResendOtp
                      ? "Resend OTP"
                      : `Resend OTP in ${resendTimer}s`}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={handleClose}
                  style={{
                    width: "40%",
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(107, 114, 128, 1)",
                    }}
                  >
                    Not your number?
                  </Text>

                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "rgba(107, 114, 128, 1)",
                    }}
                  >
                    Change here
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: "45%",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: btnDisabled ? "rgba(85, 166, 48, 0.7)" : "rgba(85, 166, 48, 1)",
                    borderRadius: 4,
                  }}
                  onPress={verifyHandler}
                  disabled={btnDisabled}
                >
                  {isLoading ? (
                    <Loader size={20} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "rgba(255, 255, 255, 1)",
                      }}
                    >
                      Verify
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.63)",
    flex: 1,
  },

  otpscreen: {
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginTop: 50,
  },

  otpContainer: {
    flexDirection: "row",
    gap: 5,
  },
});

export default OTPModal;
