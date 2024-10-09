import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

// Function to check if the current date exists in the user's data, and if not, add it with an empty value
/**
 * NAME
 *
 * CheckAndAddDate - Verifies if the current date exists in the user's data.
 * If not, it adds a new entry with empty food and exercises values.
 *
 * SYNOPSIS
 *
 * async function CheckAndAddDate(userEmail, currentDate)
 *  a_userEmail       --> The email of the user, used as a unique identifier.
 *  a_currentDate     --> The date to be checked in the user's data, formatted as a string.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and checks if the specified
 * currentDate node exists under the user's node. If it doesn't exist, it creates
 * a new entry for the date, initializing `food` and `exercises` with empty strings.
 *
 * RETURNS
 *
 *  None (function is asynchronous and logs output accordingly).
 */
export const CheckAndAddDate = async (a_userEmail, a_currentDate) => {
  try {
    // Reference to the user's node in the Firebase database
    const userRef = database().ref(`/users/${a_userEmail}`);

    // Check if the current date exists in the user's data by accessing the specified node
    const snapshot = await userRef.child(a_currentDate).once('value');

    if (snapshot.exists()) {
      // Log if the current date already exists
      console.log(
        `Date ${a_currentDate} already exists for user ${a_userEmail}.`,
      );
    } else {
      // If the date does not exist, add it with an empty value for `food` and `exercises`
      await userRef.child(a_currentDate).set({
        food: '',
        exercises: '',
      });
      console.log(`Added date ${a_currentDate} for user ${a_userEmail}.`);
    }
  } catch (error) {
    // Log any errors that occur during the check or add process
    console.error('Error checking or adding date:', error);
  }
};

// Function to get food information for a given date and user
/**
 * NAME
 *
 * foodInformation - Retrieves food information for a specific user and date.
 * Transforms the food data from an object into an array format suitable for UI display.
 *
 * SYNOPSIS
 *
 * async function foodInformation(date, userEmail)
 *  a_date            --> The date for which food information is requested.
 *  a_userEmail       --> The email of the user whose food information is requested.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and retrieves the food data for
 * a specific user on a given date. If food data exists, it transforms the object
 * into an array of key-value pairs for easier manipulation and display.
 *
 * RETURNS
 *
 *  An array of food objects if data exists, otherwise an empty string.
 *  Logs output to indicate whether food information was found or not.
 */
export const foodInformation = async (a_date, a_userEmail) => {
  // Reference to the user's food data for the given date in the Firebase database
  const rootRef = database().ref(`/users/${a_userEmail}/${a_date}/food`);

  try {
    // Retrieve the food data for the specified date and user
    const snapshot = await rootRef.once('value');

    if (snapshot.exists()) {
      // Extract the food data as an object if it exists
      const foodData = snapshot.val();
      console.log('Food information exists:', foodData);

      // Transform the food data object into an array of key-value pairs
      const foodArray = Object.keys(foodData).map(key => ({
        foodName: key,
        ...foodData[key], // Include nutritional information by spreading it into the object
      }));

      console.log('Transformed Food Array:', foodArray);

      return foodArray; // Return the array to display in a list
    } else {
      // Log if no food information exists for the specified date
      console.log('No food information');
      return ''; // Return an empty string if no data exists
    }
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error fetching food information:', error);
  }
};

// Function to get user information
/**
 * NAME
 *
 * userInformation - Retrieves all information associated with a specific user.
 * Converts the user data to JSON format for easier usage and transfer.
 *
 * SYNOPSIS
 *
 * async function userInformation(userEmail)
 *  a_userEmail       --> The email of the user whose information is being retrieved.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and retrieves all the data
 * related to a specific user. The retrieved data includes various categories such
 * as food, exercises, goals, etc. The data is then converted into a JSON string
 * for further processing or storage.
 *
 * RETURNS
 *
 *  A JSON string representing all user data if the user is found, otherwise an empty string.
 *  Logs output indicating whether user information was found or not.
 */
