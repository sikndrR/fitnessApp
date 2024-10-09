import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import MealTracker from '../../components/MealTracker/MealTracker';
import style from './style';
import {verticalScale} from '../../assets/styles/scaling';
import BackButton from '../../components/BackButton/BackButton';
import {Routes} from '../../navigation/Routes';
import globalStyle from '../../assets/styles/globalstyle';
import {faUtensils} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  CheckAndAddDate,
  foodInformation,
  goalsInformation,
  translateEmail,
} from '../../API/food';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../components/Header/Header';
import {resetToInitialState, updateGoals} from '../../redux/reducers/User';
import {logOut} from '../../API/user';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {ProgressionPie} from '../../components/ProgressionPie/ProgressionPie';

// FoodLog Component
/**
 * NAME
 *
 * FoodLog - A screen component that allows users to track their food intake, display nutritional goals, and visualize progress.
 *
 * SYNOPSIS
 *
 * FoodLog({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component displays a user's food log, nutritional goals, and progress in a graphical format.
 * Users can add food items, view their nutrient intake relative to their goals, and log out of their profile.
 * The food data and user goals are fetched from the backend using API calls.
 *
 * RETURNS
 *
 *  JSX element representing the FoodLog screen, including meal tracking, progress visualization, and a log-out button.
 */
const FoodLog = ({navigation}) => {
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  const user = useSelector((state: RootState) => state.user);
  const [foodList, setFoodList] = useState([]); // State to store the food items
  const [goal, setGoal] = useState({}); // State to store user goals (calories, protein, carbs, fats)

  const isFocused = useIsFocused(); // Hook to detect if screen is focused

  // Fetch data when the screen is focused
  /**
   * useEffect - Triggers data fetch when the component is mounted or the screen gains focus.
   *
   * DESCRIPTION
   *
   * The effect checks if the current date exists in the user's data and then fetches food and goals information.
   */
  useEffect(() => {
    CheckAndAddDate(translateEmail(user.email), currentDate); // Check if the date exists and add it if not
    const fetchData = async () => {
      const translatedEmail = translateEmail(user.email);
      if (isFocused) {
        const foodData = await foodInformation(currentDate, translatedEmail); // Fetch food log data for the current date
        const goalsData = await goalsInformation(translatedEmail); // Fetch user's nutritional goals
        setFoodList(foodData);
        setGoal(goalsData);
      }
    };

    fetchData();
  }, [isFocused]);

  // Callback function to remove an item from the food list
  /**
   * handleDeleteItem - Removes an item from the food list.
   *
   * PARAMETERS
   *
   *  foodName       - The name of the food item to be removed.
   */
  const handleDeleteItem = foodName => {
    setFoodList(prevFoodList =>
      prevFoodList.filter(item => item.foodName !== foodName),
    );
  };

  // Function to determine if the food list is empty
  /**
   * displayInformation - Determines if the food log is empty.
   *
   * RETURNS
   *
   *  Boolean indicating if the food list is empty.
   */
  const displayInformation = () => {
    return foodList.length === 0;
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundColor, globalStyle.flex]}>
      {/* Header Section */}
      <View style={style.HeaderContainer}>
        <View>
          {/* Greeting Header */}
          <Header title={'Hi, ' + user.displayName} type={1} color={'white'} />
          <Header title={'Today, ' + currentDate} type={3} color={'#D3D3D3'} />
        </View>
        {/* Log Out Button */}
        <View>
          <Pressable
            onPress={async () => {
              dispatch(resetToInitialState()); // Reset user state
              await logOut(); // Log the user out
            }}>
            <View style={style.SignOutContainer}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                color={'white'}
                size={30}
              />
              <Text style={{color: '#D3D3D3'}}> Sign out</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Nutritional Progression Pies Section */}
      <View style={style.AllProgressionContainer}>
        {/* Large Progression Pie for Calories */}
        <ProgressionPie
          data={foodList}
          title={'Calories'}
          size={200}
          InnerColor={'grey'}
          FillColor={'white'}
          goal={goal.calories}
        />
        <View>
          {/* Smaller Progression Pies for Protein, Carbs, Fats */}
          <View style={style.smallProgressionContainer}>
            <ProgressionPie
              data={foodList}
              title={'Protein'}
              size={66}
              InnerColor={'grey'}
              FillColor={'red'}
              goal={goal.protein}
            />
          </View>
          <View style={style.smallProgressionContainer}>
            <ProgressionPie
              data={foodList}
              title={'Carbs'}
              size={66}
              InnerColor={'grey'}
              FillColor={'yellow'}
              goal={goal.carbs}
            />
          </View>
          <View style={style.smallProgressionContainer}>
            <ProgressionPie
              data={foodList}
              title={'Fats'}
              size={66}
              InnerColor={'grey'}
              FillColor={'orange'}
              goal={goal.fats}
            />
          </View>
        </View>
      </View>

      {/* Food Log Section */}
      <ScrollView
        style={{
          marginVertical: verticalScale(10),
        }}>
        <View style={[style.foodContainer]}>
          <MealTracker
            title={'Food log'}
            Text={'Food Log Empty'}
            onPress={() => navigation.navigate(Routes.AddFood)} // Navigate to AddFood screen
            isEmpty={displayInformation()} // Determine if food log is empty
            data={foodList} // Pass food list data
            onDeleteItem={handleDeleteItem} // Pass delete callback function
            Icon={faUtensils} // Icon for MealTracker
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the FoodLog component for use in navigation
export default FoodLog;
