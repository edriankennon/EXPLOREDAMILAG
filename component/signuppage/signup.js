import React, { useState } from 'react';
import { Platform } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { handleSignUp } from '../../src/config/auth';
import { saveUserData } from '../../src/config/firestore';
import { uploadProfilePhoto, uploadBusinessImages } from '../../src/config/storage';
import { Ionicons } from '@expo/vector-icons'; 

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [prices, setPrices] = useState('');
  const [contactUs, setContactUs] = useState('');
  const [profilePhotoUri, setProfilePhotoUri] = useState(null);
  const [businessImages, setBusinessImages] = useState([]);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRolePickerVisible, setRolePickerVisible] = useState(false);
  const [isBusinessTypePickerVisible, setBusinessTypePickerVisible] = useState(false);
  const [overview, setOverview] = useState('');
  const [exactLocation, setExactLocation] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false); // Controls map modal visibility
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const [region, setRegion] = useState({
    latitude: 8.3601, // Latitude for Damilag
    longitude: 124.8831, // Longitude for Damilag
    latitudeDelta: 0.01, // Zoom level
    longitudeDelta: 0.01, // Zoom level
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setRolePickerVisible(false);
  };

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

  const handleSignUpSubmit = async () => {
    try {
      if (!username || !email || !password || !role) {
        alert('All fields must be completed.');
        return;
      }

      if (role === "Business Owner") {
        if (!businessName || !businessType || !location || !guidelines || !prices || !contactUs) {
          alert('All Business Owner fields must be completed.');
          return;
        }
      }

      const user = await handleSignUp(email, password);

      let profilePhotoUrl = '';
      if (profilePhotoUri) {
        profilePhotoUrl = await uploadProfilePhoto(user.uid, profilePhotoUri);
      }

      let businessImagesUrls = [];
      if (businessImages.length > 0) {
        businessImagesUrls = await uploadBusinessImages(user.uid, businessImages);
      }

      const userData = {
        username: username.trim(),
        role: role.trim(),
        profilePicture: profilePhotoUrl || '',
        businessImages: businessImagesUrls,
      };

      if (role === "Business Owner") {
        if (!businessName || !businessType || !location || !exactLocation || !guidelines || !prices || !contactUs || !overview) {
          alert('All Business Owner fields must be completed.');
          return;
        }
        Object.assign(userData, {
          businessName: businessName.trim(),
          businessType: businessType.trim(),
          location: location.trim(),
          exactLocation: exactLocation.trim(),
          overview: overview.trim(),
          guidelines: guidelines.trim(),
          prices: prices.trim(),
          contactUs: contactUs.trim(),
        });
      }

      await saveUserData(user.uid, userData);

      console.log('User signed up and data saved:', userData);
      alert('Sign up successful!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert(error.message || 'An error occurred during sign-up.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhotoUri(result.assets[0].uri);
    }
  };

  const pickImages = async () => {
    if (businessImages.length >= 5) {
      alert("You can only upload up to 5 photos.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 5 - businessImages.length, // Limit remaining photos
    });

    if (!result.canceled) {
      setBusinessImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const handleRemovePhoto = (index) => {
    setBusinessImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };  

  const handleBusinessTypeSelect = (type) => {
    setBusinessType(type); // Updates the selected business type in the state
    setBusinessTypePickerVisible(false); // Closes the modal
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          bounces={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          {/* Your existing code starts here */}
          <View style={styles.header} />
          <Text style={styles.headerText}>Sign Up</Text>
          
          {/* Profile Photo */}
          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{
                  uri: profilePhotoUri || 'https://via.placeholder.com/100',
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

      {/* Username */}
      <View style={styles.inputGroup}>
        <FontAwesome name="user" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
  
      {/* Email */}
      <View style={styles.inputGroup}>
        <FontAwesome name="envelope" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
  
      {/* Password */}
      <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Entypo
            name={isPasswordVisible ? 'eye-with-line' : 'eye'}
            size={20}
            color="grey"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>
  
      {/* Role */}
      <Text style={styles.label}>Role</Text>
      <TouchableOpacity style={styles.pickerContainer} onPress={() => setRolePickerVisible(true)}>
        <FontAwesome name="user" size={20} color="green" style={styles.icon} />
        <Text style={styles.pickerText}>{role || 'Select Role'}</Text>
        <Entypo name="chevron-down" size={20} color="grey" style={styles.iconRight} />
      </TouchableOpacity>
  
      {/* Role Picker Modal */}
      <Modal visible={isRolePickerVisible} transparent animationType="fade">
  <View style={styles.modalContainer}>
    <View style={styles.modal}>
      <Text style={styles.modalHeader}>Select Role</Text>
      <TouchableOpacity style={styles.modalOption} onPress={() => handleRoleSelect('Visitor')}>
        <Text style={styles.modalText}>Visitor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalOption} onPress={() => handleRoleSelect('Business Owner')}>
        <Text style={styles.modalText}>Business Owner</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRolePickerVisible(false)}>
        <Text style={styles.modalClose}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  
      {role === 'Business Owner' && (
        <>
          {/* Business Name */}
          <Text style={styles.label}>Business Name</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="briefcase" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

            {/* Overview */}
      <Text style={styles.label}>Overview</Text>
      <View style={styles.inputGroup}>
        <FontAwesome name="info-circle" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Overview"
          multiline={true}
          value={overview}
          onChangeText={setOverview}
        />
      </View>
  
        {/* Business Type */}
<Text style={styles.label}>Business Type</Text>
<TouchableOpacity
  style={styles.pickerContainer}
  onPress={() => {
    if (role === "Business Owner") {
      setBusinessTypePickerVisible(true);
    } else {
      alert("Business Type is only required for Business Owners.");
    }
  }}
>
  <FontAwesome name="industry" size={20} color="green" style={styles.icon} />
  <Text style={styles.pickerText}>{businessType || "Select Business Type"}</Text>
  <Entypo name="chevron-down" size={20} color="grey" style={styles.iconRight} />
</TouchableOpacity>

          {/* Business Type Picker Modal */}
          <Modal visible={isBusinessTypePickerVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalHeader}>Select Business Type</Text>
                {["Hotels", "Attractions", "Food"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.modalOption}
                    onPress={() => handleBusinessTypeSelect(type)}
                  >
                    <Text style={styles.modalText}>{type}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => setBusinessTypePickerVisible(false)}>
                  <Text style={styles.modalClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="map-marker" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>

        {/* Open Map Modal */}

        <Modal visible={isMapVisible} animationType="slide">
  <View style={{ flex: 1 }}>
    {/* Map */}
    <MapView
      style={styles.map}
      region={region}
      onPress={(e) => handleSelectLocation(e.nativeEvent.coordinate)}
    >
      {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>

    {/* Close Button */}
    <TouchableOpacity
      style={styles.closeMapButton}
      onPress={() => setIsMapVisible(false)} // Close the modal
    >
      <Ionicons name="close" size={30} color="#000" />
    </TouchableOpacity>
  </View>
</Modal>


{/* Exact Location */}
            
<View style={styles.inputGroup}>
  <FontAwesome name="map" size={20} color="green" style={styles.icon} />
  <TouchableOpacity
    style={styles.inputTouchable}
    onPress={handleOpenMap} // Opens the map modal
  >
    <Text style={styles.inputText}>
      {exactLocation || 'Select Location on Map'}
    </Text>
  </TouchableOpacity>
</View>
  
          {/* Guidelines */}
          <Text style={styles.label}>Guidelines</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="book" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Guidelines"
              multiline={true}
              value={guidelines}
              onChangeText={setGuidelines}
            />
          </View>
  
          {/* Prices */}
          <Text style={styles.label}>Prices</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="money" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={`e.g., Lechon Kawali - P500.00\nDinuguan - P80.00\nAdobo - P80.00`}
              multiline={true}
              value={prices}
              onChangeText={setPrices}
            />
          </View>
  
          {/* Contact Us */}
          <Text style={styles.label}>Contact Us</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="phone" size={20} color="green" style={styles.icon} />
            <TextInput
  style={styles.input}
  placeholder={`e.g., Phone number: *****\nFacebook Page: fb.com/yourpage\nEmail Address: yourname@gmail.com`}
  multiline={true} // Allow multiple lines for placeholders
  value={contactUs}
  onChangeText={setContactUs}
/>
          </View>
        </>
      )}

{role === "Business Owner" && (
  <View>
    <Text style={styles.label}>Upload Photos (Max: 5)</Text>
    <View style={styles.photoContainer}>
      {/* Preview Uploaded Photos */}
      {businessImages.map((uri, index) => (
        <View key={index} style={styles.photoWrapper}>
          <Image source={{ uri }} style={styles.imagePreview} />
          <TouchableOpacity
            onPress={() => handleRemovePhoto(index)}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Photo Button */}
      {businessImages.length < 5 && (
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImages}>
          <Text style={styles.imagePickerButtonText}>Add Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)}
  
<View style={styles.footerContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpSubmit}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginLink}> Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40, // Add extra padding at the bottom
    backgroundColor: '#fff',
  },
  
  header: {
    height: '0',
    backgroundColor: '#28a745',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginBottom: 'auto',
  },
  iconRight: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  pickerText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
  flex: 1,
  justifyContent: 'center', // Centers the modal vertically
  alignItems: 'center',     // Centers the modal horizontally
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
},
modal: {
  marginVertical: 'auto',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '80%',        // Responsive modal width
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,        // Shadow for Android
},
modalHeader: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},
modalOption: {
  paddingVertical: 10,
  alignItems: 'left',
},
modalText: {
  fontSize: 18,
},
modalClose: {
  fontSize: 16,
  color: 'red',
  textAlign: 'center',
  marginTop: 10,
},

  signUpButton: {
    backgroundColor: '#28a745',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },

  map: {
  width: '100%',   
  height: '100%',     
  borderRadius: 10, 
},
closeMapButton: {
  position: 'absolute',
  top: 40, 
  right: 20, 
  backgroundColor: 'rgba(255, 255, 255, 0.7)', 
  borderRadius: 15,
  padding: 5,
  zIndex: 10, 
},

closeMapText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  imagePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  photoWrapper: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 50,
  },
  removeText: {
    color: 'white',
    fontSize: 12,
  },

  footerContainer: {
    marginTop: 20,
    marginBottom: 15, // Extra spacing at the bottom
    alignItems: 'center',
  },

  
  


  
});

export default SignUpScreen;