export const userInformation = async a_userEmail => {
  // Reference to the user's root node in the Firebase database
  const rootRef = database().ref(`/users/${a_userEmail}`);

  try {
    // Retrieve all data for the specified user
    const snapshot = await rootRef.once('value');

    if (snapshot.exists()) {
      // Extract all user data as an object
      const userData = snapshot.val();
      console.log('User Data:', userData);

      // Convert the entire user data to a JSON string for easy storage/transfer
      const convertedInformation = JSON.stringify(userData);

      console.log('Converted Information:', convertedInformation);
      return convertedInformation; // Return the JSON representation of the user data
    } else {
      // Log if no user information was found for the specified email
      console.log('No user information found');
      return ''; // Return an empty string if no data exists for the user
    }
  } catch (error) {
    // Log any errors that occur during the data retrieval process
    console.error('Error fetching user information:', error);
  }
};

// Function to get exercise information for a given date and user
/**
 * NAME
 *
 * weightInformation - Retrieves exercise information for a specific user and date.
 * Transforms the exercise data from an object into an array format suitable for UI display.
 *
 * SYNOPSIS
 *
 * async function weightInformation(date, userEmail)
 *  a_date            --> The date for which exercise information is requested.
 *  a_userEmail       --> The email of the user whose exercise information is requested.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and retrieves the exercise data
 * for a specific user on a given date. If exercise data exists, it transforms the
 * object into an array of key-value pairs for easier manipulation and display.
 *
 * RETURNS
 *
 *  An array of exercise objects if data exists, otherwise an empty string.
 *  Logs output to indicate whether exercise information was found or not.
 */
export const weightInformation = async (a_date, a_userEmail) => {
  // Reference to the user's exercise data for the given date in the Firebase database
  const rootRef = database().ref(`/users/${a_userEmail}/${a_date}/exercises`);

  try {
    // Retrieve the exercise data for the specified date and user
    const snapshot = await rootRef.once('value');

    if (snapshot.exists()) {
      // Extract the exercise data as an object if it exists
      const weightData = snapshot.val();
      console.log('Exercise information exists:', weightData);

      // Transform the exercise data object into an array of key-value pairs
      const exerciseArray = Object.keys(weightData).map(key => ({
        exerciseName: key,
        ...weightData[key], // Include the details of each exercise by spreading it into the object
      }));

      console.log('Transformed Exercise Array:', exerciseArray);

      return exerciseArray; // Return the array to display in a list
    } else {
      // Log if no exercise information exists for the specified date
      console.log('No exercise information');
      return ''; // Return an empty string if no data exists
    }
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error fetching exercise information:', error);
  }
};

// Function to get goals information for a user
/**
 * NAME
 *
 * goalsInformation - Retrieves the goals information for a specific user.
 *
 * SYNOPSIS
 *
 * async function goalsInformation(a_userEmail)
 *  a_userEmail       --> The email of the user whose goals information is being requested.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and retrieves the goals data
 * for a specific user. If the data exists, it is returned for further use.
 *
 * RETURNS
 *
 *  An object containing the user's goals data if it exists, otherwise an empty string.
 *  Logs output to indicate whether goals information was found or not.
 */
export const goalsInformation = async a_userEmail => {
  // Reference to the user's goals data in the Firebase database
  const rootRef = database().ref(`/users/${a_userEmail}/Goals`);

  // Log the user email for debugging purposes
  console.log(a_userEmail);

  try {
    // Retrieve the goals data for the specified user
    const snapshot = await rootRef.once('value');

    if (snapshot.exists()) {
      // Extract the goals data as an object if it exists
      const goalsData = snapshot.val();
      console.log('Goals information exists:', goalsData);

      return goalsData; // Return the goals data object
    } else {
      // Log if no goals information exists for the specified user
      console.log('No goals information');
      return ''; // Return an empty string if no data exists
    }
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error fetching goals information:', error);
  }
};

