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
import {
  DrawerActions,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import LevelCard from "./LevelCard";
import { supabase } from "./supabaseClient"; // Import Supabase client
import UnitCard from "./UnitCard";

const HomeScreen = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const tmer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(tmer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(currentDateTime)
    .toUpperCase();

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    timeStyle: "short",
  }).format(currentDateTime);

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("default");

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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

        const messages = [];
        if (tss > 60) messages.push("TSS ALERT!");
        if (tds_ppm > 500) messages.push("TDS ALERT!");
        if (temperature > 40) messages.push("Temperature ALERT!");
        if (pH < 6.0 || pH > 9.0) messages.push("pH ALERT!");

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
      return;
    }

    const interval = setInterval(fetchDataAndAlert, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setAlertVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "tss":
        return (
          <LevelCard
            label="TSS"
            value={data.tss !== null ? data.tss : "Loading..."}
            unit="mg/L"
            formattedDate={formattedDate}
            formattedTime={formattedTime}
            min={0}
            max={50}
          />
        );
      case "temperature":
        return (
          <LevelCard
            label="Temp"
            value={data.temperature !== null ? data.temperature : "Loading..."}
            unit="°C"
            date={formattedDate}
            time={formattedTime}
            min={26}
            max={30}
          />
        );
      case "ph":
        return (
          <LevelCard
            label="pH"
            value={data.pH !== null ? data.pH : "Loading..."}
            unit=""
            date={formattedDate}
            time={formattedTime}
            min={6.5}
            max={8.5}
          />
        );
      default:
        return (
          <LevelCard
            label="TDS"
            value={data.tds_ppm !== null ? data.tds_ppm : "Loading..."}
            unit="PPM"
            date={formattedDate}
            time={formattedTime}
            min={0}
            max={500}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.linearBg}
        source={require("../assets/img/bg.png")}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="menu" color={colors.primary} size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {alertVisible && (
            <Modal animationType="fade" transparent visible={alertVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={{ alignSelf: "flex-end" }}>
                    <TouchableOpacity onPress={() => setAlertVisible(false)}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: colors.primary,
                          fontWeight: "bold",
                        }}
                      >
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Image source={require("../assets/warning.png")} />
                  <Text style={styles.modalText}>{alertMessage}</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontStyle: "italic",
                      textAlign: "center",
                      maxWidth: 210,
                      color: "rgba(0, 0, 0, .50)",
                    }}
                  >
                    An abnormal level is detected in some of the parameters.
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setAlertVisible(false);
                      navigation.navigate("Alert");
                    }}
                  >
                    <Text style={styles.modalButtonText}>View Alert</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          <View style={styles.cardContainer}>{renderTabContent()}</View>
          <LinearGradient
            colors={["rgba(255,254,254,1)", "rgba(122,11,203,0.1)"]}
            style={styles.gradientContainer}
          >
            <View style={styles.locationCard}>
              <View style={styles.locationContent}>
                <Image
                  style={styles.locationImage}
                  source={require("../assets/parameters/map.png")}
                />
                <Text style={styles.locationText}>
                  {data.location !== null ? data.location : "Loading..."}
                </Text>
              </View>
            </View>
            <View style={styles.unitCardsContainer}>
              <View style={styles.unitCardRow}>
                <TouchableOpacity
                  style={styles.unitCard}
                  onPress={() => handleTabChange("default")}
                >
                  <UnitCard
                    clip={require("../assets/parameters/turbidity.png")}
                    param="Total Dissolved Solids"
                    value={data.tds_ppm !== null ? data.tds_ppm : "Loading..."}
                    unit="PPM"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unitCard}
                  onPress={() => handleTabChange("tss")}
                >
                  <UnitCard
                    clip={require("../assets/parameters/tss.png")}
                    param="Total Suspended Solids"
                    value={data.tss !== null ? data.tss : "Loading..."}
                    unit="mg/L"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.unitCardRow}>
                <TouchableOpacity
                  style={styles.unitCard}
                  onPress={() => handleTabChange("temperature")}
                >
                  <UnitCard
                    clip={require("../assets/parameters/temp.png")}
                    param="Temperature"
                    value={
                      data.temperature !== null
                        ? data.temperature
                        : "Loading..."
                    }
                    unit="°C"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unitCard}
                  onPress={() => handleTabChange("ph")}
                >
                  <UnitCard
                    clip={require("../assets/parameters/ph.png")}
                    param="pH"
                    value={data.pH !== null ? data.pH : "Loading..."}
                    unit=""
                  />
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
    //justifyContent: 'center', // Center vertically
    //alignItems: 'center',
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
    gap: 20,
  },
  modalText: {
    fontSize: 20,
    // marginBottom: 20,
    textAlign: "center",
    fontWeight: "900",
    color: "#E41717",
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    width: 237,
  },
  modalButtonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
  },
  cardContainer: {
    flex: 1,
    marginVertical: 5,
    width: 300,
  },
  gradientContainer: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: colors.primaryLower,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 25,
  },
  locationCard: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 5,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    elevation: 10,
    height: 120,
  },
  locationContent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  locationImage: {
    width: 61,
    height: 70,
  },
  locationText: {
    maxWidth: 150,
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,
  },
  unitCardsContainer: {
    flex: 2,
  },
  unitCardRow: {
    flex: 1,
    flexDirection: "row",
  },
  unitCard: {
    flex: 1,
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 5,
  },
});
