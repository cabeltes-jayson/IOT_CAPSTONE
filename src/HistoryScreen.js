import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Icon from "react-native-vector-icons/Ionicons";
  import colors from "../assets/const/colors";
  import { useNavigation } from "@react-navigation/native";

export default function HistoryScreen() {
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
                    History
                    </Text>
                </View>
            </View>
        </ImageBackground>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearBg: {
      flex: 1,
      // padding: 20,
    },
  });
