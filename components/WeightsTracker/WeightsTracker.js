import React from 'react';
import {Alert, Button, FlatList, Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import style from './style';
import {Swipeable} from 'react-native-gesture-handler';
import {deleteExercise, translateEmail} from '../../API/food';
import {useSelector} from 'react-redux';

// WorkoutTracker Component
/**
 * NAME
 *
 * WorkoutTracker - A component that displays a list of exercises along with their details.
 * Allows users to add new exercise items or delete existing ones using swipe actions.
 *
 * SYNOPSIS
 *
 * WorkoutTracker(props)
 *  props.title     - The title displayed at the top of the workout tracker (required).
 *  props.Text      - Text to display when no items are present (required).
 *  props.Icon      - Icon to display when no items are present (required).
 *  props.onPress   - Function that is called when the add button is pressed (required).
 *  props.data      - Array containing the exercise items to display (optional).
 *  props.isEmpty   - Boolean that indicates whether the list is empty (optional, default is true).
 *  props.onDeleteItem - Function that is called when an item is deleted (required).
 *
 * DESCRIPTION
 *
 * This functional component renders a workout tracker with a header, add button, and a list of exercise items.
 * Users can swipe left on an exercise item to delete it. The component also shows a message if there are no exercise items.
 * It uses Redux to access the current user's email and ensure the correct user's data is fetched and updated.
 *
 * RETURNS
 *
 *  JSX element representing the workout tracker with a list of exercises.
 */
const WorkoutTracker = props => {
  // Access the current user information from Redux state
  const user = useSelector((state: RootState) => state.user);
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

  // Function to render the right action for swipe (delete button)
  /**
   * renderRightActions - Renders the delete button for each exercise item when swiped.
   *
   * PARAMETERS
   *
   *  exerciseName   - The name of the exercise item to be deleted.
   *
   * RETURNS
   *
   *  JSX element representing a delete button.
   */
  const renderRightActions = exerciseName => {
    return (
      <Button
        title="Delete"
        onPress={() => {
          // Show an alert to confirm deletion
          Alert.alert(
            'Delete Exercise',
            `Are you sure you want to delete ${exerciseName}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async () => {
                  // Call delete function for the exercise item
                  await deleteExercise(
                    translateEmail(user.email),
                    currentDate,
                    exerciseName,
                  );
                  // Call the parent's callback to update the exercise list
                  props.onDeleteItem(exerciseName);
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
   * renderItem - Renders each exercise item in the list.
   *
   * PARAMETERS
   *
   *  item           - An object representing an exercise item, containing its name and details.
   *
   * RETURNS
   *
   *  JSX element representing an exercise item with its details.
   */
  const renderItem = ({item}) => (
    <Swipeable renderRightActions={() => renderRightActions(item.exerciseName)}>
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}>
        <Header title={item.exerciseName} type={2} color={'white'} />
        <View style={{flexDirection: 'row'}}>
          <Text style={style.text}>Reps: {item.Reps} </Text>
          <Text style={style.text}>Sets: {item.Sets} </Text>
          <Text style={style.text}>Weight: {item.Weight} lbs</Text>
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
        // If the list is not empty, display the FlatList of exercise items
        <View>
          <FlatList
            data={props.data}
            keyExtractor={item => item.exerciseName} // Use the exercise name as the key
            renderItem={renderItem} // Render each item using renderItem function
          />
        </View>
      )}
    </View>
  );
};

// Default prop values for the WorkoutTracker component
/**
 * defaultProps - Provides default values for the props to ensure the component behaves correctly if no values are provided.
 */
WorkoutTracker.defaultProps = {
  isEmpty: true, // Default isEmpty value is true
};

// Define prop types to enforce the correct props for the WorkoutTracker component
WorkoutTracker.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and must be a string
  Text: PropTypes.string.isRequired, // Placeholder text for empty state is required
  Icon: PropTypes.object.isRequired, // Icon for empty state must be an object (FontAwesome icon)
  onPress: PropTypes.func.isRequired, // Function for the add button is required
  data: PropTypes.array, // Data must be an array (list of exercise items)
  onDeleteItem: PropTypes.func.isRequired, // Function to handle item deletion is required
};

// Export the WorkoutTracker component for use in other parts of the application
export default WorkoutTracker;
