import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Resources = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resources Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Resources;
