import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_API_KEY, GOOGLE_SHEETS_ID } from '../config';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch credentials from Google Sheets
  const fetchCredentials = async () => {
    try {
      const spreadsheetId = GOOGLE_SHEETS_ID; // Replace with your Google Sheet ID
      const range = "LoginCreds!A2:B11"; // Replace with your data range
      const apiKey = GOOGLE_API_KEY; // Replace with your API key

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.values || [];
    } catch (error) {
      console.error('Error fetching credentials:', error);
      return [];
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);
    const credentials = await fetchCredentials();
    setLoading(false);

    const user = credentials.find(
      ([storedUsername, storedPassword]) =>
        storedUsername === username && storedPassword === password
    );

    if (user) {
      Alert.alert('Login Successful', 'Welcome to the app!');
      await AsyncStorage.setItem('isLoggedIn', 'true'); // Save login state
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#ffffff"
        value={username}
        onChangeText={setUsername}
        inputMode='tel'
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#ffffff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Button title="Login" onPress={handleLogin} color="#7ed158" borderRadius="12px" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 12,
    padding: 12,
    color: "#fff"
  },

});

export default LoginScreen;
