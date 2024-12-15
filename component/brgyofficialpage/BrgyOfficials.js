import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Ionicons } from '@expo/vector-icons'; // Import back button icon

const { width, height } = Dimensions.get('window');

export default function BrgyOfficials() {
  const navigation = useNavigation(); // Access navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="green" />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../../assets/damilag.png')} style={styles.logo} />
      
      {/* Title */}
      <Text style={styles.title}>BARANGAY OFFICIALS</Text>
      
      {/* Officials */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Barangay Captain</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>Councilor</Text>
        </View>

        {/* Add more static cards here */}
        <View style={styles.card}>
          <Image source={require('../../assets/person.png')} style={styles.image} />
          <Text style={styles.name}>Hon. Milianfe Celan</Text>
          <Text style={styles.position}>SK Chairman</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust as needed
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginTop: height * 0.04, // Adjust to make space for back button
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next line
    justifyContent: 'space-around', // Add space between items
    width: '100%',
  },
  card: {
    alignItems: 'center',
    marginVertical: height * 0.02,
    width: width * 0.28,
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginBottom: height * 0.01,
  },
  name: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  position: {
    fontSize: width * 0.03,
    textAlign: 'center',
    color: 'green',
    fontStyle: 'italic',
    marginTop: 2,
  },
});
