import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Header from '../../components/Header/Header';
import globalStyle from '../../assets/styles/globalstyle';
import style from './style';
import {faDumbbell} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../navigation/Routes';
import {
  CheckAndAddDate,
  translateEmail,
  weightInformation,
} from '../../API/food';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import WeightsTracker from '../../components/WeightsTracker/WeightsTracker';
import Button from '../../components/Button/Button';

// Weights Component
/**
 * NAME
 *
 * Weights - A screen component that allows users to view and manage their workout logs.
 *
 * SYNOPSIS
 *
 * Weights({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides an interface for users to view, add, and delete their workout entries.
 * Users can navigate to add a new exercise, view previous workouts, or delete existing ones.
 * The data is fetched dynamically each time the screen is focused.
 *
 * RETURNS
 *
 *  JSX element representing the Weights screen, including a workout log, options to add new entries, and navigate to previous workouts.
 */
const Weights = ({navigation}) => {
  // State and Redux Hooks
  const user = useSelector((state: RootState) => state.user); // Get user data from Redux store
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in ISO format
  const [WeightsList, setWeightsList] = useState([]); // State to store the weights list
  const isFocused = useIsFocused(); // Hook to detect if screen is focused

  // Fetch workout data when the screen is focused
  useEffect(() => {
    CheckAndAddDate(translateEmail(user.email), currentDate);
    const fetchData = async () => {
      const translatedEmail = translateEmail(user.email);
      if (isFocused) {
        const weightData = await weightInformation(
          currentDate,
          translatedEmail,
        );
        setWeightsList(weightData);
      }
    };

    fetchData();
  }, [isFocused]);

  // Function to determine if the weight log is empty
  const displayInformation = () => {
    return WeightsList.length === 0;
  };

  // Callback function to remove an item from the list
  const handleDeleteItem = exerciseName => {
    setWeightsList(prevWeightList =>
      prevWeightList.filter(item => item.exerciseName !== exerciseName),
    );
  };

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundColor]}>
      {/* Header Section */}
      <View style={style.HeaderContainer}>
        <Header title={'Exercise Log'} type={1} color={'white'} />
      </View>

      {/* Button to Navigate to Previous Workouts */}
      <View style={style.buttonContainer}>
        <Button
          title={'Previous Workouts'}
          onPress={() => navigation.navigate(Routes.PreviousDate)} // Navigate to PreviousDate screen
        />
      </View>

      {/* Workout Log Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.logContainer}>
        <WeightsTracker
          title={'Log'}
          onPress={() => navigation.navigate(Routes.AddExercise)} // Navigate to AddExercise screen
          Text={'Workout log empty'}
          Icon={faDumbbell}
          data={WeightsList}
          onDeleteItem={handleDeleteItem} // Pass the delete callback to WeightsTracker
          isEmpty={displayInformation()} // Determine if the log is empty
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the Weights component for use in navigation
export default Weights;
