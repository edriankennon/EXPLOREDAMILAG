import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../src/config/firebase';

const SideMenu = ({ toggleMenu }) => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100'); // Default placeholder

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserProfile = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = doc(db, 'users', user.uid); // Fetch user document
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfilePicture(userData.profilePicture || 'https://via.placeholder.com/100'); // Set profile picture from Firestore
          } else {
            console.log('No user data found in Firestore!');
          }
        }
      });
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Transparent Overlay to Capture Touch Outside the Side Menu */}
      <TouchableOpacity
        style={styles.overlay}
        onPress={toggleMenu}
        activeOpacity={1} // Ensures touch is registered without fading effect
      />

      {/* Side Menu */}
      <View style={styles.sideMenu}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profilePicture }}
            style={styles.profileImage}
          />
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
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: gives a dimmed background effect
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
    zIndex: 102, // Ensure it appears above other content
  },
  profileContainer: {
    alignItems: 'left',
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
