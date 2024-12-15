import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const DamilagGuidelines = () => {
  const navigation = useNavigation(); // Access navigation

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/damilag.png')} style={styles.mainImage} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>Damilag</Text>
        <Text style={styles.subtitle}>Manolo Fortich, Bukidnon</Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>9R37+37X, Manolo Fortich, Bukidnon</Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* Guidelines Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.guidelinesTitleContainer}>
          <Text style={styles.guidelinesTitle}>GUIDELINES</Text>
        </View>
        <Text style={styles.guidelinesText}>
          Barangay Damilag, nestled in the heart of Manolo Fortich, Bukidnon, is renowned for its vibrant community spirit and commitment to sustainable development. The barangay prioritizes programs that empower residents, promote environmental conservation, and celebrate its rich cultural heritage. Visitors and locals alike admire Damilag for its clean, green spaces and its dedication to fostering a safe and inclusive environment for all. It has also earned recognition for its proactive initiatives in disaster preparedness, youth engagement, and livelihood development. With its strong leadership and active citizen participation, Barangay Damilag continues to be a model of growth, resilience, and unity in the region.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your UI
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '50%',
    marginTop: 80, // Adjust to make room for the back button
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: '100%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  locationDetail: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#4CAF50',
    marginVertical: 15,
  },
  contentContainer: {
    width: '90%',
    marginTop: 10,
  },
  guidelinesTitleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  guidelinesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  guidelinesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 22,
  },
});

export default DamilagGuidelines;
