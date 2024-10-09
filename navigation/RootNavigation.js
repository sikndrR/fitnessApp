import {useSelector} from 'react-redux';
import {Authorized, UnAuthorized} from './MainNavigation';

// RootNavigation Component
/**
 * RootNavigation - Determines which navigation stack to display based on the user's authentication state.
 *
 * SYNOPSIS
 *
 * RootNavigation()
 *
 * DESCRIPTION
 *
 * This functional component acts as the root navigator for the application. It checks the user's authentication status,
 * using Redux state to determine if the user is logged in. If the user is logged in (`isLoggedIn` is true),
 * the `Authorized` navigation is rendered, allowing access to the main application. If the user is not logged in,
 * the `UnAuthorized` navigation is rendered, allowing access only to login, registration, and other restricted screens.
 *
 * RETURNS
 *
 *  JSX element representing either the `Authorized` or `UnAuthorized` navigation stack based on the user's login status.
 */
export const RootNavigation = () => {
  // Access the user's state from the Redux store
  const user = useSelector(state => state.user);

  // If the user is logged in, render the authorized stack; otherwise, render the unauthorized stack
  return user.isLoggedIn ? <Authorized /> : <UnAuthorized />;
};
