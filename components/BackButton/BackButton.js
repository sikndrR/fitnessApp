import React from 'react';
import style from './style';
import {Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// BackButton Component
/**
 * NAME
 *
 * BackButton - A simple reusable button component that triggers an action when pressed.
 * It displays an arrow icon to indicate the action of navigating back.
 *
 * SYNOPSIS
 *
 * BackButton(props)
 *  props           --> Object containing properties passed to this component.
 *
 * DESCRIPTION
 *
 * This functional component renders a back button using the `Pressable` component from React Native.
 * When the button is pressed, it calls the `onPress` function passed as a prop.
 * The button includes a left arrow icon for better user interface indication.
 *
 * RETURNS
 *
 *  JSX element representing a back button with a left arrow icon.
 *
 */
const BackButton = props => {
  return (
    // Pressable component to handle touch events
    <Pressable onPress={() => props.onPress()} style={style.container}>
      {/* FontAwesomeIcon for displaying the back arrow icon */}
      <FontAwesomeIcon icon={faArrowLeft} size={10} />
    </Pressable>
  );
};

// Define prop types to enforce the correct props for the BackButton component
BackButton.propTypes = {
  onPress: PropTypes.func.isRequired, // onPress is a required function to handle the button press
};

// Export the BackButton component for use in other parts of the application
export default BackButton;
