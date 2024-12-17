import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = "AIzaSyDZ7nbWdMhge89ToGtM55G-_ieHJYFk_7k"; // Replace with your API Key

const ExactLocationScreen = ({ route }) => {
  const { business } = route.params || {};
  const [userLocation, setUserLocation] = useState(null);
  const [businessLocation, setBusinessLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [eta, setEta] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Business and User Location
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Parse Business Location
        if (business?.exactLocation) {
          const [lat, lon] = business.exactLocation.split(',').map(parseFloat);
          setBusinessLocation({ latitude: lat, longitude: lon });
        } else {
          throw new Error('Business location is missing or invalid.');
        }

        // Get User Location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied.');
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } catch (error) {
        console.error('Error:', error.message);
        Alert.alert('Error', error.message || 'Failed to load location data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [business]);

  // Fetch Route and Calculate ETA when locations are ready
  useEffect(() => {
    if (userLocation && businessLocation) {
      fetchRoute(userLocation, businessLocation);
      calculateETA(userLocation, businessLocation);
    }
  }, [userLocation, businessLocation]);

  // Fetch Route from Google Maps Directions API
  const fetchRoute = async (userCoords, destCoords) => {
    if (!userCoords || !destCoords) {
      console.error('Invalid coordinates passed to fetchRoute');
      return;
    }
  
    try {
      // Fetch directions from Google Directions API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userCoords.latitude},${userCoords.longitude}&destination=${destCoords.latitude},${destCoords.longitude}&key=${GOOGLE_MAPS_API_KEY}&mode=driving`
      );
  
      const data = await response.json();
  
      // Debug the response from the API
      console.log('Directions API Response:', data);
  
      if (data.routes && data.routes.length > 0) {
        // Decode the route polyline
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
  
        setRouteCoordinates(decodedPoints);
      } else {
        console.warn('No routes returned from Directions API');
        Alert.alert('Error', 'No routes found. Please check your coordinates.');
      }
    } catch (error) {
      console.error('Error fetching route:', error.message);
      Alert.alert('Error', 'Failed to fetch the route data.');
    }
  };

  // Decode Polyline
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  // Calculate ETA
  const calculateETA = (userCoords, destCoords) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((destCoords.latitude - userCoords.latitude) * Math.PI) / 180;
    const dLon = ((destCoords.longitude - userCoords.longitude) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userCoords.latitude * Math.PI) / 180) *
        Math.cos((destCoords.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    const speed = 40; // Assume 40 km/h speed
    setEta((distance / speed) * 60); // ETA in minutes
  };

  if (loading || !userLocation || !businessLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading map and route...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ ...businessLocation, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
        <Marker coordinate={userLocation} title="You are here" pinColor="blue" />
        <Marker coordinate={businessLocation} title={business.businessName || 'Business'} pinColor="red" />
        {routeCoordinates.length > 0 && <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />}
      </MapView>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Business: {business.businessName}</Text>
        <Text style={styles.infoText}>ETA: {eta ? `${eta.toFixed(2)} minutes` : 'Calculating...'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  infoText: { fontSize: 16, color: '#333', marginBottom: 5 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ExactLocationScreen;