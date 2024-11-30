import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { DrawerActions, useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import LevelCard from "./LevelCard";
import { supabase } from "./supabaseClient"; // Import Supabase client

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

    // ALERT
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const isFocused = useIsFocused();

    const [data, setData] = useState({
      temperature: null,
      tss: null,
      tds_ppm: null,
      pH: null,
      location: null,
    });
    
    // Fetch sensor data from Supabase
    const fetchDataAndAlert = async () => {
      try {
        const { data: sensorData, error } = await supabase
          .from("sensor_data")
          .select("temperature, tss, tds_ppm, pH, location")
          .order("timestamp", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching sensor data:", error.message);
          return;
        }

        if (sensorData && sensorData[0]) {
          const { temperature, tss, tds_ppm, pH } = sensorData[0];
          setData(sensorData[0]);

          // Check thresholds
          const messages = [];
          if (tss > 30) messages.push("TSS ALERT!");
          if (tds_ppm > 30) messages.push("TDS ALERT!");
          if (temperature > 30) messages.push("Temperature ALERT!");
          if (pH < 6.5 || pH > 8.5) messages.push("pH ALERT!");

          if (messages.length > 0) {
            setAlertMessage(messages.join("\n"));
            setAlertVisible(true);
          } else {
            setAlertVisible(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  useEffect(() => {
    if (!isFocused) {
      // If we're not on the HomeScreen, stop fetching data
      return;
    }

    // Fetch data every 2 seconds when the HomeScreen is focused
    const interval = setInterval(fetchDataAndAlert, 2000);

    return () => {
      clearInterval(interval);  // Cleanup when the screen is unfocused
    };
  }, [isFocused]); // Run this effect whenever the focus changes

  useEffect(() => {
    // Reset alert when navigating to the "Alert" screen
    const unsubscribe = navigation.addListener("focus", () => {
      setAlertVisible(false);  // Reset alert visibility
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [navigation]);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "tss":
        return (
          <LevelCard
            label="TSS"
            value={data.tds_ppm !== null ? data.tds_ppm : "Loading..."}
            unit="mg/L"
            formattedDate={formattedDate}
            formattedTime={formattedTime}
            min={26} // Minimum acceptable turbidity
            max={30} // Maximum acceptable turbidity
          />
        );
      case "temperature":
        return (
          <Text>
            <LevelCard
              label="Temp"
              value={data.temperature !== null ? data.temperature : "Loading..."} // Example value
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
          <Text>
            <LevelCard
              label="pH"
              value={data.pH !== null ? data.pH : "Loading..."} // Example value
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
          <Text>
            <LevelCard
              label="Turbidity"
              value={data.tss !== null ? data.tss : "Loading..."}
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

        {/* ALERT MODAL */}
          {alertVisible && (
          <Modal animationType="fade" transparent visible={alertVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{alertMessage}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setAlertVisible(false);  // Close the modal when pressing the button
                    navigation.navigate("Alert");  // Navigate to Alert screen
                  }}
                >
                  <Text style={styles.modalButtonText}>Go to Alerts</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          )}
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
                  {/* Unnamed Road, West Gate, Cagayan de Oro City */}
                  {data.location !== null ? data.location : "Loading..."}
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
                      TSS
                    </Text>
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>
                      {/* 15 NTU */}
                      {data.tss !== null ? data.tss : "Loading..."}
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
                      TOTAL DISSOLVED SOLIDS
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "800" }}>
                      {/* 200 mg/L */}
                      {data.tds_ppm !== null ? data.tds_ppm : "Loading..."}
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
                      {/* 33°C */}
                      {data.temperature !== null ? data.temperature : "Loading..."}°C
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
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>
                      {/* 5 */}
                      {data.pH !== null ? data.pH : "Loading..."}
                    </Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: { color: "white", fontWeight: "bold" },
});
