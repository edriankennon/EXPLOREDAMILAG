import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import app from '../../src/config/firebase';

const FavoritesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const db = getFirestore(app);
  
  // Fetch favorites from Firestore on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = 'currentUserId'; // Replace with actual user ID
      const favoritesRef = doc(db, 'users', userId);

      try {
        const docSnap = await getDoc(favoritesRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const cleanedFavorites = (data.favorites || []).map((fav, index) => ({
            ...fav,
            uid: fav.uid || `temp-id-${index}`, // Ensure UID exists
          }));
          setFavorites(cleanedFavorites);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // Add an item to favorites
  const handleAddFavorite = async (item) => {
    const userId = 'currentUserId'; // Replace with actual user ID
    const favoritesRef = doc(db, 'users', userId);

    if (favorites.some((fav) => fav.uid === item.uid)) {
      Alert.alert('Already Added', 'This item is already in your favorites.');
      return;
    }

    const updatedFavorites = [...favorites, item];

    try {
      setFavorites(updatedFavorites); // Update local state
      await setDoc(favoritesRef, { favorites: updatedFavorites }, { merge: true }); // Update Firestore
      console.log('Favorite added successfully!');
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  // Filter places based on the search query
  const filteredPlaces = searchQuery
    ? favorites.filter((place) =>
        place.businessName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favorites;

  // Remove all favorites and update Firestore
  const handleRemoveAllFavorites = () => {
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all your favorite places?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: async () => {
            setFavorites([]); // Clear local favorites
            const userId = 'currentUserId'; // Replace with actual user ID
            const favoritesRef = doc(db, 'users', userId);
            try {
              await setDoc(favoritesRef, { favorites: [] }, { merge: true });
              console.log('Favorites removed successfully!');
            } catch (error) {
              console.error('Error removing favorites:', error);
            }
          },
        },
      ]
    );
  };

  // Render a single favorite card
  const renderFavorite = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BusinessDetails', { business: item })}
    >
      <Image
        source={{ uri: item.businessImages?.[0] || 'https://via.placeholder.com/100x100' }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>{item.businessName || 'Unknown Business'}</Text>
          <TouchableOpacity onPress={() => handleAddFavorite(item)}>
            <Ionicons
              name={favorites.some((fav) => fav.uid === item.uid) ? 'heart' : 'heart-outline'}
              size={24}
              color="#ff4d4d"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardSubtitle}>{item.location || 'Unknown Location'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Places</Text>
      </View>

      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#32a852" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleRemoveAllFavorites} style={styles.deleteIcon}>
            <Ionicons name="trash-outline" size={24} color="#ff4d4d" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item, index) => item.uid || index.toString()}
        renderItem={renderFavorite}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<Text style={styles.noFavoritesText}>No favorites to display.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#32a852', // Original green header color
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White text to match the header
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure proper spacing between search bar and delete icon
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take up remaining space
    backgroundColor: 'white', // White search bar background
    borderRadius: 25, // Rounded edges
    paddingHorizontal: 10,
    height: 40,
    shadowColor: '#000', // Add slight shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Shadow for Android
  },
  searchIcon: {
    marginRight: 10,
    color: '#32a852', // Green icon to match header
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Black text for readability
  },
  deleteIcon: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Shadow for Android
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 20,
    paddingRight: 15,
    justifyContent: 'center',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  noFavoritesText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default FavoritesScreen;