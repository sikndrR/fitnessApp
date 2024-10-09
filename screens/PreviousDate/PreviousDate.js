import React from 'react';
import {SafeAreaView, View} from 'react-native';
import CalendarDisplay from '../../components/Calendar/Calendar'; // Import the Calendar component for displaying past dates
import globalStyle from '../../assets/styles/globalstyle';
import BackButton from '../../components/BackButton/BackButton';
import style from './style';

// PreviousDate Component
/**
 * NAME
 *
 * PreviousDate - A screen component that allows users to view and navigate to previous dates on the calendar.
 *
 * SYNOPSIS
 *
 * PreviousDate({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides a calendar view to select and display data for previous dates.
 * Users can navigate back to the previous screen by pressing the back button.
 *
 * RETURNS
 *
 *  JSX element representing the PreviousDate screen, including a back button and a calendar to display and select previous dates.
 */
const PreviousDate = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundColor]}>
      {/* Back Button Section */}
      <View style={style.container}>
        <BackButton
          onPress={() => {
            navigation.goBack(); // Navigate back to the previous screen
          }}
        />
      </View>

      {/* Calendar Display Section */}
      <CalendarDisplay />
    </SafeAreaView>
  );
};

// Export the PreviousDate component for use in navigation
export default PreviousDate;
