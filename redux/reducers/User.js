import {createSlice} from '@reduxjs/toolkit';

// Initial state for the user slice
/**
 * initialState - Defines the default state of the user.
 *
 * PROPERTIES
 *
 *  isLoggedIn     - Boolean indicating whether the user is logged in (default: false).
 *  profileImage   - URL string representing the user's default profile image.
 *  goals          - An object representing the user's dietary goals including calories, protein, carbs, and fats.
 */
const initialState = {
  isLoggedIn: false,
  profileImage:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
  goals: {
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  },
};

// User slice using Redux Toolkit
/**
 * User - A Redux slice that manages user state, including authentication status, profile image, and goals.
 *
 * REDUCERS
 *
 *  logIn            - Updates the user state to mark them as logged in and merges additional user data from action payload.
 *  resetToInitialState - Resets the user state to its initial state.
 *  updateToken      - Updates the user's authentication token.
 *  updateGoals      - Updates the user's dietary goals (calories, protein, carbs, fats).
 */
export const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // Reducer to log in the user and update user state with additional data
    /**
     * logIn - Marks the user as logged in and merges additional user data from the action payload.
     *
     * PARAMETERS
     *
     *  state          - The current user state.
     *  action         - Contains additional user data to merge into the state.
     *
     * RETURNS
     *
     *  The updated state with `isLoggedIn` set to true and merged data from action payload.
     */
    logIn: (state, action) => {
      return {...state, ...{isLoggedIn: true}, ...action.payload};
    },

    // Reducer to reset the user state to the initial state
    /**
     * resetToInitialState - Resets the user state to its initial values.
     *
     * PARAMETERS
     *
     *  state          - The current user state.
     *
     * RETURNS
     *
     *  The initial state of the user.
     */
    resetToInitialState: () => {
      return initialState;
    },

    // Reducer to update the user's authentication token
    /**
     * updateToken - Updates the user's authentication token.
     *
     * PARAMETERS
     *
     *  state          - The current user state.
     *  action         - Contains the new token as payload.
     *
     * RETURNS
     *
     *  The updated state with the new token value.
     */
    updateToken: (state, action) => {
      state.token = action.payload;
    },

    // Reducer to update the user's dietary goals
    /**
     * updateGoals - Updates the user's dietary goals.
     *
     * PARAMETERS
     *
     *  state          - The current user state.
     *  action         - Contains the updated goals as payload.
     *
     * RETURNS
     *
     *  The updated state with the new goals values.
     */
    updateGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
});

// Export individual reducer actions for use in components
export const {logIn, resetToInitialState, updateToken, updateGoals} =
  User.actions;

// Export the user reducer to be included in the Redux store
export default User.reducer;
