import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function DamilagContact() {
  const navigation = useNavigation(); // Access navigation

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="green" />
      </TouchableOpacity>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/damilag.png')} style={styles.mainImage} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>Damilag</Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>purok 10, Manolo Fortich, Philippines</Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* Contact Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Contact Us</Text>
        </View>

        {/* Contact Items */}
        <View style={styles.contactItem}>
          <FontAwesome name="phone" size={24} color="#4CAF50" style={styles.icon} />
          <Text style={styles.contactText}>09090909</Text>
        </View>

        <View style={styles.contactItem}>
          <FontAwesome name="facebook-square" size={24} color="#4267B2" style={styles.icon} />
          <Text style={styles.contactText}>Damilag Barangay Council</Text>
        </View>

        <View style={styles.contactItem}>
          <FontAwesome name="envelope" size={24} color="#EA4335" style={styles.icon} />
          <Text style={styles.contactText}>damilagbc@gmail.com</Text>
        </View>
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
    width: '40%',
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 3,
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  icon: {
    marginRight: 15, // Spacing between the icon and the text
  },
  contactText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'left', // Align text to the left for better readability
    lineHeight: 24, // Ensure proper spacing between lines
  },
});
