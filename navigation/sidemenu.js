import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../src/config/firebase';

const SideMenu = ({ toggleMenu }) => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100'); // Default placeholder
  const [loading, setLoading] = useState(false); // Add loading state for refresh

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Fetch user data manually
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const user = auth.currentUser; // Directly get the logged-in user
      if (user) {
        const userDoc = doc(db, 'users', user.uid); // Reference to Firestore document
        const docSnap = await getDoc(userDoc); // Fetch data
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfilePicture(userData.profilePicture || 'https://via.placeholder.com/100');
        } else {
          console.log('No user data found in Firestore!');
        }
      } else {
        console.log('No user is currently logged in!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setLoading(false);
  }, [auth, db]);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Full Refresh Button
  const handleFullRefresh = () => {
    fetchUserProfile(); // Manually fetch data
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Transparent Overlay to Capture Touch Outside the Side Menu */}
      <TouchableOpacity
        style={styles.overlay}
        onPress={toggleMenu}
        activeOpacity={1}
      />

      {/* Side Menu */}
      <View style={styles.sideMenu}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
          )}
          <TouchableOpacity style={styles.refreshButton} onPress={handleFullRefresh}>
            <Text style={styles.refreshText}>⟳ Refresh All</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('My Account');
            }}
          >
            <Text style={styles.menuText}>My Account 👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Settings ⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            }}
          >
            <Text style={styles.menuSignout}>Sign out 🚪</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sideMenu: {
    height: '100%',
    width: 250,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'green',
    padding: 20,
    flexDirection: 'column',
    zIndex: 102,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'green',
  },
  refreshButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#2d2d2d',
    borderRadius: 5,
  },
  refreshText: {
    color: 'white',
    fontSize: 14,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  menuSignout: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 500,
  },
});

export default SideMenu;