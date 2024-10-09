import auth from '@react-native-firebase/auth';
import store from '../redux/store';
import {updateToken} from '../redux/reducers/User';
import database from '@react-native-firebase/database';
import {translateEmail} from './food';

// Function to add a new user node to the database with an empty value
/**
 * NAME
 *
 * AddUserDatabase - Adds a new user node in the Firebase database with an empty value.
 *
 * SYNOPSIS
 *
 * function AddUserDatabase(a_key)
 *  a_key             --> The unique identifier for the user (typically an email or user-specific key).
 *
 * DESCRIPTION
 *
 * This function adds a new user node in the Firebase database using the provided key.
 * The key is processed to lowercase for consistency, ensuring uniformity in database storage.
 * An empty string is set for the new user node to initialize the entry in the database.
 *
 * RETURNS
 *
 *  None (function is asynchronous, using Promises). Logs output to indicate whether the operation
 *  was successful or if an error occurred.
 */
const AddUserDatabase = a_key => {
  // Convert the key to lowercase to ensure consistency in database storage
  const lowercasedKey = a_key.toLowerCase();

  // Reference to add a new user node with an empty value in the Firebase database
  database()
    .ref(`/users/${lowercasedKey}`)
    .set('')
    .then(() => {
      // Log success message indicating that the user node has been created successfully
      console.log('Empty key created successfully!');
    })
    .catch(error => {
      // Log any errors that occur during the creation process
      console.error('Error creating empty key:', error);
    });
};

// Function to create a new user in Firebase Authentication and add their information to the database
/**
 * NAME
 *
 * createUser - Registers a new user using Firebase Authentication and adds an empty node in the database.
 *
 * SYNOPSIS
 *
 * async function createUser(a_fullName, a_email, a_password)
 *  a_fullName        --> The full name of the user being registered.
 *  a_email           --> The email address of the user.
 *  a_password        --> The password for the user's account.
 *
 * DESCRIPTION
 *
 * This function creates a new user in Firebase Authentication using the provided email and password.
 * Once the user is successfully registered, their profile is updated with the full name.
 * Additionally, an empty user node is added to the Firebase database using a lowercase version
 * of the email to ensure consistent identification.
 *
 * PARAMETERS
 *
 *  fullName        - The full name of the user being registered.
 *  email           - The email address of the user being registered.
 *  password        - The password for the user's account.
 *
 * RETURNS
 *
 *  A user object if the user was successfully created. If an error occurs during the creation process,
 *  a descriptive error message is returned.
 */
export const createUser = async (a_fullName, a_email, a_password) => {
  try {
    // Create a new user in Firebase Authentication with email and password
    const user = await auth().createUserWithEmailAndPassword(
      a_email,
      a_password,
    );

    // Update the user's profile with their full name
    await user.user.updateProfile({displayName: a_fullName});

    // Add the user to the database with an empty entry using the translated email
    AddUserDatabase(translateEmail(a_email));

    // Return the user object on successful creation
    return user;
  } catch (error) {
    // Handle specific Firebase authentication errors and provide meaningful messages
    if (error.code === 'auth/email-already-in-use') {
      return {error: 'The email you entered is already in use.'};
    } else if (error.code === 'auth/invalid-email') {
      return {error: 'Please enter a valid email address'};
    }

    // Return a generic error message for other errors
    return {error: 'Something went wrong with your request'};
  }
};

// Function to log in a user using Firebase Authentication
/**
 * NAME
 *
 * loginUser - Authenticates a user with email and password using Firebase Authentication.
 *
 * SYNOPSIS
 *
 * async function loginUser(a_email, a_password)
 *  a_email           --> The email address of the user attempting to log in.
 *  a_password        --> The password of the user attempting to log in.
 *
 * DESCRIPTION
 *
 * This function logs in a user by authenticating them with Firebase using their email and password.
 * Upon successful login, the user's display name, email, and authentication token are returned.
 * If an error occurs, appropriate error messages are returned to guide the user.
 *
 * RETURNS
 *
 *  A response object indicating the status of the login attempt. If successful, it includes user
 *  data such as displayName, email, and token. If unsuccessful, it provides an error message.
 */
export const loginUser = async (email, password) => {
  try {
    // Authenticate the user using Firebase Authentication with email and password
    const response = await auth().signInWithEmailAndPassword(email, password);

    // Get the user's authentication token to allow further operations
    const token = await response.user.getIdToken();

    // Return success status and the user data if login is successful
    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error) {
    // Handle specific Firebase authentication errors and return meaningful messages
    if (error.code === 'auth/invalid-credential') {
      return {status: false, error: 'Please enter a correct password'};
    } else if (error.code === 'auth/invalid-email') {
      return {
        status: false,
        error:
          'The email you entered does not exist. Please create a new account.',
      };
    }

    // Log the error code for debugging purposes
    console.log(error.code);

    // Return a generic error message for other errors
    return {status: false, error: 'Something went wrong'};
  }
};

// Function to log out the currently authenticated user
/**
 * NAME
 *
 * logOut - Logs out the currently authenticated user using Firebase Authentication.
 *
 * SYNOPSIS
 *
 * async function logOut()
 *
 * DESCRIPTION
 *
 * This function logs out the currently authenticated user by calling Firebase's signOut method.
 * It clears the authentication state, preventing the user from accessing protected resources
 * until they log in again.
 *
 * RETURNS
 *
 *  None (function is asynchronous). Logs the user out of their current session.
 */
export const logOut = async () => {
  // Log out the currently authenticated user
  await auth().signOut();
};

// Function to check and refresh the user's authentication token
/**
 * NAME
 *
 * checkToken - Retrieves and refreshes the authentication token of the currently authenticated user.
 *
 * SYNOPSIS
 *
 * async function checkToken()
 *
 * DESCRIPTION
 *
 * This function retrieves and refreshes the authentication token for the currently logged-in user
 * by calling Firebase's `getIdToken` method. The token is updated and stored using the Redux store
 * dispatch. This ensures that the user always has an up-to-date authentication token for secure operations.
 *
 * RETURNS
 *
 *  A refreshed authentication token as a string if successful. If an error occurs, it returns the error object.
 */
export const checkToken = async () => {
  try {
    // Retrieve and refresh the authentication token for the current user
    let response = await auth().currentUser.getIdToken(true);

    // Log that the token is being updated
    console.log('Updating token for you');

    // Dispatch an action to update the token in the Redux store
    store.dispatch(updateToken(response));

    // Return the updated token
    return response;
  } catch (error) {
    // Return the error if any issues occur during token retrieval
    return error;
  }
};
