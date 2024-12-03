import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/const/colors";

const LandingScreen = () => {
  const navigation = useNavigation();
  const proceedBtn = () => {
    navigation.navigate("Main");
  };

  // Get screen width and height dynamically
  const { width, height } = Dimensions.get("window");

  return (
    <ImageBackground
      style={[styles.container, { paddingTop: height * 0.1, paddingBottom: height * 0.05 }]}
      source={require("../assets/img/bg.png")}
      resizeMode="cover" // Ensure background scales properly
    >
      <View style={[styles.contentContainer, { gap: height * 0.04 }]}>
        <Image
          source={require("../assets/img/logo.png")}
          style={[styles.logo, { width: width * 0.5, height: width * 0.5 }]} // Responsive logo size
        />
        <View style={[styles.textContainer, { gap: height * 0.02 }]}>
          <Text
            style={[
              styles.headerText,
              { fontSize: width * 0.085 }, // Font size relative to screen width
            ]}
          >
            W A T E R B E N D E R S
          </Text>
          <Text
            style={[
              styles.subText,
              {
                fontSize: width * 0.04, // Font size relative to screen width
                maxWidth: width * 0.8, // Ensure text doesn't stretch too wide
              },
            ]}
          >
            Protecting rivers today for a healthier tomorrow. Monitor, maintain,
            and preserve the lifelines of our planet.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={proceedBtn}
        style={[
          styles.button,
          {
            width: width * 0.7, // Make button width responsive
            height: height * 0.07, // Button height responsive
            borderRadius: height * 0.03, // Make the border radius proportional
          },
        ]}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Ensure content is centered vertically
    alignItems: "center",
    paddingHorizontal: 3,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Add margin at the bottom to prevent overlap with button
  },
  logo: {
    resizeMode: "contain", // Ensure the logo maintains its aspect ratio
    marginTop: '10%',

  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    
  },
  headerText: {
    color: colors.primary,
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: "center", // Ensure text is centered horizontally
    
  },
  subText: {
    fontStyle: "italic",
    color: colors.primary,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: '60%',

  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});
