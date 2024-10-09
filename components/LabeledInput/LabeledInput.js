import React from 'react';
import {View, TextInput} from 'react-native';
import Header from '../Header/Header';
import PropTypes from 'prop-types';
import style from './style';

// LabeledInput Component
/**
 * NAME
 *
 * LabeledInput - A reusable labeled input component that includes a header label and an input field.
 *
 * SYNOPSIS
 *
 * LabeledInput(props)
 *  props.label     - The text displayed above the input field as a label (required).
 *  props.value     - The value of the input field (optional).
 *  props.placeholder - The placeholder text displayed inside the input field (optional).
 *  props.keyboardType - Specifies the type of keyboard to use (e.g., numeric, email-address) (optional).
 *  props.onChangeText - A function that is called whenever the input text changes (required).
 *
 * DESCRIPTION
 *
 * This functional component renders an input field with a label besides it. The label is displayed using the
 * `Header` component, and the input field allows for customization, including placeholder text, keyboard type,
 * and handling text changes via a callback function.
 *
 *
 * RETURNS
 *
 *  JSX element representing a labeled input field with a customizable label and text input.
 */
export const LabeledInput = props => {
  return (
    <View style={style.container}>
      {/* Render the label using the Header component */}
      <Header title={props.label} color={'white'} type={3} />
      {/* Container for the input field */}
      <View style={style.InputContainer}>
        <TextInput
          style={style.input} // Apply custom styles to the input field
          value={props.value} // Bind the value to the prop value
          placeholder={props.placeholder} // Set placeholder text if provided
          placeholderTextColor={'white'} // Set the placeholder text color
          keyboardType={props.keyboardType} // Set the keyboard type based on the prop value
          onChangeText={val => props.onChangeText(val)} // Trigger the onChangeText callback when text changes
        />
      </View>
    </View>
  );
};

// Default prop values for the LabeledInput component
/**
 * defaultProps - Provides default values for the props to ensure the input behaves correctly if no values are provided.
 */
LabeledInput.defaultProps = {
  label: '', // Default label is an empty string
  placeholder: '', // Default placeholder is an empty string
  onChangeText: () => {}, // Default onChangeText is an empty function to prevent undefined errors
  keyboardType: 'default', // Default keyboard type is 'default'
};

// Define prop types to enforce the correct props for the LabeledInput component
LabeledInput.propTypes = {
  label: PropTypes.string.isRequired, // Label is required and must be a string
  value: PropTypes.string, // Value must be a string
  placeholder: PropTypes.string, // Placeholder must be a string
  onChangeText: PropTypes.func.isRequired, // onChangeText is required and must be a function
  keyboardType: PropTypes.string, // Specifies the type of keyboard
};

// Export the LabeledInput component for use in other parts of the application
export default LabeledInput;
