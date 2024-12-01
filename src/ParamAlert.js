import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../assets/const/colors";

const ParamAlert = ({ value, unit, param, img }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        paddingVertical: 19,
      }}
    >
      {/* Image */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={img} style={{ width: 40, height: 40 }} />
      </View>

      {/* Value */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          {value}
        </Text>
      </View>

      {/* Description */}
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 18, color: colors.white, fontWeight: "900" }}>
          {unit}
        </Text>
        <Text style={{ fontSize: 18, color: colors.white }}>{param}</Text>
      </View>
    </View>
  );
};

export default ParamAlert;

const styles = StyleSheet.create({});
