import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { fontSizes } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import BackgroundTimer from "react-native-background-timer";
type PropeType = {
  eta: number;
  status: string;
  order_id: string;
  startTime: any;
};

const Timer = ({ eta, status, order_id, startTime }: PropeType) => {
  const [secendsLeft, setSecendsLeft] = useState<number>(1);

  const timeStampToDate = (modifiedData: any) => {
    const seconds = modifiedData._seconds;

    const nanoseconds = modifiedData._nanoseconds / 1e9;
    const milliseconds = seconds * 1000 + nanoseconds * 1000;

    return (modifiedData = new Date(milliseconds));
  };

  const searchExpectedTime = async () => {
    const currentTime = moment(new Date(Date.now()));
    // console.log('currTime', currentTime.toLocaleString());
    const startOrderTime = moment(timeStampToDate(startTime));
    // console.log('startTIme', startOrderTime.toLocaleString());

    const expectedTime = moment(startOrderTime).add(eta, "minute");

    const diff = expectedTime.diff(currentTime, "seconds");
    // console.log(diff);

    if (diff >= 0) {
      setSecendsLeft(diff);
    } else {
      setSecendsLeft(0);
    }
  };

  useEffect(() => {
    if (status === "IN_PROGRESS") {
      searchExpectedTime();
    }
  }, [status]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecendsLeft((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (status === "IN_PROGRESS") {
      startTimer();
    } else {
      setSecendsLeft(eta * 60);
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [status]);

  useEffect(() => {
    if (secendsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secendsLeft]);

  const clockify = () => {
    let hours = Math.floor(secendsLeft / 60 / 60);
    let mins = Math.floor((secendsLeft / 60) % 60);
    let seconds = Math.floor(secendsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Complete The Order In </Text>
      <Text
        style={{
          ...styles.timer,
          color:
            (secendsLeft / 60 / eta) * 100 >= 66.66
              ? "green"
              : (secendsLeft / 60 / eta) * 100 >= 33.33
                ? "#FFBF00"
                : "red",
        }}
      >
        {clockify().displayHours} : {clockify().displayMins} :{" "}
        {clockify().displaySecs}
      </Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: color.fadedPrimary,
    paddingVertical: 20,

    paddingHorizontal: 15,
  },
  timer: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
  },
  heading: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 8,
  },
});
