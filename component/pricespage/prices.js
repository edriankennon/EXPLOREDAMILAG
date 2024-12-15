import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Prices = ({ route, navigation }) => {
  const { placeDetails } = route.params;

  // Reference to the ScrollView
  const scrollViewRef = useRef();

  if (!placeDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Place details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.imageContainer}>
        <Image source={placeDetails.images[0]} style={styles.mainImage} />
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView ref={scrollViewRef} style={styles.content}>
        {/* Place Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{placeDetails.name}</Text>
          <Text style={styles.subtitle}>Manolo Fortich, Bukidnon</Text>

          {/* Star Rating */}
          <View style={styles.ratingContainer}>
            {[...Array(placeDetails.rating)].map((_, i) => (
              <Ionicons key={i} name="star" size={20} color="gold" />
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>{placeDetails.location || 'No location available'}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>MENU</Text>
          {placeDetails.prices.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}// Example of navigation, replace with actual screen and params
            >
              <Image source={placeDetails.images[0]} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Back to Top Button */}
      <TouchableOpacity
        style={styles.backToTopButton}
        onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
      >
        <Text style={styles.backToTopText}>Back to top</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'flex-start',
  },
  name: {
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
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuSection: {
    marginTop: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  itemDetails: {
    padding: 10,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  backToTopButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  backToTopText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Prices;
