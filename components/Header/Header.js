import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

// Header Component
/**
 * NAME
 *
 * Header - A component that renders a text header with customizable styles and colors.
 *
 * SYNOPSIS
 *
 * Header(props)
 *  props.title     - The text to be displayed in the header (optional, default is empty string).
 *  props.type      - The type of header, which determines the style to apply (optional, default is 1).
 *  props.color     - The color of the header text (optional, default is black).
 *  props.numberOfLines - The maximum number of lines to be displayed for the header (optional).
 *
 * DESCRIPTION
 *
 * This functional component renders a header using the `Text` component from React Native.
 * It allows for different types of styles to be applied based on the `type` prop, which is
 * mapped to different styles in the imported `style` object. The header text color and the
 * number of lines to display can also be customized via props.
 *
 *
 * RETURNS
 *
 *  JSX element representing a customizable header.
 */
const Header = props => {
  // Determine which style to apply based on the 'type' prop
  const styleToApply = () => {
    switch (props.type) {
      case 1:
        return style.title1;
      case 2:
        return style.title2;
      case 3:
        return style.title3;
      default:
        return style.title1;
    }
  };

  return (
    <View>
      {/* Text component to display the header title with appropriate styles */}
      <Text
        style={[styleToApply(), props.color && {color: props.color}]} // Apply selected style and color if provided
        numberOfLines={props.numberOfLines ? props.numberOfLines : null} // Limit number of lines if specified
      >
        {props.title} {/* Render the title text */}
      </Text>
    </View>
  );
};

// Default prop values for the Header component
/**
 * defaultProps - Provides default values for the props to ensure the header behaves correctly if no values are provided.
 */
Header.defaultProps = {
  title: '', // Default title is an empty string
  type: 1, // Default type is 1
  color: '#000000', // Default color is black
};

// Define prop types to enforce the correct props for the Header component
Header.propTypes = {
  title: PropTypes.string, // Title must be a string
  type: PropTypes.number, // Type must be a number
  color: PropTypes.string, // Color must be a string (hex color code or color name)
  numberOfLines: PropTypes.number, // Optional number to limit the number of lines in the header
};

// Export the Header component for use in other parts of the application
export default Header;
