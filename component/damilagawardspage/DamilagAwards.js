import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width, height } = Dimensions.get('window');

export default function DamilagAchievements() {
  const navigation = useNavigation(); // Access navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="green" />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../../assets/achievements.png')} style={styles.logo} />
      
      {/* Title */}
      <Text style={styles.title}>BARANGAY ACHIEVEMENTS</Text>
      
      {/* Achievements Grid */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <Image source={require('../../assets/award1.png')} style={styles.image} />
          <Text style={styles.description}>BEST INTERVENTION PROGRAM FOR CHILDREN AT RISK</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/award2.png')} style={styles.image} />
          <Text style={styles.description}>MATURE LEVEL OF FUNCTIONALITY</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16, // Keep horizontal padding
    paddingVertical: 0, // Remove vertical padding
    backgroundColor: '#fff',
    flexGrow: 1, // Ensures ScrollView content expands properly
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your UI
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: width * 0.45, // Larger logo size
    height: width * 0.45,
    marginTop: height * 0.1, // Adjust to make room for the back button
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: 20, // Larger font size for the title
    fontWeight: 'bold',
    marginBottom: height * 0.02, // Slightly reduced spacing
    textAlign: 'center',
    color: 'green',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Enable wrapping to the next row
    justifyContent: 'space-around', // Space between items
    width: '100%',
    marginTop: height * 0.02,
  },
  card: {
    alignItems: 'center',
    marginBottom: 20, // Add spacing between rows
    width: width * 0.4, // Adjusted card width for consistent grid alignment
  },
  image: {
    width: width * 0.35,
    height: width * 0.2,
    borderRadius: 9,
    marginBottom: 10, // Add spacing between image and description
  },
  description: {
    fontSize: width * 0.034,
    textAlign: 'center',
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'medium',
  },
});

