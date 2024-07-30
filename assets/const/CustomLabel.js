// ./assets/const/CustomLabel.js
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const CustomLabel = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={18} color="white" /> {/* First icon */}
      <Text style={styles.text}>{title}</Text>
      <Icon name="arrow-forward" size={18} color="white" /> {/* Second icon */}
    </View>
  );
};

export default CustomLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginHorizontal: 8, // Space between the icons and title
  },
});
