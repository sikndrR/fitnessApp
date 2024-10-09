import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {translateEmail, userInformation} from '../../API/food';
import {useSelector} from 'react-redux';
import Header from '../Header/Header';
import styles from './style';

// CalendarDisplay Component
/**
 * NAME
 *
 * CalendarDisplay - Displays a calendar view where the user can select a date and see their logged exercises.
 *
 * SYNOPSIS
 *
 * CalendarDisplay()
 *
 * DESCRIPTION
 *
 * This functional component renders a calendar using the `Calendar` component from `react-native-calendars`.
 * It displays marked dates where the user has logged exercise data. Upon selecting a date, it shows detailed
 * information about the exercises logged on that specific day.
 *
 * RETURNS
 *
 *  JSX element representing a calendar with a list of exercises for selected dates.
 */
const CalendarDisplay = () => {
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date
  const [data, setData] = useState({}); // State to store the user data retrieved from the database
  const user = useSelector((state: RootState) => state.user); // Get the user information from Redux state

  // Fetch user data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      const userEmail = translateEmail(user.email); // Translate email for consistent key formatting
      const userData = await userInformation(userEmail); // Fetch user data from the API
      setData(JSON.parse(userData)); // Parse the returned JSON string into an object and store it in state
    };

    fetchData();
  }, [user.email]); // Depend on user email to refetch if the email changes

  // Extract relevant dates from the user data (excluding non-date keys like "Goals")
  const availableDates = Object.keys(data).filter(
    key => key.match(/^\d{4}-\d{2}-\d{2}$/), // Match valid date strings in the format YYYY-MM-DD
  );

  // Mark the available dates on the calendar
  const markedDates = availableDates.reduce((acc, date) => {
    acc[date] = {selected: false, marked: true, dotColor: 'blue'}; // Customize the appearance of marked dates
    return acc;
  }, {});

  // Handle the selection of a date on the calendar
  const handleDayPress = day => {
    const {dateString} = day;
    if (data[dateString]) {
      setSelectedDate(dateString); // Set the selected date to the one clicked by the user
      console.log(`Exercises for ${dateString}:`, data[dateString].exercises); // Log the exercises for the selected date
    }
  };

  // Render an individual exercise item in the FlatList
  const renderExerciseItem = ({item}) => {
    const [exerciseName, details] = item; // Destructure the exercise name and details
    return (
      <View style={styles.exerciseItem}>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <Text>Sets: {details.Sets}</Text>
        <Text>Weight: {details.Weight} lbs</Text>
        <Text>Reps: {details.Reps}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Calendar component to display the available exercise dates */}
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates} // Mark dates where data is available
          onDayPress={handleDayPress} // Handle the selection of a date
          style={styles.calendar}
          theme={{
            textDayFontSize: 12,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>
      {selectedDate && (
        <View style={styles.detailsContainer}>
          {/* Display the selected date */}
          <Header
            title={'Selected Date: ' + selectedDate}
            color={'white'}
            type={2}
          />
          {/* Display the exercises header */}
          <Header title={'Exercises'} type={3} color={'white'} />
          {data[selectedDate]?.exercises &&
          Object.keys(data[selectedDate].exercises).length > 0 ? (
            // Display the list of exercises if they exist for the selected date
            <FlatList
              data={Object.entries(data[selectedDate].exercises)} // Convert the exercises object into an array of key-value pairs
              keyExtractor={item => item[0]} // Use the exercise name as the key
              renderItem={renderExerciseItem} // Render each exercise item using renderExerciseItem
              style={styles.exerciseList}
              contentContainerStyle={styles.exerciseListContent}
            />
          ) : (
            // Display a message if no exercises are found for the selected date
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 100,
              }}>
              <Header title={'No data found'} color={'white'} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Export the CalendarDisplay component for use in other parts of the application
export default CalendarDisplay;
