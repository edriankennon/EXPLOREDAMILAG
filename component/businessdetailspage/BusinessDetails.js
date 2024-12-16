import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Ensure setDoc is imported
import app from '../../src/config/firebase';

// Get the screen dimensions
const { width } = Dimensions.get('window');
const scaleSize = (size) => (width / 375) * size; // 375 is the width of iPhone 6, a standard reference device
const scaleFont = (size) => (width / 375) * size;

const BusinessDetails = ({ route, navigation }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false); // State to manage overview toggle
  const [isFavorited, setIsFavorited] = useState(false); // State for heart button

  const db = getFirestore(app);

  const { uid } = route.params || {}; // Retrieve the `uid` from route params

  useEffect(() => {
    if (!uid) {
      console.error('No uid provided!');
      setLoading(false);
      return;
    }

    const fetchBusinessDetails = async () => {
      try {
        const docRef = doc(db, 'users', uid); // Query Firestore 'users' collection with the `uid`
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Fetched Business Data:', docSnap.data());
          setBusiness(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching business details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [uid]);

  const cleanData = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
  };

  const handleFavoriteToggle = async () => {
    setIsFavorited(!isFavorited);
  
    const userId = 'currentUserId'; // Replace with actual user ID
    const favoritesRef = doc(db, 'users', userId);
  
    try {
      const docSnap = await getDoc(favoritesRef);
  
      let updatedFavorites = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        updatedFavorites = data.favorites || [];
      }
  
      if (isFavorited) {
        // Remove from favorites
        updatedFavorites = updatedFavorites.filter((item) => item.uid !== business.uid);
      } else {
        // Add to favorites
        const cleanedBusiness = cleanData(business); // Clean the business object
        updatedFavorites.push({ uid: business.uid, ...cleanedBusiness });
      }
  
      // Clean the entire updatedFavorites array
      const cleanedFavorites = updatedFavorites.map((fav) => cleanData(fav));
  
      await setDoc(favoritesRef, { favorites: cleanedFavorites }, { merge: true });
      console.log('Favorites updated successfully!');
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };
  
  // Handle loading state
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading business details...</Text>
      </View>
    );
  }

  // Handle case where business is not found
  if (!business) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Business details not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main Image with Overlayed Header */}
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

      {/* Business Details */}
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{business.businessName || 'Unnamed Business'}</Text>
          {/* Heart button */}
          <TouchableOpacity onPress={handleFavoriteToggle} style={styles.heartButton}>
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorited ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>{business.location || 'Unknown Location'}</Text>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name="star" size={scaleSize(20)} color="gold" />
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.overviewTitle}>OVERVIEW</Text>
        <Text style={styles.description}>
          {expanded ? business.overview : `${business.overview?.slice(0, 100)}...`}
        </Text>

        <TouchableOpacity
          style={styles.readMoreButton}
          onPress={() => setExpanded(!expanded)} // Toggle expanded state
        >
          <Text style={styles.readMoreButtonText}>
            {expanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>

        <View style={styles.actionContainer}>
  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('LocationScreen', { business })}
  >
    <Ionicons name="location-outline" size={scaleSize(30)} color="black" />
    <Text style={styles.actionText}>Location</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('GuidelinesScreen', { business })}
  >
    <Ionicons name="book-outline" size={scaleSize(30)} color="black" />
    <Text style={styles.actionText}>Guidelines</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('PricesScreen', { business })}
  >
    <Ionicons name="wallet-outline" size={scaleSize(30)} color="black" />
    <Text style={styles.actionText}>Prices</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('ContactUsScreen', { business })}
  >
    <Ionicons name="call-outline" size={scaleSize(30)} color="black" />
    <Text style={styles.actionText}>Contact Us</Text>
  </TouchableOpacity>
</View>


        <TouchableOpacity style={styles.goThereButton}>
          <Text style={styles.goThereButtonText}>Go there now!</Text>
        </TouchableOpacity>

        <View style={styles.photosContainer}>
          <Text style={styles.photosTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {business.businessImages?.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.photo} />
            )) || <Text>No photos available</Text>}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: scaleSize(280),
    borderBottomLeftRadius: scaleSize(20),
    borderBottomRightRadius: scaleSize(20),
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: scaleSize(60),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(15),
    paddingTop: scaleSize(10),
  },
  iconButton: {
    padding: scaleSize(5),
  },
  infoContainer: {
    padding: scaleSize(20),
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  heartButton: {
    padding: scaleSize(5),
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: '#7A7A7A',
    marginBottom: scaleSize(2),
    width: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: scaleSize(50),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDetail: {
    fontSize: scaleFont(14),
    color: 'black',
    marginLeft: scaleSize(5),
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#4CAF50',
    marginVertical: scaleSize(15),
  },
  overviewTitle: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scaleSize(30),
    width: '100%',
  },
  description: {
    fontSize: scaleFont(16),
    color: '#333',
    textAlign: 'center',
    marginVertical: scaleSize(10),
    paddingHorizontal: scaleSize(10),
    lineHeight: scaleSize(24),
  },
  readMoreButton: {
    backgroundColor: '#32a852',
    paddingVertical: scaleSize(10),
    alignItems: 'center',
    borderRadius: scaleSize(50),
    width: '80%',
    marginTop: scaleSize(20),
  },
  readMoreButtonText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
    width: '100%',
    paddingHorizontal: scaleSize(20),
  },
  actionButton: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: scaleSize(10),
    paddingVertical: scaleSize(20),
    alignItems: 'center',
    marginVertical: scaleSize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: scaleSize(1.41),
    elevation: 2,
  },
  actionText: {
    fontSize: scaleFont(14),
    color: '#333',
    marginTop: scaleSize(10),
    fontWeight: '500',
  },
  goThereButton: {
    backgroundColor: '#32a852',
    paddingVertical: scaleSize(10),
    alignItems: 'center',
    borderRadius: scaleSize(50),
    width: '80%',
    marginTop: scaleSize(20),
  },
  goThereButtonText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  photosContainer: {
    width: '100%',
    marginTop: scaleSize(20),
  },
  photosTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
  },
  photo: {
    width: scaleSize(120),
    height: scaleSize(180),
    borderRadius: scaleSize(15),
    marginHorizontal: scaleSize(8),
  },
});

export default BusinessDetails;