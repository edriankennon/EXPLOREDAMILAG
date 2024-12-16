import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LocationScreen = ({ route }) => {
  const { business } = route.params || {};

  if (!business) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No business data provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>
      <Text style={styles.infoText}>Address: {business.location || 'No location available.'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

export default LocationScreen;
