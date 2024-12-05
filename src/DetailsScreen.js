import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/const/colors";

const DetailsScreen = () => {
  const navigation = useNavigation();
  const backBtn = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
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
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 20,
                }}
              >
                Details
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={styles.headerTopBar}>
              <Text style={styles.headerTopBarText}>
                DENR Administrative Order 2016-08
              </Text>
            </View>
            <Text style={{ fontSize: 17, textAlign: "center" }}>
              The researchers reviewed the Department of Environment and Natural
              Resources (DENR) Administrative Order (DAO) 2016-08, which
              outlines the Water Quality Guidelines and Effluent Standards of
              2016. The table below shows the main water quality standards:
            </Text>
            <View style={styles.header}>
              <Text style={styles.heading}>Parameter</Text>
              <Text style={styles.heading}>Acceptable Range</Text>
              <Text style={styles.heading}>Significance</Text>
              <Text style={styles.heading}>Impact</Text>
            </View>
            {/* pH parameter */}
            <View style={styles.header}>
              <Text style={{ width: 100, fontSize: 18, fontWeight: "500" }}>
                pH
              </Text>
              <Text style={{ width: 100, fontSize: 18, fontWeight: "500" }}>
                6.5–8.5
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Ensures water is neither too acidic nor too alkaline,
                safeguarding aquatic ecosystems.
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Acidic water increases metal solubility; alkaline water reduces
                nutrient availability, both harming aquatic life.
              </Text>
            </View>
            {/* temp */}
            <View style={styles.header}>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Temperature
              </Text>
              <Text style={{ width: 100, fontSize: 18, fontWeight: "500" }}>
                26–30°C
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Supports aquatic life and prevents thermal stress.
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Lower temperatures slow metabolism; higher temperatures reduce
                dissolved oxygen and promote algal blooms.
              </Text>
            </View>
            {/* TSS */}
            <View style={styles.header}>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Total Suspendend Solids
              </Text>
              <Text style={{ width: 100, fontSize: 18, fontWeight: "500" }}>
                50 mg/L
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Prevents sedimentation and ensures water clarity for aquatic
                habitats.
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                High TSS reduces sunlight penetration, affects photosynthesis,
                and smothers habitats.
              </Text>
            </View>
            <Text style={{ textAlign: "center", maxWidth: 300 }}>
              Table 1: Water Quality Guidelines and General Effluent Standards
              (DAO 2016-08)
            </Text>
            <View style={styles.headerTopBar}>
              <Text style={styles.headerTopBarText}>
                Philippine Standards for Drinking Water
              </Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 17 }}>
              The researchers reviewed the Philippine National Standards for
              Drinking Water 2007 (PNSDW) to understand health risks in rivers
              where people might accidentally drink the water. These standards
              make sure the water is safe and doesn't have harmful minerals. The
              table below shows the main standard for water to be considered
              safe to drink:
            </Text>
            <View style={styles.header}>
              <Text style={styles.heading}>Parameter</Text>
              <Text style={styles.heading}>Acceptable Range</Text>
              <Text style={styles.heading}>Significance</Text>
              <Text style={styles.heading}>Impact</Text>
            </View>
            {/* TSS */}
            <View style={styles.header}>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Total Dissolved Solids
              </Text>
              <Text style={{ width: 100, fontSize: 18, fontWeight: "500" }}>
                ≤ 500 mg/L
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                Ensures water is safe for human consumption and free from
                excessive minerals affecting taste.
              </Text>
              <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                High TDS may signal contamination, affect taste, and harm
                ecosystems through mineral buildup and scaling.
              </Text>
            </View>
            <Text
              style={{ textAlign: "center", maxWidth: 300, marginBottom: 20 }}
            >
              Table 2: Philippine National Standards for Drinking Water (PNSDW
              2007)
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearBg: {
    flex: 1,
    // padding: 20,
  },
  headerTopBar: {
    backgroundColor: colors.primaryLower,
    padding: 10,
    borderRadius: 10,
  },
  headerTopBarText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  heading: {
    flex: 1,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "900",
  },
});