// Function to add food information into the database
/**
 * NAME
 *
 * AddFoodToDatabase - Adds a new food entry for a user on the current date.
 *
 * SYNOPSIS
 *
 * async function AddFoodToDatabase(a_userEmail, a_name, a_calories, a_protein, a_fats, a_carbs)
 *  a_userEmail       --> The email of the user whose food data is being added.
 *  a_name            --> The name of the food item.
 *  a_calories        --> The calorie content of the food item.
 *  a_protein         --> The protein content of the food item.
 *  a_fats            --> The fats content of the food item.
 *  a_carbs           --> The carbohydrate content of the food item.
 *
 * DESCRIPTION
 *
 * This function adds a new food entry to the user's data in the Firebase database
 * for the current date. The function saves nutritional details like calories, protein,
 * fats, and carbohydrates for the given food item.
 *
 * RETURNS
 *
 *  None (function is asynchronous). Logs output to indicate whether the food was successfully added or if an error occurred.
 */
export const AddFoodToDatabase = async (
  a_userEmail,
  a_name,
  a_calories,
  a_protein,
  a_fats,
  a_carbs,
) => {
  try {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Reference to the user's food data for the current date in the Firebase database
    const userRef = database().ref(`/users/${a_userEmail}/${currentDate}/food`);

    // Add the new food entry under the specified food name
    await userRef.child(a_name).set({
      Calories: a_calories,
      Protein: a_protein,
      Fats: a_fats,
      Carbs: a_carbs,
    });

    // Log success message indicating that the food has been added
    console.log('Food added');
  } catch (error) {
    // Log any errors that occur during the addition process
    console.error('Error adding food:', error);
  }
};

// Function to add exercise information into the database
/**
 * NAME
 *
 * AddExerciseToDatabase - Adds a new exercise entry for a user on the current date.
 *
 * SYNOPSIS
 *
 * async function AddExerciseToDatabase(a_userEmail, a_name, a_sets, a_reps, a_weight)
 *  a_userEmail       --> The email of the user whose exercise data is being added.
 *  a_name            --> The name of the exercise.
 *  a_sets            --> The number of sets performed for the exercise.
 *  a_reps            --> The number of repetitions per set.
 *  a_weight          --> The weight used for the exercise.
 *
 * DESCRIPTION
 *
 * This function adds a new exercise entry to the user's data in the Firebase database
 * for the current date. The function saves details such as sets, reps, and weight
 * used for the specified exercise.
 *
 * RETURNS
 *
 *  None (function is asynchronous). Logs output to indicate whether the exercise was successfully added or if an error occurred.
 */
export const AddExerciseToDatabase = async (
  a_userEmail,
  a_name,
  a_sets,
  a_reps,
  a_weight,
) => {
  try {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Reference to the user's exercise data for the current date in the Firebase database
    const userRef = database().ref(
      `/users/${a_userEmail}/${currentDate}/exercises`,
    );

    // Add the new exercise entry under the specified exercise name
    await userRef.child(a_name).set({
      Sets: a_sets,
      Reps: a_reps,
      Weight: a_weight,
    });

    // Log success message indicating that the exercise has been added
    console.log('Exercise Added');
  } catch (error) {
    // Log any errors that occur during the addition process
    console.error('Error adding exercise:', error);
  }
};

// Function to delete a food item from the database
/**
 * NAME
 *
 * deleteFoodItem - Deletes a specific food item for a user on a given date.
 *
 * SYNOPSIS
 *
 * async function deleteFoodItem(a_useremail, a_date, a_foodName)
 *  a_useremail       --> The email of the user whose food item is being deleted.
 *  a_date            --> The date for which the food item is to be deleted.
 *  a_foodName        --> The name of the food item to be deleted.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and deletes a specific food item
 * for the user on the specified date. It ensures that unwanted or incorrectly added
 * food items can be removed from the user's data.
 *
 * RETURNS
 *
 *  None (function is asynchronous). Logs output to indicate whether the deletion was successful or if an error occurred.
 */
