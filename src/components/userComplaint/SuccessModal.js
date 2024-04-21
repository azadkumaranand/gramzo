import { View, Text, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import fonts from "@const/fonts";

export default function SuccessModal({
  isVisible,
  handleClose,
  success,
  message,
  additional,
}) {
  React.useEffect(() => {
    const timeout = setTimeout(handleClose, 3000);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          backgroundColor: "rgba(51, 51, 51, 0.6)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            width: "100%",
            aspectRatio: 1,
            paddingHorizontal: 50,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="checkcircle" size={120} color="#4BA74E" />

            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                gap: 5,
              }}
            >
              {success ? (
                <>
                  <Text
                    style={{
                      color: "#404040",
                      fontFamily: fonts.PRIMARY_FONT_500,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Congratulations !
                  </Text>
                  <Text
                    style={{
                      color: "#555555",
                      fontFamily: fonts.PRIMARY_FONT_400,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    You've earned the customer's trust. Hopefully, he'll return
                    to your store.
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      color: "#404040",
                      fontFamily: fonts.PRIMARY_FONT_500,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {message || "Your complaint is currently open"}
                  </Text>
                  <Text
                    style={{
                      color: "#555555",
                      fontFamily: fonts.PRIMARY_FONT_400,
                      textAlign: "center",
                    }}
                  >
                    {additional ||
                      "Once resolved, it will be marked as solved automatically."}
                  </Text>
                </>
              )}
            </View>
          </View>

          {success && (
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#555555",
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontWeight: "bold",
                }}
              >
                Note:
              </Text>
              <Text
                style={{
                  color: "#555555",
                  fontFamily: fonts.PRIMARY_FONT_400,
                }}
              >
                {" "}
                Payment deducted next paycheck.
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
