import React from 'react';
import {Pressable, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

// Button Component
/**
 * NAME
 *
 * Button - A customizable button component with optional disabled state.
 *
 * SYNOPSIS
 *
 * Button(props)
 *  props.title     - The text displayed on the button (required).
 *  props.isDisabled - A boolean that determines if the button is disabled (optional).
 *  props.onPress   - A function that is called when the button is pressed (optional).
 *
 * DESCRIPTION
 *
 * This functional component renders a button using the `Pressable` component from React Native.
 * The button displays text and has an optional disabled state, which changes the button's style and
 * disables user interaction. The button also takes a function to handle the press event.
 *
 * RETURNS
 *
 *  JSX element representing a button with customizable title, disabled state, and onPress handler.
 */
const Button = props => {
  return (
    // Pressable component to handle button press events
    <Pressable
      disabled={props.isDisabled} // Disables the button if isDisabled is true
      style={[style.button, props.isDisabled && style.disabled]} // Applies styles based on the disabled state
      onPress={() => props.onPress()} // Calls the onPress function when the button is pressed
    >
      {/* Text component to display the button's title */}
      <Text style={style.title}>{props.title}</Text>
    </Pressable>
  );
};

// Default prop values for the Button component
/**
 * defaultProps - Provides default values for the props to ensure the button behaves correctly if no values are provided.
 */
Button.defaultProps = {
  isDisabled: false, // By default, the button is enabled
  onPress: () => {}, // By default, onPress is an empty function to prevent undefined errors
};

// Define prop types to enforce the correct props for the Button component
Button.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and must be a string
  isDisabled: PropTypes.bool, // Optional boolean to set if the button is disabled
  onPress: PropTypes.func, // Optional function to handle button press events
};

// Export the Button component for use in other parts of the application
export default Button;
