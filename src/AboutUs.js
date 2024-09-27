import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { useNavigation } from "@react-navigation/native";

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
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 30,
            paddingHorizontal: 25,
          }}
        >
          <TouchableOpacity onPress={backBtn}>
            <Icon name="chevron-back" color={colors.primary} size={25} />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: colors.primary, fontSize: 20 }}>
              About Us
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 50,
            }}
          >
            About Us
          </Text>
          <Text style={{ color: colors.secondary }}>_____________________</Text>
          <Text
            style={{
              fontStyle: "italic",
              textTransform: "uppercase",
              marginVertical: 20,
              fontSize: 18,
              color: colors.primary,
              textAlign: "center",
            }}
          >
            We're on a mission to develop a mobile-based river monitoring system
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(122, 111, 203, 0.5)",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            // justifyContent: "center",
            // alignItems: "center",
            padding: 25,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 35,
              fontWeight: "900",
            }}
          >
            Our Mission
          </Text>
          <Text style={{ color: colors.white }}>_____________________</Text>
          <Text
            style={{
              fontStyle: "italic",
              textTransform: "uppercase",
              marginVertical: 20,
              fontSize: 18,
              color: colors.white,
              textAlign: "center",
            }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Text>
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              bottom: 25,
              position: "absolute",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                height: 50,
                borderRadius: 25,
                width: 248,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 15 }}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearBg: {
    flex: 1,
    // padding: 20,
  },
});
