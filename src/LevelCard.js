import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../assets/const/colors";

// Helper function to determine color and condition based on value and parameter range
const getLevelInfo = (value, min, max) => {
  if (value < min) return { color: colors.low, condition: "Low" }; // Below the standard level
  if (value >= min && value <= max)
    return { color: colors.normal, condition: "Normal" }; // Within the normal range
  return { color: colors.high, condition: "High" }; // Above the standard level
};

const LevelCard = ({ label, value, unit, date, time, min, max }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila", // Set to the desired timezone
    month: "short", // Short month format (e.g., NOV)
    day: "numeric",
    year: "numeric",
  })
    .format(currentDateTime)
    .toUpperCase();

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    timeStyle: "short", // Format for time
  }).format(currentDateTime);

  const { color: levelColor, condition } = getLevelInfo(value, min, max);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            color: colors.secondary,
            fontSize: 28,
            fontWeight: "800",
          }}
        >
          {`Current ${label} Level`}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            {formattedDate}
          </Text>
          <Text
            style={{
              color: colors.primaryLower,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            {formattedTime} GMT +8
          </Text>
        </View>
      </View>

      <View
        style={{
          //   backgroundColor: colors.primaryLower,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 18,
        }}
      >
        <Image
          style={{ width: 270, height: 270 }}
          source={require("../assets/img/chart.png")}
        />

        <Text
          style={{
            fontSize: 40,
            // maxWidth: 150,
            textAlign: "center",
            fontWeight: "bold",
            // bottom: 50,

            color: levelColor,
          }}
        >
          {value}
          {unit}
        </Text>
      </View>
      {/* <Text style={{ color: levelColor, fontSize: 15 }}>
        {`The ${label} level is currently ${condition}`}
      </Text> */}
    </View>
  );
};

export default LevelCard;
