import React from 'react';
import {Alert, Button, FlatList, Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import {
  faUtensils,
  faCirclePlus,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import style from './style';
import {Swipeable} from 'react-native-gesture-handler';
import {deleteFoodItem, translateEmail} from '../../API/food';
import {useSelector} from 'react-redux';

// MealTracker Component
/**
 * NAME
 *
 * MealTracker - A component that displays a list of foods along with their nutritional information.
 * Allows users to add new food items or delete existing ones using swipe actions.
 *
 * SYNOPSIS
 *
 * MealTracker(props)
 *  props.title     - The title displayed at the top of the meal tracker (required).
 *  props.Text      - Text to display when no items are present (required).
 *  props.Icon      - Icon to display when no items are present (required).
 *  props.onPress   - Function that is called when the add button is pressed (required).
 *  props.data      - Array containing the food items to display (optional).
 *  props.isEmpty   - Boolean that indicates whether the list is empty (optional, default is true).
 *  props.onDeleteItem - Function that is called when an item is deleted (required).
 *
 * DESCRIPTION
 *
 * This functional component renders a meal tracker with a header, add button, and a list of food items.
 * Users can swipe left on a food item to delete it. The component also shows a message if there are no food items.
 * It uses Redux to access the current user's email and ensure the correct user's data is fetched and updated.
 *
 * RETURNS
 *
 *  JSX element representing the meal tracker with a list of foods.
 */
const MealTracker = props => {
  // Access the current user information from Redux state
  const user = useSelector((state: RootState) => state.user);
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

  // Function to render the right action for swipe (delete button)
  /**
   * renderRightActions - Renders the delete button for each food item when swiped.
   *
   * PARAMETERS
   *
   *  foodName       - The name of the food item to be deleted.
   *
   * RETURNS
   *
   *  JSX element representing a delete button.
   */
  const renderRightActions = foodName => {
    return (
      <Button
        title="Delete"
        onPress={() => {
          // Show an alert to confirm deletion
          Alert.alert(
            'Delete Food',
            `Are you sure you want to delete ${foodName}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async () => {
                  // Call delete function for the food item
                  await deleteFoodItem(
                    translateEmail(user.email),
                    currentDate,
                    foodName,
                  );
                  // Call the parent's callback to update the food list
                  props.onDeleteItem(foodName);
                },
                style: 'destructive',
              },
            ],
          );
        }}
        color="red"
      />
    );
  };

  // Function to render each item in the FlatList
  /**
   * renderItem - Renders each food item in the list.
   *
   * PARAMETERS
   *
   *  item           - An object representing a food item, containing its name and nutritional details.
   *
   * RETURNS
   *
   *  JSX element representing a food item with its details.
   */
  const renderItem = ({item}) => (
    <Swipeable renderRightActions={() => renderRightActions(item.foodName)}>
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}>
        <Header title={item.foodName} type={2} color={'white'} />
        <View style={{flexDirection: 'row'}}>
          <Text style={style.text}>Calories: {item.Calories} </Text>
          <Text style={style.text}>Carbs: {item.Carbs} </Text>
          <Text style={style.text}>Fats: {item.Fats} </Text>
          <Text style={style.text}>Protein: {item.Protein} </Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={style.foodTrackerContiner}>
      {/* Header section with the title and add button */}
      <View style={style.header}>
        <Header title={props.title} color={'white'} type={2} />
        <Pressable onPress={() => props.onPress()}>
          <FontAwesomeIcon icon={faCirclePlus} size={23} color={'white'} />
        </Pressable>
      </View>
      {props.isEmpty ? (
        // If the list is empty, display a placeholder message
        <View style={style.EmptyContainer}>
          <FontAwesomeIcon icon={props.Icon} size={50} color={'white'} />
          <Header title={props.Text} color={'white'} type={3} />
          <Header
            title={'Tap the "+" to add information'}
            color={'white'}
            type={3}
          />
        </View>
      ) : (
        // If the list is not empty, display the FlatList of food items
        <View>
          <FlatList
            data={props.data}
            keyExtractor={item => item.foodName} // Use the food name as the key
            renderItem={renderItem} // Render each item using renderItem function
          />
        </View>
      )}
    </View>
  );
};

// Default prop values for the MealTracker component
/**
 * defaultProps - Provides default values for the props to ensure the component behaves correctly if no values are provided.
 */
MealTracker.defaultProps = {
  isEmpty: true, // Default isEmpty value is true
  data: '', // Default data is an empty string
};

// Define prop types to enforce the correct props for the MealTracker component
MealTracker.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and must be a string
  Text: PropTypes.string.isRequired, // Placeholder text for empty state is required
  Icon: PropTypes.string.isRequired, // Placeholder icon for empty state is required
  onPress: PropTypes.func.isRequired, // Function for the add button is required
  data: PropTypes.array, // Data must be an array (list of food items)
  onDeleteItem: PropTypes.func.isRequired, // Function to handle item deletion is required
};

// Export the MealTracker component for use in other parts of the application
export default MealTracker;
