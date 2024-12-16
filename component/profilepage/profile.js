import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';


const MyAccountScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://via.placeholder.com/150');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userUid, setUserUid] = useState('');
  const [role, setRole] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [prices, setPrices] = useState('');
  const [contactUs, setContactUs] = useState('');
  const [businessImages, setBusinessImages] = useState([]);
  const [attractions, setAttractions] = useState('');
  const [overview, setOverview] = useState('');
  const [exactLocation, setExactLocation] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 8.3601, // Default latitude
    longitude: 124.8831, // Default longitude
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid;
      const userEmail = auth.currentUser?.email;

      if (!userId || !userEmail) {
        alert('No user is logged in!');
        return;
      }

      setEmail(userEmail);
      setUserUid(userId);

      const userDocRef = doc(db, 'users', userId);


      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log('Fetched Data:', JSON.stringify(data, null, 2));

          setProfilePhoto(data.profilePicture || 'https://via.placeholder.com/150');
          setUsername(data.username || 'Name not set');
          setRole(data.role || 'Visitor');

          if (data.role === 'Business Owner') {
            setBusinessName(data.businessName || 'Business Name not set');
            setBusinessType(data.businessType || 'Business Type not set');
            setLocation(data.location || 'Location not set');
            setExactLocation(data.exactLocation || '');
            setOverview(data.overview || 'Overview not set');
            setGuidelines(data.guidelines || 'Guidelines not set');
            setPrices(data.prices || 'Prices not set');
            setContactUs(data.contactUs || 'Contact info not set');
            if (data.businessImages && data.businessImages.length > 0) {
              setBusinessImages(data.businessImages);
            } else {
              await fetchBusinessImagesFromStorage(userId);
            }

            if (data.exactLocation) {
              const [latitude, longitude] = data.exactLocation.split(',').map(Number);
              setSelectedLocation({ latitude, longitude });
              setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }
          }
        } else {
          alert('No user data found. Please complete your profile.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        alert('Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleOpenMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setIsMapVisible(true);
  };

  const handleSelectLocation = (coordinate) => {
    setSelectedLocation(coordinate);
    setExactLocation(`${coordinate.latitude}, ${coordinate.longitude}`);
    setIsMapVisible(false);
  };

  const fetchBusinessImagesFromStorage = async (userId) => {
    try {
      console.log('Fetching images for user:', userId);
      const imagesRef = ref(storage, `businessImages/${userId}/`);
      console.log('Storage path:', imagesRef.fullPath);
  
      const imagesList = await listAll(imagesRef);
  
      if (imagesList.items.length === 0) {
        console.log('No images found in the storage path:', imagesRef.fullPath);
        return;
      }
  
      const imageUrls = await Promise.all(
        imagesList.items.map(async (item) => {
          try {
            const url = await getDownloadURL(item);
            console.log(`Fetched URL for ${item.name}:`, url);
            return url;
          } catch (error) {
            console.error(`Error fetching URL for ${item.name}:`, error.message);
            return null;
          }
        })
      );
  
      setBusinessImages(imageUrls.filter((url) => url !== null));
      console.log('Retrieved business images:', imageUrls);
    } catch (error) {
      console.error('Error fetching business images:', error.message);
      alert(`Error fetching business images: ${error.message}`);
    }
  };
  const saveChanges = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('User not logged in!');
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const updatedData = {
      profilePicture: profilePhoto,
      username,
      email,
      role,
      businessImages,
      exactLocation
    };

    if (role === 'Business Owner') {
      Object.assign(updatedData, {
          businessName,
          businessType,
          location,
          exactLocation, // Added
          overview, // Added
          guidelines,
          prices,
          contactUs,
      });
  }

    try {
      await updateDoc(userDocRef, updatedData);
      alert('Profile Updated!');
      setIsEditing(false);
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const pickImage = () => {
    alert('Profile photo picker not implemented yet');
  };

  const pickBusinessImages = () => {
    alert('Business images picker not implemented yet');
  };

  const getRelativePath = (url) => {
    const decodedUrl = decodeURIComponent(url); // Decode the URL
    const pathMatch = decodedUrl.match(/\/o\/(.*?)\?/); // Extract path between "/o/" and "?"
    return pathMatch ? pathMatch[1] : null;
  };
  

  const removeImage = async (index) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('User not logged in!');
      return;
    }
  
    const imageUrl = businessImages[index];
    const relativePath = getRelativePath(imageUrl);
  
    console.log('Image URL:', imageUrl);
    console.log('Relative path extracted:', relativePath);
  
    if (!relativePath) {
      console.error('Could not extract relative path from URL:', imageUrl);
      alert('Invalid image URL.');
      return;
    }
  
    try {
      const imageRef = ref(storage, relativePath);
      await deleteObject(imageRef);
      console.log('Image deleted from storage:', relativePath);
  
      const updatedImages = businessImages.filter((_, i) => i !== index);
      setBusinessImages(updatedImages);
      console.log('Updated images list:', updatedImages);
  
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { businessImages: updatedImages });
      console.log('Firestore updated successfully.');
    } catch (error) {
      console.error('Error during image removal:', error.message);
      alert('Failed to remove the image.');
    }
  };
  
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
        <TouchableOpacity onPress={isEditing ? saveChanges : toggleEditMode}>
          <Text style={styles.headerAction}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      <Modal visible={isMapVisible} animationType="slide">
        <MapView
          style={styles.map}
          region={region}
          onPress={(e) => handleSelectLocation(e.nativeEvent.coordinate)}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
        <TouchableOpacity style={styles.closeMapButton} onPress={() => setIsMapVisible(false)}>
          <Text style={styles.closeMapText}>Close Map</Text>
        </TouchableOpacity>
      </Modal>

      <View style={styles.fieldsContainer}>
        {renderField('person', 'Name', username, setUsername, isEditing, Ionicons)}
        {renderField('mail', 'Email', email, setEmail, isEditing, MaterialIcons)}
        {renderStaticField('key', 'User ID', userUid, MaterialIcons)}
        {renderStaticField('user', 'Role', role, FontAwesome)}
      </View>

      {role === 'Business Owner' && (
        <>
          <View style={styles.fieldsContainer}>
            {renderField('briefcase', 'Business Name', businessName, setBusinessName, isEditing, FontAwesome)}
            {renderField('industry', 'Business Type', businessType, setBusinessType, isEditing, FontAwesome)}
            {renderField('map-marker', 'Location', location, setLocation, isEditing, FontAwesome)}
            {renderField('book', 'Guidelines', guidelines, setGuidelines, isEditing, FontAwesome)}
            {renderField('money', 'Prices', prices, setPrices, isEditing, FontAwesome)}
            {renderField('phone', 'Contact Us', contactUs, setContactUs, isEditing, FontAwesome)}
            {renderField('info-circle', 'Overview', overview, setOverview, isEditing, FontAwesome)}
            {renderField('map', 'Exact Location', exactLocation, setExactLocation, isEditing, FontAwesome)}

          </View>

          <View style={styles.imagePreviewContainer}>
          {businessImages.map((image, index) => (
          <View key={index} style={styles.businessImageContainer}>
          <Image source={{ uri: image }} style={styles.businessImage} />
                        {isEditing && (
                 <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeImageButton}>
              <Text style={styles.removeImageButtonText}>X</Text> {/* This will display "X" */}
        </TouchableOpacity>
            )}
             </View>
             ))}
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickBusinessImages}>
              <Text style={styles.imagePickerButtonText}>Upload New Business Images</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
};

const renderField = (iconName, placeholder, value, setValue, editable, IconComponent) => (
  <View style={styles.fieldRow}>
    <IconComponent name={iconName} size={24} color="green" />
    <TextInput
      editable={editable}
      style={[styles.fieldInput, editable && styles.editableField]}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
    />
  </View>
);

const renderStaticField = (iconName, label, value, IconComponent) => (
  <View style={styles.fieldRow}>
    <IconComponent name={iconName} size={24} color="green" />
    <Text style={styles.fieldStatic}>{label}: {value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 30,
    
  },
  headerTitle: {
    position: 'static',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 50,
    paddingLeft: '32%',
        
  },
  headerAction: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    marginTop: 2,
    
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  fieldsContainer: {
  width: '90%',
  marginTop: 10,
  alignSelf: 'center', // Centers the container horizontally
},

  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fieldInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  editableField: {
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  imagePickerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  businessImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  businessImageContainer: {
    position: 'relative', // To position the Remove button over the image
    margin: 5,
  },
  businessImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 12.5, // Makes the button round
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;