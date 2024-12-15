import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal,} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BarangayDamilag = () => {
  const navigation = useNavigation();
  const [showFullText, setShowFullText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    require('../../assets/stage.png'),
    require('../../assets/tree.png'),
    require('../../assets/plant.png'),
    require('../../assets/brigada.png'),
  ];

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/damilag.png')} style={styles.headerImage} />
      </View>

      {/* Title and Address */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>Barangay Damilag</Text>
        <Text style={styles.subHeaderText}>Manolo Fortich, Bukidnon</Text>

        {/* Address */}
        <View style={styles.addressContainer}>
          <FontAwesome name="map-marker" size={20} color="#4CAF50" />
          <Text style={styles.addressText}>Purok 10, Damilag, Manolo Fortich, Bukidnon.</Text>
        </View>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>
          {showFullText
            ? "Barangay Damilag in Bukidnon, Philippines, is attracting a diverse range of visitors, including local tourists, adventure seekers, cultural enthusiasts, families, eco-tourists, and a growing number of international travelers. These visitors are drawn to Damilag's natural beauty, adventure opportunities, and rich cultural heritage. Popular activities include hiking, mountain biking, exploring local culture, and participating in eco-friendly initiatives. The area is especially popular during the dry season and local festivals. Tourism has boosted the local economy and fostered cultural exchange, though it also presents challenges in environmental conservation, underscoring the need for sustainable practices."
            : "Barangay Damilag in Bukidnon, Philippines, is attracting a diverse range of visitors, including local tourists, adventure seekers, cultural enthusiasts..."}
        </Text>
        <TouchableOpacity style={styles.readMoreButton} onPress={toggleReadMore}>
          <Text style={styles.readMoreText}>{showFullText ? 'Read Less' : 'Read More'}</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Icons */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureRow}>
          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('BrgyOfficials')}>
            <FontAwesome name="users" size={30} color="green" />
            <Text style={styles.featureText}>Elected Officials</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('DamilagGuidelines')}>
            <FontAwesome name="file-text" size={30} color="green" />
            <Text style={styles.featureText}>General Guidelines</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featureRow}>
          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('DamilagAwards')}>
            <FontAwesome name="trophy" size={30} color="green" />
            <Text style={styles.featureText}>Awards</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('DamilagContact')}>
            <FontAwesome name="envelope" size={30} color="green" />
            <Text style={styles.featureText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Photos Section */}
      <Text style={styles.photosTitle}>Photos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScrollView}>
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(photo)}>
            <View style={styles.photoFrame}>
              <Image source={photo} style={styles.photo} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Full-Screen Modal */}
      {modalVisible && (
        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
            {selectedPhoto && <Image source={selectedPhoto} style={styles.modalImage} />}
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 90,
  },
  headerImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subHeaderText: {
    marginTop: 5,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  addressText: {
    marginLeft: 5,
    color: '#4CAF50',
    fontSize: 16,
  },
  overviewContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overviewText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
  },
  readMoreButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  featureText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  photoScrollView: {
    paddingLeft: 20,
  },
  photoFrame: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 3,
    marginRight: 10,
    height: 200,
    minWidth: 100,
  },
  photo: {
    width: 150,
    height: 100,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
});

export default BarangayDamilag;
