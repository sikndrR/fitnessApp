import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';
import globalstyle from '../../assets/styles/globalstyle';
import {useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import {LabeledInput} from '../../components/LabeledInput/LabeledInput';
import {goalsInformation, setGoals, translateEmail} from '../../API/food';
import {useIsFocused} from '@react-navigation/native';
import style from './style';

// Profile Component
/**
 * NAME
 *
 * Profile - A screen component that allows users to view and update their nutritional goals.
 *
 * SYNOPSIS
 *
 * Profile({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides a form for users to view and update their nutritional goals (calories, protein, carbs, and fats).
 * The form pre-fills the current goals, and users can modify the values before submitting them.
 * Upon submission, the updated goals are saved.
 *
 * RETURNS
 *
 *  JSX element representing the Profile screen, including input fields for nutritional goals and a button to submit changes.
 */
const Profile = ({navigation}) => {
  // State and Redux Hooks
  const user = useSelector((state: RootState) => state.user); // Get user data from Redux store
  const [goal, setGoal] = useState({});
  const isFocused = useIsFocused(); // Hook to detect if screen is focused

  // State variables to store new goals
  const [CaloriesNew, SetCaloriesNew] = useState(0);
  const [ProteinNew, SetProteinNew] = useState(0);
  const [CarbNew, SetCarbNew] = useState(0);
  const [FatsNew, SetFatsNew] = useState(0);

  // Fetch goals when the screen is focused
  useEffect(() => {
    const fetchData = async () => {
      const translatedEmail = translateEmail(user.email);
      if (isFocused) {
        const goalsData = await goalsInformation(translatedEmail);
        setGoal(goalsData);

        // Set the initial values for inputs from fetched goals data
        SetCaloriesNew(parseInt(goalsData.calories, 10));
        SetProteinNew(parseInt(goalsData.protein, 10));
        SetCarbNew(parseInt(goalsData.carbs, 10));
        SetFatsNew(parseInt(goalsData.fats, 10));
      }
    };

    fetchData();
  }, [isFocused]);

  // Check if all inputs have valid numeric values
  const isSubmitDisabled =
    isNaN(CaloriesNew) ||
    CaloriesNew <= 0 ||
    isNaN(ProteinNew) ||
    ProteinNew <= 0 ||
    isNaN(CarbNew) ||
    CarbNew <= 0 ||
    isNaN(FatsNew) ||
    FatsNew <= 0;

  return (
    <SafeAreaView style={[globalstyle.backgroundColor, globalstyle.flex]}>
      {/* Header Section */}
      <View style={style.headerContainer}>
        <Header
          title={'Settings: ' + user.displayName}
          type={1}
          color={'white'}
        />
      </View>

      {/* Goals Input Section */}
      <View style={style.goalsContainer}>
        <View style={style.goalsHeader}>
          <Header title={'Goals'} type={2} color={'white'} />
        </View>

        {/* Input for Calories Goal */}
        <View style={style.GoalInput}>
          <LabeledInput
            label={'Calories'}
            placeholder={'Change Calorie Goal'}
            value={CaloriesNew.toString()} // Convert value to string for input display
            keyboardType={'numeric'}
            onChangeText={val => {
              SetCaloriesNew(parseInt(val, 10) || 0); // Parse input to an integer
            }}
          />
        </View>

        {/* Input for Protein Goal */}
        <View style={style.GoalInput}>
          <LabeledInput
            label={'Protein'}
            placeholder={'Change Protein Goal'}
            value={ProteinNew.toString()} // Convert value to string for input display
            keyboardType={'numeric'}
            onChangeText={val => {
              SetProteinNew(parseInt(val, 10) || 0); // Parse input to an integer
            }}
          />
        </View>

        {/* Input for Carbs Goal */}
        <View style={style.GoalInput}>
          <LabeledInput
            label={'Carbs'}
            placeholder={'Change Carbs Goal'}
            value={CarbNew.toString()} // Convert value to string for input display
            keyboardType={'numeric'}
            onChangeText={val => {
              SetCarbNew(parseInt(val, 10) || 0); // Parse input to an integer
            }}
          />
        </View>

        {/* Input for Fats Goal */}
        <View style={style.GoalInput}>
          <LabeledInput
            label={'Fats'}
            placeholder={'Change Fats Goal'}
            value={FatsNew.toString()} // Convert value to string for input display
            keyboardType={'numeric'}
            onChangeText={val => {
              SetFatsNew(parseInt(val, 10) || 0); // Parse input to an integer
            }}
          />
        </View>

        {/* Submit Button */}
        <Pressable
          style={[
            style.goalsButton,
            {backgroundColor: isSubmitDisabled ? '#b0b0b0' : '#2979F2'}, // Button will become disabled if inputs are not valid
          ]}
          onPress={async () => {
            if (!isSubmitDisabled) {
              const newGoals = {
                calories: CaloriesNew,
                protein: ProteinNew,
                carbs: CarbNew,
                fats: FatsNew,
              };

              await setGoals(newGoals, user.email); // Set the new goals for the user
            }
          }}
          disabled={isSubmitDisabled} // Disable button if inputs are invalid
        >
          <View>
            <Header title={'Submit'} type={3} color={'white'} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// Export the Profile component for use in navigation
export default Profile;
