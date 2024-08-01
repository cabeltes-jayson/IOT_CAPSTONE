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
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={backBtn}>
            <Icon name="chevron-back" color={colors.primary} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>ABOUT US</Text>
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
    padding: 20,
  },
});
