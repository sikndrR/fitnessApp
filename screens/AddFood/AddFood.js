import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  View,
  Text,
  Pressable,
} from 'react-native';
import style from './style';
import globalStyle from '../../assets/styles/globalstyle';
import {Routes} from '../../navigation/Routes';
import BackButton from '../../components/BackButton/BackButton';

// AddFood Component
/**
 * NAME
 *
 * AddFood - A screen component that allows users to search for food items using an API or manually enter food log.
 *
 * SYNOPSIS
 *
 * AddFood({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides a form for users to search for food items using the USDA FoodData Central API.
 * Users can search for foods by name, view the details, and select a specific food item for further actions.
 * Alternatively, users can manually enter a food log.
 *
 * RETURNS
 *
 *  JSX element representing a screen with input fields for searching food, and options to add food details.
 */
const AddFood = ({navigation}) => {
  // State variables to store the search query, loading state, FDC IDs, and detailed food info
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [FDCIDs, setFDCIDs] = useState([]); // FDC IDs found from search
  const [foodDetails, setFoodDetails] = useState([]); // Store detailed food info from API

  // USDA API key (ensure this is kept safe in production)
  const apiKey = '';

  // Function to search for foods based on user's query
  /**
   * searchFood - Searches for food items using the USDA FoodData Central API.
   *
   * DESCRIPTION
   *
   * This function sends a request to the USDA API using the provided search query.
   * The FDC IDs of the search results are then stored in the state, triggering the fetching of detailed food info.
   */
  const searchFood = () => {
    setLoading(true);
    setFoodDetails([]); // Reset food details before new search
    setFDCIDs([]); // Reset FDC IDs before new search
    setSearchQuery(''); // Clear the search query after initiating the search

    // Fetch food search results using the USDA API
    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${searchQuery}`,
    )
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        getAccurateData(data.foods || []); // Extract FDC IDs from the search results
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  // Function to fetch detailed food information for each FDC ID
  /**
   * fetchFoodDetails - Fetches detailed information for each FDC ID found in the search.
   *
   * DESCRIPTION
   *
   * Sends requests to the USDA API for each FDC ID in `FDCIDs` and appends the detailed food information to the state.
   */
  const fetchFoodDetails = async () => {
    const foodDetailsPromises = FDCIDs.map(fdcId =>
      fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => data) // Return the fetched data
        .catch(error =>
          console.error(`Error fetching data for FDCID ${fdcId}:`, error),
        ),
    );
    const foodDetailsArray = await Promise.all(foodDetailsPromises);
    setFoodDetails(prevData => [...prevData, ...foodDetailsArray]); // Append new data
  };

  // Trigger fetching food details whenever FDCIDs updates
  useEffect(() => {
    if (FDCIDs.length > 0) {
      fetchFoodDetails();
    }
  }, [FDCIDs]);

  // Function to extract FDC IDs from food search results
  /**
   * getAccurateData - Extracts the FDC IDs from the food search results.
   *
   * PARAMETERS
   *
   *  foods          - Array containing food items found by the search.
   *
   * DESCRIPTION
   *
   * This function extracts up to 10 FDC IDs from the `foods` array, ensuring there are no duplicates,
   * and stores them in the state to be used for fetching detailed information.
   */
  const getAccurateData = foods => {
    if (!foods || foods.length === 0) {
      return; // Exit if there are no foods
    }

    const newFDCIDs = [];

    for (let i = 0; i < 10 && i < foods.length; i++) {
      const currFDCID = foods[i].fdcId.toString(); // Get FDC ID of the current item

      // Check if currFDCID is already in FDCIDs array
      if (!FDCIDs.includes(currFDCID)) {
        newFDCIDs.push(currFDCID); // Add to the list of new FDCIDs
      }
    }

    if (newFDCIDs.length > 0) {
      setFDCIDs(prevState => [...prevState, ...newFDCIDs]); // Add new FDCIDs to the state
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundColor, globalStyle.flex]}>
      {/* Back Button */}
      <View style={style.BackButtonContainer}>
        <BackButton
          onPress={() => {
            navigation.goBack(); // Navigate back to the previous screen
          }}
        />
      </View>

      {/* Manual Entry Button */}
      <View style={style.manualButton}>
        <Button
          title={'Enter FoodLog Manually'}
          onPress={() => navigation.navigate(Routes.FoodSelected)} // Navigate to manual food log entry
        />
      </View>

      {/* Search Input Section */}
      <View style={style.SearchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} // Update search query state
          placeholder="Enter food to search"
          placeholderTextColor={'white'}
          style={style.SearchStyle}
          onSubmitEditing={searchFood} // Trigger searchFood when "Enter" is pressed
          returnKeyType="search" // Change the "Enter" key label to "Search"
        />

        {/* Display loading text if data is being fetched */}
        {loading && <Text style={style.SearchedText}>Loading...</Text>}

        {/* Display fetched food details */}
        <FlatList
          data={foodDetails}
          keyExtractor={item => item.fdcId.toString()} // Use FDC ID as key
          renderItem={({item}) => (
            <View style={style.FoodExtensionContainer}>
              <Pressable
                onPress={
                  () => navigation.navigate(Routes.FoodSelected, {item}) // Navigate to food details screen
                }>
                {/* Display detailed food information */}
                <Text style={style.SearchedText}>
                  Description: {item.description || 'No Description'}
                </Text>
                <Text style={style.SearchedText}>
                  Serving Size: {item.servingSize} {item.servingSizeUnit}
                </Text>
                <Text style={style.SearchedText}>
                  Protein: {item.labelNutrients?.protein?.value || 'N/A'}
                </Text>
                <Text style={style.SearchedText}>
                  Carbohydrates:{' '}
                  {item.labelNutrients?.carbohydrates?.value || 'N/A'}
                </Text>
                <Text style={style.SearchedText}>
                  Fats: {item.labelNutrients?.fat?.value || 'N/A'}
                </Text>
                <Text style={style.SearchedText}>
                  Calories: {item.labelNutrients?.calories?.value || 'N/A'}
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// Export the AddFood component for use in navigation
export default AddFood;
