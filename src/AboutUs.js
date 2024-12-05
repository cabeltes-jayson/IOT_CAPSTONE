import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const AboutUs = () => {
  const navigation = useNavigation();

  const backBtn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.linearBg}
        source={require("../assets/img/bg.png")}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={backBtn}>
            <Icon name="chevron-back" color={colors.primary} size={25} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>About Us</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.mainTitle}>About Us</Text>
          <Text style={styles.separator}>_____________________</Text>
          <Text style={styles.subtitle}>
            We're on a mission to develop a mobile-based river monitoring system
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.missionContainer}
          style={{ flex: 1 }}
        >
          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.separator}>_____________________</Text>
          <Text style={styles.missionText}>
            "Dedicated to empowering communities with advanced low-cost tools,
            we aim to protect and preserve water resources. Our mobile app
            offers real-time river monitoring solutions, enabling users to track
            water quality, detect changes, and respond to environmental
            challenges. By combining innovation with sustainability, we strive
            to ensure the health of rivers for future generations."
          </Text>
        </ScrollView>

        <TouchableOpacity style={styles.learnMoreButton}>
          <Text
            style={styles.learnMoreButtonText}
            onPress={() => {
              navigation.navigate("Details");
            }}
          >
            Learn More
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearBg: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: colors.primary,
    fontSize: width * 0.05,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mainTitle: {
    color: colors.primary,
    fontSize: width * 0.1,
  },
  separator: {
    color: colors.secondary,
    marginVertical: 10,
  },
  subtitle: {
    fontStyle: "italic",
    textTransform: "uppercase",
    marginVertical: 20,
    fontSize: width * 0.05,
    color: colors.primary,
    textAlign: "center",
  },
  missionContainer: {
    flexGrow: 1,
    backgroundColor: "rgba(122, 111, 203, 0.5)",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 25,
    paddingBottom: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  missionTitle: {
    color: colors.white,
    fontSize: width * 0.08,
    fontWeight: "900",
  },
  missionText: {
    fontStyle: "italic",
    textTransform: "uppercase",
    fontSize: width * 0.045,
    color: colors.white,
    textAlign: "left",
    lineHeight: width * 0.055,
    marginVertical: 10,
  },

  learnMoreButton: {
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 25,
    width: width * 0.65,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  learnMoreButtonText: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
});

export default AboutUs;
