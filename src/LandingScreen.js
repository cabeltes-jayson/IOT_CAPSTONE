import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../assets/const/colors";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigation = useNavigation();

  const proceedBtn = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/img/bg.png")}
    >
      <View style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
        <Image source={require("../assets/img/logo.png")} style={styles.logo} />
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 15 }}
        >
          <Text
            style={{
              fontSize: 33,
              color: colors.primary,
              textShadowColor: "rgba(0, 0, 0, 0.50)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            W A T E R B E N D E R S
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontStyle: "italic",
              color: colors.primary,
            //   maxWidth: 200,
              textAlign: "center",
            }}
          >
            Protecting rivers today for a healthier tomorrow. Monitor, maintain,
            and preserve the lifelines of our planet.
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={proceedBtn}
          style={{
            backgroundColor: colors.primary,
            marginHorizontal: 5,
            borderRadius: 25,
            height: 50,
            width: 248,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 18 }}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 30,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
