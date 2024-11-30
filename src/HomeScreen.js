import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import LevelCard from "./LevelCard";

const HomeScreen = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const tmer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(tmer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila", // Set to the desired timezone
    month: "short", // Short month format (e.g., NOV)
    day: "numeric",
    year: "numeric",
  })
    .format(currentDateTime)
    .toUpperCase();

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    timeStyle: "short", // Format for time
  }).format(currentDateTime);

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("default");

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tss":
        return (
          <LevelCard
            label="TSS"
            value={200}
            unit="mg/L"
            formattedDate={formattedDate}
            formattedTime={formattedTime}
            min={26} // Minimum acceptable turbidity
            max={30} // Maximum acceptable turbidity
          />
        );
      case "temperature":
        return (
          <Text style={styles.tabContent}>
            <LevelCard
              label="Temp"
              value={33} // Example value
              unit="°C"
              date={formattedDate}
              time={formattedTime}
              min={26} // Minimum acceptable turbidity
              max={30} // Maximum acceptable turbidity
            />
          </Text>
        );
      case "ph":
        return (
          <Text style={styles.tabContent}>
            <LevelCard
              label="pH"
              value={8} // Example value
              unit=""
              date={formattedDate}
              time={formattedTime}
              min={6.5}
              max={8.5}
            />
          </Text>
        );
      default:
        return (
          <Text style={styles.tabContent}>
            <LevelCard
              label="Turbidity"
              value={120}
              unit="NTU"
              date={formattedDate}
              time={formattedTime}
              min={0}
              max={100}
            />
          </Text>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.linearBg}
        source={require("../assets/img/bg.png")}
      >
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu" color={colors.primary} size={25} />
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              marginVertical: 10,
              width: 300,
            }}
          >
            {renderTabContent()}
          </View>
          <LinearGradient
            colors={["rgba(255,254,254,1)", "rgba(122,11,203,0.1)"]}
            style={{
              alignSelf: "stretch",
              flex: 1,
              backgroundColor: colors.primaryLower,
              marginVertical: 10,
              marginHorizontal: 10,
              padding: 15,
              borderRadius: 25,
            }}
          >
            <View
              style={{
                // flex: 1,
                backgroundColor: "white",
                marginVertical: 10,
                marginHorizontal: 5,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                elevation: 10,
                height: 110,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 20,
                }}
              >
                <Image
                  style={{ width: 61, height: 70 }}
                  source={require("../assets/parameters/map.png")}
                />
                <Text
                  style={{
                    maxWidth: 150,
                    color: colors.primary,
                    fontWeight: "600",
                    fontSize: 18,
                  }}
                >
                  Unnamed Road, West Gate, Cagayan de Oro City
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    marginVertical: 15,
                    marginHorizontal: 5,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    elevation: 10,
                  }}
                  onPress={() => handleTabChange("default")}
                >
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
                    <Image
                      source={require("../assets/parameters/turbidity.png")}
                    />
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      TURBIDITY LEVEL
                    </Text>
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>
                      15 NTU
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    marginVertical: 15,
                    marginHorizontal: 5,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    elevation: 10,
                  }}
                  onPress={() => handleTabChange("tss")}
                >
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
                    <Image source={require("../assets/parameters/tss.png")} />
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "bold",
                        color: colors.primary,
                      }}
                    >
                      TOTAL SUSPENDED SOLIDS
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "800" }}>
                      200 mg/L
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    elevation: 5,
                  }}
                  onPress={() => handleTabChange("temperature")}
                >
                  <View
                    style={{
                      flex: 1,

                      padding: 20,
                      justifyContent: "space-between",
                      // backgroundColor: colors.primaryLower,
                    }}
                  >
                    <Image source={require("../assets/parameters/temp.png")} />
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: colors.primary,
                      }}
                    >
                      TEMPERATURE
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "800" }}>
                      33°C
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    elevation: 5,
                  }}
                  onPress={() => handleTabChange("ph")}
                >
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      justifyContent: "space-between",
                      // backgroundColor: colors.primaryLower,
                    }}
                  >
                    <Image source={require("../assets/parameters/ph.png")} />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: colors.primary,
                      }}
                    >
                      pH
                    </Text>
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>5</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearBg: {
    flex: 1,
    padding: 10,
  },
});
