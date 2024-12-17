import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "./supabaseClient"; // Import Supabase client

export default function HistoryScreen() {
  const navigation = useNavigation();
  const backBtn = () => {
    navigation.goBack();
  };

  const [data, setData] = useState([]); // Array to store multiple records

  // const [data, setData] = useState({
  //   temperature: null,
  //   tds_ppm: null,
  //   tss: null,
  //   pH: null,
  //   location: null,
  //   timestamp: null,
  // });

  const fetchData = async () => {
    try {
      const { data: sensor_data, error } = await supabase
        .from("sensor_data")
        .select("temperature, tss, tds_ppm, pH, location, timestamp")
        .order("timestamp", { ascending: false })
        .limit(20); // Fetch the most recent 5 records

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setData(sensor_data || []); // Store the fetched data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const remarkMessage = (value, normalRange, concernRange) => {
    if (value === null || value === undefined) return "Loading...";
    if (value >= normalRange[0] && value <= normalRange[1]) {
      return "in Good Levels.";
    } else if (value < concernRange[0] || value > concernRange[1]) {
      return "shows Abnormal Measurements!";
    } else {
      return "in acceptable range.";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    
    // Format date
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
  
    // Format time to 12-hour
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  
    return {
      date: `${month}/${day}/${year}`,
      time: `${hours}:${minutes}:${seconds} ${amPm}`,
    };
  };  

  // New TDS-specific remark handler
  const tdsRemarkMessage = (record) => {
    if (record === null || record === undefined) return "Loading...";
    return record <= 500
      ? "in acceptable range."
      : "shows Abnormal Measurements!";
  };

  // AQUATIC THRESHOLD
  const getRemarks = (record) => {
    const tssStatus = remarkMessage(record.tss, [0, 50], [0, 60]);
    const pHStatus = remarkMessage(record.pH, [6.5, 8.5], [6.0, 9.0]);
    const tempStatus = remarkMessage(record.temperature, [26, 30], [26, 40]);
    const tdsStatus = tdsRemarkMessage(record.tds_ppm); // TDS-specific logic
    return `TSS ${tssStatus}\nPH ${pHStatus}\nTDS ${tdsStatus}\nTemperature ${tempStatus}`;
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 700); // Fetch data every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

        <ScrollView
          style={{ flex: 1, paddingHorizontal: 30, marginBottom: "5%" }}
        >
          {data.map((record, index) => (
            <View key={index}>
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
                  {/* DARI ANG DATE */}
                  {/* {data.timestamp !== null ? data.timestamp : "Loading..."} */}
                  {formatTimestamp(record.timestamp).date}
                </Text>
                <Text
                  style={{ fontWeight: "bold", color: colors.secondaryFont }}
                >
                  {/* DARI ANG TIME */}
                  {formatTimestamp(record.timestamp).time}
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
                      {/* LOCATION HERE */}
                      {/* {data.location !== null ? data.location : "Loading..."} */}
                      {record.location || "Loading..."}
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
                          {record.tss ?? "Loading..."}{" "}
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
                          {record.pH ?? "Loading..."}{" "}
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
                          {record.tds_ppm ?? "Loading..."}{" "}
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
                          {record.temperature ?? "Loading..."}{" "}
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
                      {getRemarks(record)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ))}
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
