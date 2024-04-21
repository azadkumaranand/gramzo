import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import fonts, { textStyle } from "@const/fonts";
import dayjs from "dayjs";

const TrackOrdreScreen = ({ item, TopTabScreen }) => {
  const Time = item?.timestamps;
  const converTime = (date) => date ? dayjs(date).format("DD MMM YYYY, hh:mm A") : null;

  const TrackComponent = ({ lable, Date, status }) => {
    return (
      <View style={styles.TrackComponent}>
        <View style={styles.TrackPoint}>
          <View
            style={{
              backgroundColor: status ? "#42AF10" : "#93908F",
              ...styles.trackPointCheck,
            }}
          ></View>

          <Text
            style={{
              color: "#1B1816",
              fontSize: 15,
              fontFamily: fonts.PRIMARY_FONT_400,
            }}
          >
            {lable}
          </Text>
        </View>

        {status && (
          <View>
            <Text
              style={{
                color: "#93908F",
                fontSize: 15,
                fontFamily: fonts.PRIMARY_FONT_400,
              }}
            >
              {Date}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.MainConatiner}>
      <Text
        style={{
          fontSize: 15,
          fontFamily: fonts.PRIMARY_FONT_600,
          color: "#555555",
        }}
      >
        Track Order
      </Text>

      <View style={styles.TrackComponentContainer}>
        <View style={styles.Border}>
          <View style={styles.borderbox1}>
            <TrackComponent
              lable={"Recieved"}
              Date={converTime(Time?.received_at)}
              status={!!Time?.received_at}
            />
          </View>
          <View style={styles.borderbox2}>
            <TrackComponent
              lable={"Accepted"}
              Date={converTime(Time?.accepted_at)}
              status={!!Time?.accepted_at}
            />
          </View>
        </View>

        <View style={styles.Border}>
          <View style={styles.borderbox2}>
            <TrackComponent
              lable={"Processed"}
              Date={converTime(Time?.processed_at)}
              status={!!Time?.processed_at}
            />
          </View>
        </View>

        <View style={styles.Border}>
          {TopTabScreen == "forpickup" && (
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                top: 15,
                left: 20,
              }}
            >
              <TouchableOpacity style={styles.PrintButton}>
                <Text style={textStyle(14, fonts.PRIMARY_FONT_600, "#555555")}>
                  Print Label
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.PrintButton}>
                <Text style={textStyle(14, fonts.PRIMARY_FONT_600, "#555555")}>
                  Print Manifest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.CancleButon}>
                <Text style={textStyle(14, fonts.PRIMARY_FONT_600, "#FB7D13")}>
                  Cancel Schedule
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.borderbox2}>
            <TrackComponent
              lable={"Pickup done"}
              Date={converTime(Time?.pickup_done_at)}
              status={!!Time?.pickup_done_at}
            />
          </View>
        </View>

        <View style={styles.Border}>
          <View style={styles.borderbox2}>
            <TrackComponent
              lable={"Out for delivery"}
              Date={converTime(Time?.out_for_delivery_at)}
              status={!!Time?.out_for_delivery_at}
            />
          </View>
        </View>

        <View style={styles.Border}>
          <View style={styles.borderbox2}>
            <TrackComponent
              lable={"Delivered"}
              Date={converTime(Time?.delivered_at)}
              status={!!Time?.delivered_at}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CancleButon: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: "#FFF8F2",
  },
  PrintButton: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: "#E8E8E8",
  },
  MainConatiner: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  TrackComponent: {
    zIndex: 9999,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TrackPoint: {
    flexDirection: "row",
    gap: 15,
  },
  trackPointCheck: {
    width: 20,
    height: 20,
    borderRadius: 99998,
  },
  borderbox1: {
    position: "absolute",
    width: "100%",
    top: -10,
    left: -10,
  },
  borderbox2: {
    position: "absolute",
    width: "100%",
    bottom: -10,
    left: -10,
  },
  Border: {
    zIndex: 999,
    width: "100%",
    height: 60,
    borderStyle: "dashed",
    borderColor: "#93908F",
    borderLeftWidth: 1,
  },
  TrackComponentContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
export default TrackOrdreScreen;
