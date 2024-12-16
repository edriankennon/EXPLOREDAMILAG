import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactUsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { business } = route.params || {}; // Access the business object passed from navigation

  // Function to handle sending an email
  const sendEmail = () => {
    const email = business.email || 'example@example.com';
    const subject = `Inquiry about ${business.businessName}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(mailtoUrl).catch((err) =>
      console.error('Failed to open email app:', err)
    );
  };

  // Function to handle dialing the phone number
  const dialPhoneNumber = () => {
    const phoneNumber = business.contact || '0000000000';
    const telUrl = `tel:${phoneNumber}`;
    Linking.openURL(telUrl).catch((err) =>
      console.error('Failed to open dialer:', err)
    );
  };

  // Function to handle opening Facebook page
  const openFacebookPage = () => {
    const facebookUrl = business.facebook || 'https://facebook.com';
    Linking.openURL(facebookUrl).catch((err) =>
      console.error('Failed to open Facebook page:', err)
    );
  };

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
        <Ionicons name="arrow-back" size={24} color="green" />
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

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>{business.location || 'Location not available'}</Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* Contact Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Contact Us</Text>
        </View>

        {/* Phone Number */}
        <View style={styles.contactItem}>
          <FontAwesome name="phone" size={24} color="#4CAF50" style={styles.icon} />
          <TouchableOpacity onPress={dialPhoneNumber}>
            <Text style={[styles.contactText, styles.linkText]}>{business.contact || 'No phone number available'}</Text>
          </TouchableOpacity>
        </View>

        {/* Facebook */}
        <View style={styles.contactItem}>
          <FontAwesome name="facebook-square" size={24} color="#4267B2" style={styles.icon} />
          <TouchableOpacity onPress={openFacebookPage}>
            <Text style={[styles.contactText, styles.linkText]}>{business.facebook || 'No Facebook page available'}</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.contactItem}>
          <FontAwesome name="envelope" size={24} color="#EA4335" style={styles.icon} />
          <TouchableOpacity onPress={sendEmail}>
            <Text style={[styles.contactText, styles.linkText]}>{business.email || 'No email available'}</Text>
          </TouchableOpacity>
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
    marginRight: 15,
  },
  contactText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'left',
    lineHeight: 24,
  },
  linkText: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

export default ContactUsScreen;
