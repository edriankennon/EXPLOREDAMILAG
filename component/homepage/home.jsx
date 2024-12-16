import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../src/config/firebase';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const scaleFont = (size) => (width / 375) * size;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [groupedBusinesses, setGroupedBusinesses] = useState({});

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No user data found in Firestore!');
          }
        }
      });
    };
    fetchUserData();
  }, []);

  // Fetch businesses grouped by type
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users')); // Collection of businesses
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const grouped = data.reduce((acc, business) => {
          const type = business.businessType || 'Other';
          if (!acc[type]) acc[type] = [];
          acc[type].push(business);
          return acc;
        }, {});
        setGroupedBusinesses(grouped);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image
              source={{
                uri: userData?.profilePicture || 'https://via.placeholder.com/60',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.greetingText}>
          Hi, {userData?.username || 'User'}!
        </Text>
        <Text style={styles.exploreText}>Welcome to Explore Damilag!</Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Dynamic Business Sections */}
        {Object.keys(groupedBusinesses).map((type) => {
  // Check if the section is "Other" and if it has businesses
  if (type === 'Other' && groupedBusinesses[type].length === 0) {
    return null; // Do not render the "Other" section if it's empty
  }
  return (
    <View key={type}>
      <Text style={styles.sectionTitle}>{type.toUpperCase()}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {groupedBusinesses[type]
          .filter((business) =>
            business.businessName?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((business) => (
            <TouchableOpacity
              key={business.id}
              style={styles.card}
              onPress={() => navigation.navigate('BusinessDetails', { uid: business.id })}
            >
              <Image
                source={{ uri: business.profilePicture || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{business.businessName || 'Unnamed Business'}</Text>
              <Text style={styles.cardSubtitle}>{business.location || 'Unknown Location'}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
})}


{/* Transportation Section */}
                      <Text style={styles.sectionTitle}>Transportation</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Tricab', { place: { name: 'Bajaj re', location: 'Main Road', image: 'https://your-tricab-image-url.com' } })}
            >
              <Image source={require('../../assets/bao.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>Tric-cab</Text>
              <Text style={styles.cardSubtitle}>Main Road</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Multicab', { place: { name: 'Multi-cab', location: 'Secondary Road', image: 'https://your-multicab-image-url.com' } })}
            >
              <Image source={require('../../assets/multicab.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>Multi-cab</Text>
              <Text style={styles.cardSubtitle}>Secondary Road</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Habal', { place: { name: 'Habal-habal', location: 'Village Path', image: 'https://your-habal-image-url.com' } })}
            >
              <Image source={require('../../assets/habal.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>Habal-habal</Text>
              <Text style={styles.cardSubtitle}>Village Path</Text>
            </TouchableOpacity>
          </ScrollView>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingTop: 40,
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
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  greetingText: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginTop: 10,
  },
  exploreText: {
    fontSize: scaleFont(18),
    color: 'gray',
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
    color: 'green',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: scaleFont(16),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalScrollView: {
    marginBottom: 20,
  },
  card: { 
    width: width * 0.4,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 'auto'
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    margin: 5,
  },
  cardSubtitle: {
    fontSize: scaleFont(14),
    color: 'gray',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  
});

export default HomeScreen;
