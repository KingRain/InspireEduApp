import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import ResourcesScreen from "./screens/ResourcesScreen";
import { Ionicons } from '@expo/vector-icons';

import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Attendance") {
            iconName = "calendar-outline";
          } else if (route.name === "Results") {
            iconName = "bar-chart-outline";
          } else if (route.name === "Resources") {
            iconName = "book-outline";
          } else if (route.name === "Home") {
            iconName = "home-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { 
          height: 80,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          backgroundColor: "#080a0a", 
          borderColor: "#ffffff", 
          padding: 10,
          paddingBottom: 15,
          paddingTop: 15
        },
        tabBarActiveTintColor: "#e6e7e8",
        tabBarInactiveTintColor: "#8f8f8f",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
      setIsLoading(false);
    };

    const listener = setInterval(checkLoginStatus, 500); 
    return () => clearInterval(listener);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
