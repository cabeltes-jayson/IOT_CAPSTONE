import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabaseClient"; // Import Supabase client

const AlertScreen = () => {
  const navigation = useNavigation();
  const backBtn = () => {
    navigation.goBack();
  };

  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    temperature: null,
    tds_ppm: null,
    tss: null,
    pH: null,
    location: null,
  });

  const remarkMessage = (value, normalRange, concernRange) => {
    if (value === null || value === undefined) return "Loading...";
    if (value >= normalRange[0] && value <= normalRange[1]) {
      return "in Good Levels.";
    } else if (value < concernRange[0] || value > concernRange[1]) {
      return "shows Abnormal Measurements!";
    } else {
      return "in acceptable range."; // ex: temp: normal kay 26-30 so ang acceptable range kay 30-40
    }
  };

  // AQUATIC THRESHOLD BASED ON CLENRO DAO EXCEPT TDS
  const getRemarks = () => {
    const tssStatus = remarkMessage(data.tss, [0, 50], [0, 60]); // Normal: 0-50, Concern: >60
    const pHStatus = remarkMessage(data.pH, [6.5, 8.5], [6.0, 9.0]); // Normal: 6.5-8.5, Concern: <6.0 or >9.0
    const tempStatus = remarkMessage(data.temperature, [26, 30], [26, 40]); // Normal: 26-30, Concern: >40
    const tdsStatus = remarkMessage(data.tds_ppm, [0, 1000], [0, 2000]); // TDS thresholds remain unchanged
  
    return `TSS ${tssStatus}\nTemperature ${tempStatus}\nTDS ${tdsStatus}\nPH ${pHStatus}`;
  };  

  // Explanation:
  // Temperature: gi set nako na abnormal ang >40 kay lets say normal ang 26-30 tas nilahos sa 
  // 30 basin mu balik ra dayn siya sa normal ranges so ayun more than 40 is abnormal na dayn.
  // same sa other parameters nag set kug gamay lang na kibali extension para sa concern.

  // THRESHOLDS BASED ON CLENRO
  // Class A Parameters:
  // pH: 6.5-8.5
  // Temperature: 26-30
  // Total Suspended Solids: 50
  
  // TDS based on average river 
  // - Normal: <1000 mg/L (optimal)
  // - Concern: >2000 mg/L (stress on aquatic life)

  const fetchData = async () => {
    try {
      const { data: sensor_data, error } = await supabase
        .from("sensor_data")
        .select("temperature, tss, tds_ppm, pH, location")
        .order("timestamp", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching data:", error.message); // Change this to log the error message
      } else {
        setData(sensor_data[0] || {});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 30,
            paddingHorizontal: 25,
          }}
        >
          <TouchableOpacity onPress={backBtn}>
            <Icon name="chevron-back" color={colors.primary} size={25} />
          </TouchableOpacity>
          <Text style={{ color: colors.primary, fontSize: 20 }}>Alert</Text>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Icon name="information-circle" color={colors.primary} size={25} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            padding: 25,
            gap: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: colors.primary,
                fontWeight: "500",
              }}
            >
              {" "}
              Details{" "}
            </Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.primaryLower,
              borderBottomWidth: 1,
              borderBottomColor: colors.primaryLower,
              paddingVertical: 20,
              // gap: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.primaryLower,
                fontWeight: "600",
              }}
            >
              Location:
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.primary,
                  fontWeight: "600",
                  maxWidth: 300,
                }}
              >
                {/* #7000 Lapasan, CDOC */}
                {data.location !== null ? data.location : "Loading..."}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: colors.primaryLower,
              paddingVertical: 20,
              // gap: 15,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.primaryLower,
                  fontWeight: "600",
                }}
              >
                TSS:
              </Text>
              <Text
                style={{ fontSize: 20, color: colors.red, fontWeight: "600" }}
              >
                {data.tss !== null ? data.tss : "Loading..."}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  fontStyle: "italic",
                }}
              >
                (Normal: 6.5-8.5)
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: colors.primaryLower,
              paddingVertical: 20,
              // gap: 15,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.primaryLower,
                  fontWeight: "600",
                }}
              >
                TDS:
              </Text>
              <Text
                style={{ fontSize: 20, color: colors.red, fontWeight: "600" }}
              >
                {data.tds_ppm !== null ? data.tds_ppm : "Loading..."}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  fontStyle: "italic",
                }}
              >
                (Normal: 6.5-8.5)
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: colors.primaryLower,
              paddingVertical: 20,
              // gap: 15,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.primaryLower,
                  fontWeight: "600",
                }}
              >
                Temp:
              </Text>
              <Text
                style={{ fontSize: 18, color: colors.red, fontWeight: "600" }}
              >
                {data.temperature !== null ? data.temperature : "Loading..."}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  fontStyle: "italic",
                }}
              >
                (Normal: 6.5-8.5)
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.primaryLower,
              paddingVertical: 20,
              // gap: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.primaryLower,
                  fontWeight: "600",
                }}
              >
                pH:
              </Text>
              <Text
                style={{ fontSize: 18, color: colors.red, fontWeight: "600" }}
              >
                {data.pH !== null ? data.pH : "Loading..."}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  fontStyle: "italic",
                }}
              >
                (Normal: 6.5-8.5)
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.primaryLower,
              paddingVertical: 20,
              // gap: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.primaryLower,
                fontWeight: "600",
              }}
            >
              Remarks:
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.primary,
                  fontWeight: "600",
                  maxWidth: 300,
                }}
              >
                 {getRemarks()}
              </Text>
            </View>
          </View>
        </View>

        {/* MODAL VIEW */}
        <Modal animationType="slide" transparent={true} visible={openModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Water Quality Guidelines for Primary Parameters according to DAO
                No. 2016-08
              </Text>

              <View
                style={{
                  gap: 10,
                  backgroundColor: colors.white,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  borderRadius: 24,
                  gap: 20,
                }}
              >
                <View style={styles.paramDiv}>
                  <View style={styles.parameter}>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      Turbidity
                    </Text>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      ≤ 100
                    </Text>
                  </View>
                  <View style={styles.unit}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      NTU
                    </Text>
                  </View>
                </View>
                <View style={styles.paramDiv}>
                  <View style={styles.parameter}>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      pH
                    </Text>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      6.5 - 8.5
                    </Text>
                  </View>
                  <View style={styles.unit}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      -
                    </Text>
                  </View>
                </View>
                <View style={styles.paramDiv}>
                  <View style={styles.parameter}>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      Temperature
                    </Text>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      26 - 30
                    </Text>
                  </View>
                  <View style={styles.unit}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      °C
                    </Text>
                  </View>
                </View>
                <View style={styles.paramDiv}>
                  <View style={styles.parameter}>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      TDS
                    </Text>
                    <Text style={{ fontSize: 20, color: colors.primary }}>
                      50
                    </Text>
                  </View>
                  <View style={styles.unit}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      mg/L
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setOpenModal(!openModal)}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 80,
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearBg: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  modalView: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 20,
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  innerView: {
    borderRadius: 14,
  },
  modalText: {
    color: colors.white,
    fontSize: 23,
    textAlign: "center",
    fontWeight: "700",
  },
  paramDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  parameter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 75,
    padding: 10,
    borderRadius: 14,
    borderBottomWidth: 2,
    borderColor: colors.primary,
    width: 300,
  },
  unit: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: colors.white,
    width: 55,
  },
});
