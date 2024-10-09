import React, {useState} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import globalStyle from '../../assets/styles/globalstyle';
import Header from '../../components/Header/Header';
import style from './style';
import Button from '../../components/Button/Button';
import {AddExerciseToDatabase, translateEmail} from '../../API/food';
import {Routes} from '../../navigation/Routes';
import {useSelector} from 'react-redux';

// AddExercise Component
/**
 * NAME
 *
 * AddExercise - A screen component that allows users to add a new exercise entry.
 *
 * SYNOPSIS
 *
 * AddExercise({navigation})
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides a form for adding a new exercise entry, including exercise name, sets, reps, and weight.
 * The data is then saved to the database. Users can either cancel the action or proceed to add the exercise.
 * The screen uses Redux to fetch the user's email for database operations.
 *
 * RETURNS
 *
 *  JSX element representing a screen with input fields for adding exercise details and buttons to save or cancel.
 */
const AddExercise = ({navigation}) => {
  // Access the current user information from Redux state
  const user = useSelector((state: RootState) => state.user);

  // State variables to store the values entered by the user
  const [ExerciseName, setExerciseName] = useState('');
  const [Sets, setSets] = useState('');
  const [Reps, setReps] = useState('');
  const [Weight, setWeight] = useState('');

  // Check if all inputs have valid numeric values
  const isSubmitDisabled =
    !isNaN(ExerciseName) ||
    isNaN(Sets) ||
    Sets <= 0 ||
    isNaN(Reps) ||
    Reps <= 0 ||
    isNaN(Weight) ||
    Weight <= 0;

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundColor]}>
      <View style={style.ScreenContainer}>
        <View style={style.HeaderContainer}>
          {/* Header for the screen */}
          <Header title={'Add Exercise'} color={'white'} type={1} />
        </View>

        {/* Exercise Name Section */}
        <View style={style.ExerciseNameContainer}>
          <Header title={'Exercise Name'} color={'white'} type={2} />
          <View style={{borderBottomColor: 'white', borderBottomWidth: 3}}>
            <TextInput
              placeholder={'Enter Exercise Name'} // Placeholder text for exercise name input
              placeholderTextColor={'white'}
              style={{
                color: 'white',
              }}
              value={ExerciseName} // Bind input value to state
              onChangeText={val => {
                setExerciseName(val); // Update state on text change
              }}
            />
          </View>
        </View>

        {/* Sets, Reps, and Weights Section */}
        <View style={style.WeightsRepsSetsContainer}>
          <Header title={'Sets, Reps, and Weights'} color={'white'} type={2} />

          {/* Sets Input */}
          <View style={style.Input}>
            <TextInput
              placeholder={'Enter Sets'}
              placeholderTextColor={'white'}
              style={{
                color: 'white',
              }}
              value={Sets} // Bind input value to state
              onChangeText={val => setSets(val)} // Update state on text change
            />
          </View>

          {/* Reps Input */}
          <View style={style.Input}>
            <TextInput
              placeholder={'Enter Reps'}
              placeholderTextColor={'white'}
              style={{
                color: 'white',
              }}
              value={Reps} // Bind input value to state
              onChangeText={val => {
                setReps(val); // Update state on text change
              }}
            />
          </View>

          {/* Weights Input */}
          <View style={{borderBottomColor: 'white', borderBottomWidth: 2}}>
            <TextInput
              placeholder={'Enter Weights'}
              placeholderTextColor={'white'}
              style={{
                color: 'white',
              }}
              keyboardType={'numeric'} // Use numeric keyboard for weights
              value={Weight} // Bind input value to state
              onChangeText={val => setWeight(val)} // Update state on text change
            />
          </View>
        </View>

        {/* Button Container for Cancel and Add actions */}
        <View style={style.ButtonContainers}>
          <View style={{width: 120}}>
            {/* Cancel Button */}
            <Button
              title={'Cancel'}
              onPress={() => {
                navigation.goBack(); // Navigate back to the previous screen
              }}
            />
          </View>
          <View style={{width: 120}}>
            {/* Add Button */}
            <Button
              title={'Add'}
              isDisabled={isSubmitDisabled}
              onPress={async () => {
                // Add exercise to database when button is pressed
                await AddExerciseToDatabase(
                  translateEmail(user.email), // Translate email for database key
                  ExerciseName,
                  Sets,
                  Reps,
                  Weight,
                );
                navigation.navigate(Routes.Weights); // Navigate to Weights screen after adding
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Export the AddExercise component for use in navigation
export default AddExercise;
