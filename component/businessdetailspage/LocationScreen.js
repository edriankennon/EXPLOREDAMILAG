import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LocationScreen = ({ route }) => {
  const navigation = useNavigation();
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
      {/* Header with Back Button */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: business.businessImages?.[0] || 'https://via.placeholder.com/400x300' }}
          style={styles.mainImage}
        />
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Location</Text>
        
        <View style={styles.divider} />

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>{business.location || 'No location available.'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    borderRadius: 50,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },

  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#4CAF50',
    marginVertical: 15,
    marginLeft: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '45%',
    marginBottom: '10%',
    alignContent: 'center',
    
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    marginLeft: 10,
    alignContent: 'center',
    
 },

  description: {
    marginTop: 70,
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 22,
    marginTop: 10,
  },

};

export default LocationScreen;
