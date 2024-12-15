import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import placesData from '../placesdatapage/placesdata';

const FavoritesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(Object.values(placesData)); // State to store favorite places

  // Filter places based on the search query
  const filteredPlaces = searchQuery
    ? favorites.filter((place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favorites;

  // Remove all favorites
  const handleRemoveAllFavorites = () => {
    Alert.alert(
      "Remove All Favorites",
      "Are you sure you want to remove all your favorite places?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => setFavorites([]) }, // Clear the favorites list
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Places</Text>
      </View>

      {/* Search Bar with Delete Icon */}
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

      {/* Favorites List */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {filteredPlaces.map((place, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('BusinessDetails', { place })}
          >
            <Image source={place.images[0]} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{place.name}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(place.rating)].map((_, idx) => (
                    <Ionicons key={idx} name="star" size={16} color="gold" />
                  ))}
                </View>
              </View>
              <Text style={styles.cardSubtitle}>{place.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {favorites.length === 0 && (
          <Text style={styles.noFavoritesText}>No favorites to display.</Text>
        )}
      </ScrollView>
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
