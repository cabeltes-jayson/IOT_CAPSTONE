import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
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
      case "tds":
        return (
          <Text style={styles.tabContent}>Total Dissolved Solids Content</Text>
        );
      case "temperature":
        return <Text style={styles.tabContent}>Temperature Content</Text>;
      case "ph":
        return <Text style={styles.tabContent}>pH Levels Content</Text>;
      default:
        return <Text style={styles.tabContent}>Turbidity Level Content</Text>;
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
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {renderTabContent()}
          </View>
          <View
            style={{
              alignSelf: "stretch",
              flex: 2,
              backgroundColor: "white",
              marginVertical: 10,
              marginHorizontal: 10,
              padding: 20,
              borderRadius: 20,
              elevation: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                marginVertical: 15,
                marginHorizontal: 5,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>map/address</Text>
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
                    backgroundColor: "white",
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    elevation: 5,
                  }}
                  onPress={() => handleTabChange("default")}
                >
                  <Text>turbidity level</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    elevation: 5,
                  }}
                  onPress={() => handleTabChange("tds")}
                >
                  <Text>total dissolved solids</Text>
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
                    backgroundColor: "white",
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    elevation: 5,
                  }}
                  onPress={() => handleTabChange("temperature")}
                >
                  <Text>temperature</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    elevation: 5,
                  }}
                  onPress={() => handleTabChange("ph")}
                >
                  <Text>pH levels</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text> HOME SCREEN </Text>
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
    padding: 20,
  },
});
