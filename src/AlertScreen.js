import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/const/colors";
import { useNavigation } from "@react-navigation/native";

const AlertScreen = () => {
  const navigation = useNavigation();
  const backBtn = () => {
    navigation.goBack();
  };
  const [openModal, setOpenModal] = useState(false);
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
          }}
        >
          <TouchableOpacity onPress={backBtn}>
            <Icon name="chevron-back" color={colors.primary} size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Icon name="information-circle" color={colors.primary} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>ALERT SCREEN</Text>
        </View>
        {/* MODAL VIEW */}
        <Modal animationType="slide" transparent={true} visible={openModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
                <Text>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Hello World!</Text>
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
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
