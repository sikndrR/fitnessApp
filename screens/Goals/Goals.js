import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import globalStyle from '../../assets/styles/globalstyle';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './style';
import Button from '../../components/Button/Button';
import {Routes} from '../../navigation/Routes';
import {setGoals} from '../../API/food';

// Goals Component
/**
 * NAME
 *
 * Goals - A screen component that allows users to set their nutritional goals.
 *
 * SYNOPSIS
 *
 * Goals({ navigation, route })
 *  navigation      --> The navigation prop for controlling navigation between screens.
 *  route           --> The route prop to access parameters passed to the component, such as user email.
 *
 * DESCRIPTION
 *
 * This functional component provides a form for users to enter their nutritional goals (calories, protein, carbs, and fats).
 * Upon submission, the user's goals are saved, and they are navigated back to the login screen.
 *
 * RETURNS
 *
 *  JSX element representing the Goals screen, including input fields for nutritional goals and a button to submit.
 */
const Goals = ({navigation, route}) => {
  const {email} = route.params; // Access email from route.params

  // State variables to store the user's goals
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  // Debugging purpose to check email
  console.log(email);

  // Helper function to handle numeric-only input
  const handleInputChange = setter => value => {
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  // Check if all fields are filled to enable the button
  const isSubmitDisabled =
    isNaN(calories) ||
    calories <= 0 ||
    isNaN(protein) ||
    protein <= 0 ||
    isNaN(carbs) ||
    carbs <= 0 ||
    isNaN(fats) ||
    fats <= 0;

  return (
    <SafeAreaView
      style={[
        globalStyle.backgroundWhite,
        globalStyle.flex,
        {justifyContent: 'center'},
      ]}>
      {/* Header Section */}
      <View style={styles.HeaderContainer}>
        <Header title={'Goals'} type={1} />
        <Text style={styles.textHeader}>
          Input information below for goals wanted to be reached. Enter Numbers
          only for Input.
        </Text>
      </View>

      {/* Goal Input Section */}
      {/* Calories Goal Input */}
      <View style={styles.GoalContainers}>
        <Input
          keyboardType={'number-pad'}
          label={'Target Calories Goal'}
          placeholder={'Enter your calorie goal...'}
          onChangeText={handleInputChange(setCalories)}
          value={calories}
        />
      </View>
      {/* Protein Goal Input */}
      <View style={styles.GoalContainers}>
        <Input
          keyboardType={'number-pad'}
          label={'Target Protein Goal'}
          placeholder={'Enter your protein goal...'}
          onChangeText={handleInputChange(setProtein)}
          value={protein}
        />
      </View>
      {/* Carbohydrates Goal Input */}
      <View style={styles.GoalContainers}>
        <Input
          keyboardType={'number-pad'}
          label={'Target Carbohydrates Goal'}
          placeholder={'Enter your carb goal...'}
          onChangeText={handleInputChange(setCarbs)}
          value={carbs}
        />
      </View>
      {/* Fats Goal Input */}
      <View style={styles.GoalContainers}>
        <Input
          keyboardType={'number-pad'}
          label={'Target Fat Goal'}
          placeholder={'Enter your fats goal...'}
          onChangeText={handleInputChange(setFats)}
          value={fats}
        />
      </View>

      {/* Submit Button Section */}
      <View style={styles.ButtonContainer}>
        <Button
          title={'Submit'}
          onPress={async () => {
            // Creating the goals object from the user's inputs
            const goals = {
              calories: calories,
              protein: protein,
              carbs: carbs,
              fats: fats,
            };

            // Setting the user's goals in the database
            await setGoals(goals, email);

            // Navigate to Login screen after setting goals
            navigation.navigate(Routes.Login);
          }}
          isDisabled={isSubmitDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

// Export the Goals component for use in navigation
export default Goals;
