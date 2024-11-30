import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet, Text, View } from "react-native";
import LandingScreen from "./src/LandingScreen";
import HomeScreen from "./src/HomeScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AlertScreen from "./src/AlertScreen";
import AboutUs from "./src/AboutUs";
import HistoryScreen from "./src/HistoryScreen";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "./assets/const/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["rgba(255,254,254,1)", "rgba(122,11,203,0.6)"]}
      >
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerHeader}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../riverMonitor/assets/img/logo.png")}
            />
          </View>
          <DrawerItemList {...props} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginVertical: 13,
            }}
          >
            {/* <DrawerItem
              label="Version 1.0"
              icon={() => (
                <Icon name="exit-outline" color={colors.primary} size={18} />
              )}
            /> */}
            <View style={{ flexDirection: "row", gap: 30 }}>
              <Icon name="layers" size={20} color={colors.white} />
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Version
              </Text>
            </View>
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}
            >
              1.0
            </Text>
          </View>
        </DrawerContentScrollView>
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            // onPress={() => navigation.dispatch(StackActions.popToTop())}
            icon={() => <Icon name="exit" color={colors.white} size={20} />}
            label="Exit"
            labelStyle={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          color: colors.white,
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          drawerIcon: () => <Icon name="home" size={20} color={colors.white} />,
        }}
      />
      <Drawer.Screen
        name="Alert"
        component={AlertScreen}
        options={{
          title: "Alert",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="bell-alert"
              size={20}
              color={colors.white}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          title: "About Us",
          drawerIcon: () => (
            <Icon name="people-circle" size={20} color={colors.white} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "History",
          drawerIcon: () => (
            <Icon name="time" size={20} color={colors.white} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Main" component={HomeDrawer} />
        <Stack.Screen name="Alert" component={AlertScreen} />
        <Stack.Screen name="About" component={AboutUs} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerHeader: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: colors.white,
    borderTopWidth: 1,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
});
