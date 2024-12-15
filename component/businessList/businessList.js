import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../src/config/firebase';

const BusinessList = () => {
  const [groupedBusinesses, setGroupedBusinesses] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // For navigating to BusinessDetails screen

  const db = getFirestore(app);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users')); // Fetch all documents from the 'users' collection
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Group businesses by businessType
        const grouped = data.reduce((acc, business) => {
          const type = business.businessType || 'Other';
          if (!acc[type]) acc[type] = [];
          acc[type].push(business);
          return acc;
        }, {});

        setGroupedBusinesses(grouped);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading businesses...</Text>
      </View>
    );
  }

  if (!Object.keys(groupedBusinesses).length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No businesses found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {Object.keys(groupedBusinesses).map((type) => (
        <View key={type} style={styles.sectionContainer}>
          {/* Section Title */}
          <Text style={styles.sectionTitle}>{type.toUpperCase()}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {groupedBusinesses[type].map((business) => (
              <TouchableOpacity
                key={business.id}
                style={styles.card}
                onPress={() => navigation.navigate('BusinessDetails', { businessId: business.id })}
              >
                {/* Business Profile Picture */}
                <Image
                  source={{ uri: business.profilePicture || 'https://via.placeholder.com/150' }}
                  style={styles.cardImage}
                />
                {/* Business Name */}
                <Text style={styles.cardTitle}>{business.businessName || 'Unnamed Business'}</Text>
                {/* Business Location */}
                <Text style={styles.cardSubtitle}>{business.location || 'Unknown Location'}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  horizontalScrollView: {
    paddingBottom: 10,
  },
  card: {
    width: 150,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    margin: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginHorizontal: 5,
    marginBottom: 5,
  },
});

export default BusinessList;
