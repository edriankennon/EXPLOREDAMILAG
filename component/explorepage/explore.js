import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

// Function to scale based on screen width (375px as a base)
const scaleSize = (size) => (width / 375) * size;  // 375 is the width of iPhone 6, a standard reference device
const scaleFont = (size) => (width / 375) * size;

const Explore = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const attractions = [
    { name: 'Damilag Hills', location: 'Purok 11, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/hills.png') },
    { name: 'Cafe 14-15', location: '9RW5+PH, Manolo  Fortich, Bukidnon', image: require('../../assets/cafe.png') },
    { name: 'Concetta Tourist', location: 'Purok 13, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/concetta.png') },
    { name: 'Bamboo Pavilion', location: '8RV8+4W, Manolo Fortich, Bukidnon', image: require('../../assets/bamboo.png') },
  ];

  const foods = [
    { name: 'Umarika Cafe', location: '9R96+GGW Purok 16,Damilag, Manolo Fortich', image: require('../../assets/umarika.png') },
    { name: 'Lady\'s First Resto', location: 'Damilag, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/lady.png') },
    { name: 'Rey\'s Warehouse', location: 'Villa Violeta,\n Damilag, Manolo Fortich, 8705 Bukidnon', image: require('../../assets/rey.png') },
    { name: 'Baelly\'s Lechon House', location: 'Hi-way, Damilag, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/baelly.png') },
  ];

  const hotels = [
    { name: 'Eunice Villa', location: 'Purok 13, Damilag, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/eunice.png') },
    { name: 'BCC Business Hotel', location: '9R56+5RQ, \n Manolo Fortich, 8703 Bukidnon', image: require('../../assets/bcc.png') },
    { name: 'Sebastian\'s Place', location: 'BCC Homes, B17 LT13 & LT15, Quatar Street, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/sebastian.png') },
  ];

  const services = [
    { name: 'Save Mart', location: '9R37+35R, Manolo Fortich, Bukidnon', image: require('../../assets/savemart.png') },
    { name: 'Cuarteros Hardware', location: '9R96+FM5, Manolo Fortich, Bukidnon', image: require('../../assets/hardware.png') },
    { name: 'Concetta Tourist', location: 'Purok 13, Manolo Fortich, 8703 Bukidnon', image: require('../../assets/concetta.png') },
  ];

  const transportation = [
    { name: 'Tric-cab', location: 'Main Road', image: require('../../assets/bao.png') },
    { name: 'Multi-cab', location: 'Secondary Road', image: require('../../assets/multicab.png') },
    { name: 'Habal-habal', location: 'Village Path', image: require('../../assets/habal.png') },
  ];

  // Filtered lists based on the search query
  const filteredAttractions = attractions.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHotels = hotels.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTransportation = transportation.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRight}></View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, food, or services..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Featured Attractions */}
        {filteredAttractions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Featured Attractions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
              {filteredAttractions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate('BusinessDetails', { place: item })}
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'top', marginHorizontal: 5 }}>
                    <Ionicons name="location-outline" size={16} color="green" />
                    <Text style={styles.cardSubtitle}>{item.location.replace(/\n/g, ' ')}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Other Sections (Food, Hotels, Services, Transportation) */}
        {filteredFoods.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Foods</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
              {filteredFoods.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate('BusinessDetails', { place: item })}
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'top', marginHorizontal: 5 }}>
                    <Ionicons name="location-outline" size={16} color="green" />
                    <Text style={styles.cardSubtitle}>{item.location.replace(/\n/g, ' ')}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {filteredHotels.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Hotels and Accommodations</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
              {filteredHotels.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate('BusinessDetails', { place: item })}
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'top', marginHorizontal: 5 }}>
                    <Ionicons name="location-outline" size={16} color="green" />
                    <Text style={styles.cardSubtitle}>{item.location.replace(/\n/g, ' ')}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {filteredServices.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Other Services</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
              {filteredServices.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate('BusinessDetails', { place: item })}
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'top', marginHorizontal: 5 }}>
                    <Ionicons name="location-outline" size={16} color="green" />
                    <Text style={styles.cardSubtitle}>{item.location.replace(/\n/g, ' ')}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {filteredTransportation.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Transportation</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
              {filteredTransportation.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'top', marginHorizontal: 5 }}>
                    <Ionicons name="location-outline" size={16} color="green" />
                    <Text style={styles.cardSubtitle}>{item.location.replace(/\n/g, ' ')}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
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
    backgroundColor: '#32a852',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align content to the right
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingTop: 60, // Adjusted padding to make space
    marginBottom: 20,
  },
  headerRight: {
    justifyContent: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  contentContainer: {
    flexGrow: 1, // Use flexGrow to ensure content expands and is scrollable
    paddingHorizontal: scaleSize(15), // Responsively adjust padding
    paddingBottom: scaleSize(50), // Add padding at bottom to ensure content isn't cut off
  },
  greetingText: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginTop: scaleSize(10),
  },
  exploreText: {
    fontSize: scaleFont(18),
    color: 'gray',
    marginBottom: scaleSize(20),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // White search bar background
    borderWidth: 0, // No border for a cleaner look
    borderRadius: scaleSize(25), // Rounded edges
    marginHorizontal: scaleSize(20),
    marginVertical: scaleSize(10),
    paddingHorizontal: scaleSize(10),
    height: scaleSize(40),
    shadowColor: '#000', // Add slight shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Shadow for Android
  },

  searchIcon: {
    marginRight: scaleSize(10),
    color: 'green',
  },
  searchInput: {
    flex: 1,
    height: scaleSize(40),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginVertical: scaleSize(10),
  },
  horizontalScrollView: {
    marginBottom: scaleSize(20),
  },
  card: {
    width: scaleSize(150),
    marginRight: scaleSize(10),
    backgroundColor: 'white',
    borderRadius: scaleSize(10),
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: scaleSize(100),
  },
  cardTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    margin: scaleSize(5),
  },
  cardSubtitle: {
    fontSize: scaleFont(14),
    color: 'gray',
    marginHorizontal: scaleSize(5),
    marginBottom: scaleSize(5),
  },
});

export default Explore;
