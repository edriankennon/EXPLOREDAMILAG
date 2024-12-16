import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GuidelinesScreen = ({ route }) => {
  const navigation = useNavigation();
  const { business } = route.params || {}; // Access the business object passed through navigation

  if (!business) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No business data provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: business.businessImages?.[0] || 'https://via.placeholder.com/400x300' }}
          style={styles.mainImage}
        />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>{business.businessName || 'Business Name'}</Text>
        <Text style={styles.subtitle}>{business.location || 'Location not available'}</Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>{business.address || 'No address available'}</Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* Guidelines Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.guidelinesTitleContainer}>
          <Text style={styles.guidelinesTitle}>GUIDELINES</Text>
        </View>
        <Text style={styles.guidelinesText}>
          {business.guidelines || 'No guidelines available for this business.'}
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
    top: 40,
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
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GuidelinesScreen;
