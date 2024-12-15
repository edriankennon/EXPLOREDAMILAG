import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GuidelinesPage = ({ route, navigation }) => {
  const { guidelines, placeName, location, rating, image } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.mainImage} />
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>{placeName || 'No name available'}</Text>
        <Text style={styles.subtitle}>Manolo Fortich, Bukidnon</Text>

        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          {[...Array(rating || 0)].map((_, index) => (
            <Ionicons key={index} name="star" size={20} color="gold" />
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>{location || 'No location available'}</Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* Guidelines Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.guidelinesTitleContainer}>
          <Text style={styles.guidelinesTitle}>GUIDELINES</Text>
        </View>
        <Text style={styles.guidelinesText}>
          {guidelines || 'No guidelines provided for this place. Please check back later for updated information.'}
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
    top: 60,
    left: 15,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    borderRadius: 50,
  },
  infoContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: '100%',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 8,
    width: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 50,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  guidelinesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 24,
  },
});

export default GuidelinesPage;
