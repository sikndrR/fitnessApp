import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import {horizontalScale} from '../../assets/styles/scaling';

// Badge Component
/**
 * NAME
 *
 * Badge - A component that renders a badge-like element with dynamic width based on the content.
 *
 * SYNOPSIS
 *
 * Badge(props)
 *
 *  props.title     - The text content of the badge (required).
 *  props.isInactive - A boolean that determines if the badge should be inactive (optional).
 *
 * DESCRIPTION
 *
 * This functional component renders a badge that adjusts its width dynamically to fit the text content.
 * The badge can be styled and configured to be inactive if needed.
 *
 * RETURNS
 *
 *  JSX element representing a badge with a title.
 */
const Badge = props => {
  // State to manage the width of the text inside the badge
  const [width, setWidth] = useState(0);

  // Reference to the Text component
  const textRef = useRef(null);

  // Set horizontal padding value
  const paddingHorizontal = 10;

  // Calculate badge width dynamically based on the text width and padding
  const badgeWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };

  return (
    // View component to wrap the badge, adjusting the width based on calculated badgeWidth
    <View disabled={props.isInactive} style={[style.badge, badgeWidth]}>
      {/* Text component that displays the badge title and dynamically calculates its width */}
      <Text
        onTextLayout={event => {
          // Update the width of the text whenever the layout changes
          setWidth(event.nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={[style.title]}>
        {props.title}
      </Text>
    </View>
  );
};

// Define prop types to enforce the correct props for the Badge component
Badge.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and must be a string
  isInactive: PropTypes.bool, // Optional boolean to set if the badge is inactive
};

// Export the Badge component for use in other parts of the application
export default Badge;
