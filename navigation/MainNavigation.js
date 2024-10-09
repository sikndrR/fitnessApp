import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FoodLog from '../screens/FoodLog/FoodLog';
import Weights from '../screens/Weights/Weights';
import Profile from '../screens/Profile/Profile';
import Registration from '../screens/Registration/Registration';
import Login from '../screens/Login/Login';
import Goals from '../screens/Goals/Goals';
import {Routes} from './Routes';
import {createStackNavigator} from '@react-navigation/stack';
import AddFood from '../screens/AddFood/AddFood';
import FoodSelected from '../screens/FoodSelected/FoodSelected';
import AddExercise from '../screens/AddExercise/AddExercise';
import PreviousDate from '../screens/PreviousDate/PreviousDate';
import {
  faGear,
  faUtensils,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// Authorized Component
/**
 * NAME
 *
 * Authorized - Provides a stack navigator for authorized users.
 * This navigator includes the main application tabs and additional screens accessible to logged-in users.
 *
 * SYNOPSIS
 *
 * Authorized()
 *
 * DESCRIPTION
 *
 * This component renders a stack navigator for authorized users, starting with a bottom tab navigator (`MyTabs`)
 * and allowing users to navigate to additional screens like adding food, adding exercises, and viewing selected food items.
 *
 * RETURNS
 *
 *  JSX element representing a stack navigator for authorized users.
 */
export const Authorized = () => {
  // Create a stack navigator
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* The main tab navigator for authorized users */}
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{headerShown: false}}
      />
      {/* Stack screens for additional functionalities */}
      <Stack.Screen name={Routes.AddFood} component={AddFood} />
      <Stack.Screen name={Routes.AddExercise} component={AddExercise} />
      <Stack.Screen name={Routes.FoodSelected} component={FoodSelected} />
      <Stack.Screen name={Routes.PreviousDate} component={PreviousDate} />
    </Stack.Navigator>
  );
};

// MyTabs Component
/**
 * NAME
 *
 * MyTabs - Provides a bottom tab navigator for main application screens.
 *
 * SYNOPSIS
 *
 * MyTabs()
 *
 * DESCRIPTION
 *
 * This component renders a bottom tab navigator that allows authorized users to navigate between different sections
 * of the application, including `FoodLog`, `Weights`, and `Profile`.
 *
 * RETURNS
 *
 *  JSX element representing a bottom tab navigator.
 */
export const MyTabs = () => {
  // Create a bottom tab navigator
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={Routes.FoodLog}
      screenOptions={{
        headerShown: false, // Hide headers for tabs
        tabBarActiveTintColor: 'white', // Active tab text color
        tabBarStyle: {backgroundColor: '#273746'}, // Style for the tab bar
      }}>
      {/* Define the main tabs of the application */}
      <Tab.Screen
        name={Routes.FoodLog}
        component={FoodLog}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faUtensils} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Weights}
        component={Weights}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faDumbbell} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faGear} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// UnAuthorized Component
/**
 * NAME
 *
 * UnAuthorized - Provides a stack navigator for unauthorized users.
 * This navigator includes the login, registration, and goal-setting screens.
 *
 * SYNOPSIS
 *
 * UnAuthorized()
 *
 * DESCRIPTION
 *
 * This component renders a stack navigator for unauthorized users, starting with the `Login` screen
 * and providing navigation options for `Registration` and `Goals` screens.
 *
 * RETURNS
 *
 *  JSX element representing a stack navigator for unauthorized users.
 */
export const UnAuthorized = () => {
  // Create a stack navigator
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{headerShown: false}} // Hide headers for all screens
    >
      {/* Define the main screens for unauthorized users */}
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Registration} component={Registration} />
      <Stack.Screen name={Routes.Goals} component={Goals} />
    </Stack.Navigator>
  );
};
