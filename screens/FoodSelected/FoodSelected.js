import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../../components/Header/Header';
import globalStyle from '../../assets/styles/globalstyle';
import {LabeledInput} from '../../components/LabeledInput/LabeledInput';
import PieChart from 'react-native-pie-chart';
import Button from '../../components/Button/Button';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import style from './style';
import {useSelector} from 'react-redux';
import {AddFoodToDatabase, translateEmail} from '../../API/food';
import {Routes} from '../../navigation/Routes';

// FoodSelected Component
/**
 * NAME
 *
 * FoodSelected - A screen component that allows users to view and edit nutritional details for a selected food.
 *
 * SYNOPSIS
 *
 * FoodSelected({ route, navigation })
 *  route           --> Contains the route information and params to get the selected food item.
 *  navigation      --> The navigation prop for controlling navigation between screens.
 *
 * DESCRIPTION
 *
 * This functional component displays detailed nutritional information for a food item, either from an API or manually entered.
 * Users can edit the information, visualize nutritional distribution using a pie chart, and add the food to their log.
 *
 * RETURNS
 *
 *  JSX element representing the FoodSelected screen with inputs for food details and actions to add or cancel.
 */
const FoodSelected = props => {
  const [calories, setCalories] = useState(1);
  const [protein, setProtein] = useState(1);
  const [carbs, setCarbs] = useState(1);
  const [fats, setFats] = useState(1);
  const [name, setName] = useState('');
  const [data, setData] = useState([1, 1, 1]); // Nutritional data array for pie chart (fats, carbs, protein)
  const [checkItem, setCheckItems] = useState(true); // Flag to check if the item is being prepopulated

  const {route, navigation} = props;

  // Safely access item, handle if undefined
  const item = route?.params?.item || null;

  const user = useSelector((state: RootState) => state.user);

  // Function to update nutritional data from API item
  /**
   * updatedData - Updates the nutritional values and returns an array for the pie chart.
   *
   * DESCRIPTION
   *
   * If an item is selected from the API, this function prepopulates the nutritional values.
   * It returns an array containing the updated values for fats, carbs, and protein, used by the pie chart.
   *
   * RETURNS
   *
   *  Array of nutritional values [fats, carbs, protein].
   */
  const updatedData = () => {
    // Item from API was selected
    if (item != null) {
      // Prepopulate information only once
      if (checkItem === true) {
        if (item.labelNutrients?.calories?.value != null) {
          setCalories(item.labelNutrients.calories.value.toString());
        }
        if (item.labelNutrients?.protein?.value != null) {
          setProtein(item.labelNutrients.protein.value.toString());
        }
        if (item.labelNutrients?.fat?.value != null) {
          setFats(item.labelNutrients.fat.value.toString());
        }
        if (item?.labelNutrients?.carbohydrates?.value != null) {
          setCarbs(item.labelNutrients.carbohydrates.value.toString());
        }
        setCheckItems(false);
      }
    }

    // Ensure all values are non-zero for pie chart visualization
    if (fats === 0) {
      setFats(1);
      setCarbs(1);
      setProtein(1);
    }

    return [fats, carbs, protein];
  };

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date

  return (
    <SafeAreaView style={[globalStyle.backgroundColor, globalStyle.flex]}>
      {/* Header Section */}
      <View
        style={{
          marginVertical: verticalScale(30),
          marginHorizontal: horizontalScale(10),
        }}>
        <Header title={'Food Selected'} color={'white'} type={1} />
      </View>

      {/* Pie Chart Section */}
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: horizontalScale(10),
          marginVertical: verticalScale(10),
          paddingBottom: verticalScale(10),
        }}>
        {/* Pie chart representing the distribution of protein, carbs, and fats */}
        <PieChart
          widthAndHeight={250}
          series={updatedData()} // Update data for pie chart
          coverRadius={0.75}
          coverFill={'#273746'}
          sliceColor={['#FFA500', '#FFFF00', '#FF0000']}
        />
        {/* Legend for Pie Chart */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View style={style.individualLegendText}>
            <View style={[style.square, {backgroundColor: 'red'}]} />
            <Text style={style.legendText}> Protein</Text>
          </View>
          <View style={style.individualLegendText}>
            <View style={[style.square, {backgroundColor: 'yellow'}]} />
            <Text style={style.legendText}> Carbohydrates</Text>
          </View>
          <View style={style.individualLegendText}>
            <View style={[style.square, {backgroundColor: 'orange'}]} />
            <Text style={style.legendText}> Fats</Text>
          </View>
        </View>
      </View>

      {/* Inputs Section for Food Details */}
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {/* Inputs for name, calories, protein, carbs, and fats */}
        <LabeledInput
          label={'Name: '}
          value={name}
          placeholder={'Enter Name'}
          onChangeText={val => {
            setName(val);
          }}
        />
        <LabeledInput
          label={'Calories: '}
          value={calories}
          placeholder={'Enter total Calories'}
          onChangeText={val => {
            setCalories(val);
          }}
        />
        <LabeledInput
          label={'Protein: '}
          value={protein}
          placeholder={'Enter total Protein'}
          onChangeText={val => {
            setProtein(val);
          }}
        />
        <LabeledInput
          label={'Carbohydrates: '}
          value={carbs}
          placeholder={'Enter total Carbohydrates'}
          onChangeText={val => {
            setCarbs(val);
          }}
        />
        <LabeledInput
          label={'Fats: '}
          value={fats}
          placeholder={'Enter total Fats'}
          onChangeText={val => {
            setFats(val);
          }}
        />
      </View>

      {/* Button Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: verticalScale(10),
          marginVertical: verticalScale(10),
          marginHorizontal: horizontalScale(40),
        }}>
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
            isDisabled={
              name.length <= 1 ||
              calories.length < 1 ||
              protein.length < 1 ||
              carbs.length < 1 ||
              fats.length < 1
            } // Disable button if any field is missing
            onPress={async () => {
              await AddFoodToDatabase(
                translateEmail(user.email), // Add food to the database using the translated email
                name,
                calories,
                protein,
                fats,
                carbs,
              );
              navigation.navigate(Routes.FoodLog); // Navigate back to FoodLog screen after adding
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// PropTypes for FoodSelected component
FoodSelected.propTypes = {
  foodSelected: PropTypes.object.isRequired,
};

// Export the FoodSelected component for use in navigation
export default FoodSelected;
