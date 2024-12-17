import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PricesScreen = ({ route, navigation }) => {
  const { business } = route.params || {};
  const scrollViewRef = useRef();

  if (!business) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Business details not found.</Text>
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

      {/* Content */}
      <ScrollView ref={scrollViewRef} style={styles.content}>
        {/* Business Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{business.businessName || 'Business Name'}</Text>
          <Text style={styles.subtitle}>{business.location || 'Location not available'}</Text>

          {/* Star Rating */}
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, i) => (
              <Ionicons key={i} name="star" size={20} color="gold" />
            ))}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>MENU</Text>
          {Array.isArray(business.prices) && business.prices.length > 0 ? (
            business.prices.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <Image
                  source={{
                    uri: business.businessImages?.[index % business.businessImages.length] || 'https://via.placeholder.com/80x80',
                  }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price?.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noMenuText}>No menu items available.</Text>
          )}
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
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
  },
  menuSection: {
    marginTop: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 16,
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
  noMenuText: {
    fontSize: 16,
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 10,
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

export default PricesScreen;
