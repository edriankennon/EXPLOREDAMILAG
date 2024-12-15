import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e5e5e5',
    },
    headerContainer: {
      backgroundColor: '#32a852',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    headerLeft: {
      justifyContent: 'center',
    },
    headerRight: {
      justifyContent: 'center',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    contentContainer: {
      paddingHorizontal: 15,
    },
    greetingText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    exploreText: {
      fontSize: 18,
      color: 'gray',
      marginBottom: 20,
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: 'white',
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    horizontalScrollView: {
      marginBottom: 20,
    },
    card: {
      width: 150,
      marginRight: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: 100,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      margin: 5,
    },
    cardSubtitle: {
      fontSize: 14,
      color: 'gray',
      marginHorizontal: 5,
      marginBottom: 5,
    },
    footerContainer: {
      marginVertical: 20,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    footerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    footerDescription: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 20,
    },
    footerButton: {
      backgroundColor: '#32a852',
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
    },
    footerButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles; 