export const deleteFoodItem = async (a_userEmail, a_date, a_foodName) => {
  try {
    // Reference to the specific food item for the given user and date in the Firebase database
    const foodRef = database().ref(
      `/users/${a_userEmail}/${a_date}/food/${a_foodName}`,
    );

    // Remove the specified food item from the database
    await foodRef.remove();

    // Log success message indicating that the food item has been deleted
    console.log(`Deleted ${a_foodName}`);
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error deleting food item:', error);
  }
};

// Function to delete an exercise item from the database
/**
 * NAME
 *
 * deleteExercise - Deletes a specific exercise for a user on a given date.
 *
 * SYNOPSIS
 *
 * async function deleteExercise(a_userEmail, a_date, a_exerciseName)
 *  a_userEmail       --> The email of the user whose exercise is being deleted.
 *  a_date            --> The date for which the exercise is to be deleted.
 *  a_exerciseName    --> The name of the exercise to be deleted.
 *
 * DESCRIPTION
 *
 * This function connects to the Firebase database and deletes a specific exercise
 * for the user on the specified date. It helps in managing exercise data by allowing
 * users to remove incorrect or unwanted entries.
 *
 * RETURNS
 *
 *  None (function is asynchronous). Logs output to indicate whether the deletion was successful or if an error occurred.
 */
export const deleteExercise = async (a_userEmail, a_date, a_exerciseName) => {
  try {
    // Reference to the specific exercise for the given user and date in the Firebase database
    const exerciseRef = database().ref(
      `/users/${a_userEmail}/${a_date}/exercises/${a_exerciseName}`,
    );

    // Remove the specified exercise item from the database
    await exerciseRef.remove();

    // Log success message indicating that the exercise item has been deleted
    console.log(`Deleted ${a_exerciseName}`);
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error deleting exercise:', error);
  }
};

// Function to translate an email by extracting the username part before the first dot ('.')
/**
 * NAME
 *
 * translateEmail - Extracts and returns the part of the email before the first dot ('.').
 * Converts the extracted part to lowercase.
 *
 * SYNOPSIS
 *
 * function translateEmail(a_email)
 *  a_email           --> The email string to be processed.
 *
 * DESCRIPTION
 *
 * This function processes an email string by extracting only the portion before the first dot ('.').
 * The extracted username is then converted to lowercase and returned. This function can be useful
 * for consistently generating unique keys or identifiers based on email addresses.
 *
 * RETURNS
 *
 *  A string representing the part of the email before the first dot, converted to lowercase.
 */
export const translateEmail = a_email => {
  let processedEmail = '';

  // Loop through each character in the email
  for (let i = 0; i < a_email.length; i++) {
    const currentChar = a_email[i];

    // Stop processing if a dot ('.') is encountered
    if (currentChar === '.') {
      break;
    } else {
      // Append the character to processedEmail if it's not a dot
      processedEmail += currentChar;
    }
  }

  // Return the processed email string in lowercase format
  return processedEmail.toLowerCase();
};

// Function to set user goals in the database
/**
 * NAME
 *
 * setGoals - Sets or updates the user's goals in the Firebase database.
 *
 * SYNOPSIS
 *
 * async function setGoals(a_goals, a_userEmail)
 *  a_goals           --> An object containing the user's goals information.
 *  a_userEmail       --> The email of the user whose goals are being set.
 *
 * DESCRIPTION
 *
 * This function stores the user's goals in the Firebase database. The provided email is processed
 * to create a consistent and unique identifier for each user. The goals data is then stored under
 * the user's node in the database.
 *
 * RETURNS
 *
 *  None (function is asynchronous). It performs an update operation in the database.
 */
export const setGoals = async (a_goals, a_userEmail) => {
  // Use the translateEmail function to process the user's email for consistency in database keys
  const email = translateEmail(a_userEmail);

  // Reference to the user's node in the Firebase database
  const userRef = database().ref(`/users/${email}`);

  // Set or update the user's goals under the 'Goals' node
  await userRef.child('Goals').set(a_goals);
};
