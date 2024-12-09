import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../assets/const/colors";

const UnitCard = ({ clip, param, value, unit }) => {
  // Determine color based on thresholds
  const getValueColor = () => {
    if (param === "pH") {
      if (value < 6.5) return colors.low;
      if (value > 8.5) return colors.high;
      return colors.normal;
    } else if (param === "Temperature") {
      if (value < 26) return colors.low;
      if (value > 30) return colors.high;
      return colors.normal;
    } else if (param === "Total Suspended Solids") {
      if (value > 50) return colors.high;
      if (value < 50) return colors.low;
      return colors.normal;
    } else if (param === "Total Dissolved Solids") {
      if (value > 50) return colors.high;
      return colors.normal;
    }
    return colors.unknown; // Fallback case
  };

  const valueColor = getValueColor();

  return (
    <View
      style={{
        flex: 1,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        padding: 18,
        justifyContent: "space-between",
      }}
      colors={["rgba(255,254,254,1)", "rgba(122,11,203,0.3)"]}
    >
      {/* Dynamic Image */}
      <Image
        source={clip} // Use the clip prop dynamically
        style={{ width: 25, height: 25, resizeMode: "contain" }}
      />

      <Text
        style={{
          color: colors.primary,
          fontSize: 10,
          fontWeight: "bold",
        }}
      >
        {param}
      </Text>

      {/* Dynamic Value with Color */}
      <Text
        style={{
          fontWeight: "800",
          fontSize: 14,
          color: valueColor, // Apply dynamic color to value
        }}
      >
        {value}
        {unit}
      </Text>
    </View>
  );
};

export default UnitCard;
