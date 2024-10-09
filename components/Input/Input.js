import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import style from './style';
import PropTypes from 'prop-types';

// Input Component
/**
 * NAME
 *
 * Input - A reusable text input component with a label and customizable properties.
 *
 * SYNOPSIS
 *
 * Input(props)
 *  props.label     - The label text displayed above the input field (required).
 *  props.placeholder - The placeholder text displayed inside the input field (optional).
 *  props.secureTextEntry - A boolean that indicates if the input should mask the text (useful for passwords) (optional).
 *  props.keyboardType - Specifies the type of keyboard to use (e.g., numeric, email-address) (optional).
 *  props.onChangeText - A function that is called whenever the input text changes (optional).
 *
 * DESCRIPTION
 *
 * This functional component renders a text input with a label. The input's value is managed internally,
 * and it has customizable properties such as secure text entry (for passwords), keyboard type, and
 * placeholder text. The input also triggers a callback whenever the text changes.
 *
 * RETURNS
 *
 *  JSX element representing a labeled input field.
 */
const Input = props => {
  // State to store the value of the input field
  const [value, setValue] = useState('');

  return (
    <View>
      {/* Label for the input field */}
      <Text style={style.label}>{props.label}</Text>
      {/* TextInput component for user input */}
      <TextInput
        placeholder={props.placeholder ? props.placeholder : null} // Set placeholder text if provided
        style={style.input} // Apply custom styles for the input
        value={value} // Bind the input value to the state
        secureTextEntry={props.secureTextEntry} // Determine if text should be masked (e.g., for passwords)
        keyboardType={props.keyboardType} // Set the keyboard type based on the prop value
        onChangeText={val => {
          setValue(val); // Update the internal state when text changes
          props.onChangeText(val); // Call the onChangeText function passed as a prop
        }}
      />
    </View>
  );
};

// Default prop values for the Input component
/**
 * defaultProps - Provides default values for the props to ensure the input behaves correctly if no values are provided.
 */
Input.defaultProps = {
  onChangeText: () => {}, // Default onChangeText is an empty function to prevent undefined errors
  keyboardType: 'default', // Default keyboard type is 'default'
  secureTextEntry: false, // By default, the text is not masked
};

// Define prop types to enforce the correct props for the Input component
Input.propTypes = {
  label: PropTypes.string.isRequired, // Label is required and must be a string
  placeholder: PropTypes.string, // Placeholder must be a string
  secureTextEntry: PropTypes.bool, // Optional boolean to determine if the text should be masked
  keyboardType: PropTypes.string, // Specifies the type of keyboard
  onChangeText: PropTypes.func, // Optional function to handle text change events
};

// Export the Input component for use in other parts of the application
export default Input;
