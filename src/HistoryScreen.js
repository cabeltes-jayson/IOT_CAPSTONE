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
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
            <Text style={{ color: colors.primary, fontSize: 20 }}>History</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 30 }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderWidth: 2,
              borderColor: colors.secondary,
              alignItems: "center",
              padding: 10,
              borderRadius: 50,
              width: "60%",
              alignSelf: "center",
              top: 20,
              zIndex: 1000,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.secondaryFont,
              }}
            >
              DARI ANG DATE
            </Text>
          </View>
          <LinearGradient
            colors={["rgba(148,220,245, 1)", "rgba(86, 128, 143, 0.1)"]}
            style={{
              gap: 10,
              padding: 30,
              borderWidth: 2,
              borderColor: colors.secondary,
              borderRadius: 50,
            }}
          >
            <View style={{ flex: 1, gap: 10 }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontStyle: "italic",
                    color: colors.secondaryFont,
                    fontWeight: 900,
                  }}
                >
                  LOCATION HERE
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      Total Suspended Solids :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      210{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      pH :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      210{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      Total Dissolved Solids :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      210{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      Temperature :
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.secondaryFont,
                        fontWeight: 600,
                      }}
                    >
                      210{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondaryFont,
                    fontWeight: 900,
                  }}
                >
                  Remarks:
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: colors.secondaryFont,
                    fontWeight: 600,
                  }}
                >
                  hsjkdhjkahdjsahd
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
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
