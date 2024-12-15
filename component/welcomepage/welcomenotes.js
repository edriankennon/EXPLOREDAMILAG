import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const screens = [
    {
      title: 'Know Damilag',
      description: 'Dive into the beauty and culture of Damilag, where discovery awaits!',
      image: require('../../assets/search.png'), 
    },
    {
      title: 'Experience Damilag',
      description: 'From scenic tours to weekend places, experience the top views with Damilag to its fullest.',
      image: require('../../assets/experience.png'),
    },
    {
      title: 'Explore Damilag',
      description: 'This is your journey to the hidden wonders of Damilag. Experience rich culture, art, and tourism that brings value to every second of your exploration. Find top places to visit or travel, the best food spots to eat, and services to help enjoy your stay to the fullest.',
      image: require('../../assets/explore.png'), 
      showButton: true,
    },
  ];

  const handleCirclePress = (index) => {
    setCurrentIndex(index);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const viewWidth = e.nativeEvent.layoutMeasurement.width;
          setCurrentIndex(Math.round(contentOffsetX / viewWidth));
        }}
      >
        {screens.map((screen, index) => (
          <View key={index} style={[styles.screenContainer, { width: screenWidth }]}>
            <Image source={screen.image} style={styles.image} />
            <Text style={styles.title}>{screen.title}</Text>
            <Text style={styles.description}>{screen.description}</Text>
            {screen.showButton && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}
              >
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.circleContainer}>
        {screens.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.circle,
              { backgroundColor: index === currentIndex ? 'white' : '#c4c4c4' },
            ]}
            onPress={() => handleCirclePress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3CB043', // Changed to green
  },
  scrollContainer: {
    flex: 1,
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white', // Changed to white
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#4CAF50', // Button text color changed to green
    fontSize: 16,
    fontWeight: 'bold',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default WelcomeScreen;
