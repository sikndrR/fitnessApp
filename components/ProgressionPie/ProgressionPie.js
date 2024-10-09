import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import style from './style';

// Create an animated component for the Circle element
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ProgressionPie Component
/**
 * NAME
 *
 * ProgressionPie - Displays a progress circle to visualize progress towards a given goal.
 *
 * SYNOPSIS
 *
 * ProgressionPie(props)
 *  props.data      - The data array used to calculate the total value for progression (required).
 *  props.goal      - The target value representing the goal for progression (required).
 *  props.title     - The title or label that is displayed alongside the progress (required).
 *  props.size      - The size of the SVG circle (optional, default is 100).
 *  props.InnerColor - The color of the background circle (optional, default is grey).
 *  props.FillColor - The color of the progress circle (optional, default is white).
 *
 * DESCRIPTION
 *
 * This functional component renders a circular progress indicator to display progress towards a specified goal.
 * The circle is animated using Reanimated, and it shows the total calories or other values as progress towards a target.
 * The progress updates dynamically based on the `data` prop and animates whenever changes occur.
 *
 * RETURNS
 *
 *  JSX element representing a circular progress bar with an animated progression.
 */
export const ProgressionPie = props => {
  // State to track the total calories or value being calculated
  const [totalCalories, setTotalCalories] = useState(0);

  // Check if the current screen is focused
  const isFocused = useIsFocused();

  // Shared value for the animated progress
  const progress = useSharedValue(0);

  // Radius and circumference calculations for the progress circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // useEffect to calculate the total value when data or focus changes
  useEffect(() => {
    // Function to calculate total calories or value based on `data` prop
    const calculateTotalCalories = () => {
      if (Array.isArray(props.data) && props.data.length > 0) {
        // Safely perform reduce if `data` is an array and not empty
        const total = props.data.reduce(
          (sum, item) => sum + parseInt(item[props.title], 10),
          0,
        );
        setTotalCalories(total);
      } else {
        // Handle case where `props.data` is empty or not an array
        setTotalCalories(0); // Set total to 0 if no valid data
      }
    };

    // Only calculate if the screen is focused and data is available
    if (isFocused && props.data) {
      calculateTotalCalories();
    }
  }, [props.data, isFocused]);

  // useEffect to animate the progress circle when total value or goal changes
  useEffect(() => {
    // Animate the progress based on total value towards the goal
    const numericGoal = parseInt(props.goal, 10); // Parse goal as number
    const progressValue = Math.min(totalCalories / numericGoal, 1); // Ensure progress does not exceed 100%

    // Animate the progress with easing and timing
    progress.value = withTiming(progressValue, {
      duration: 1000, // Duration of the animation in milliseconds
      easing: Easing.inOut(Easing.ease),
    });
  }, [totalCalories, props.goal]);

  // Animated props for the progress circle, controlling the strokeDashoffset
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value), // Calculate the offset based on progress
  }));

  return (
    <View style={style.progressContainer}>
      <Svg width={props.size} height={props.size} viewBox="0 0 100 100">
        {/* Static background circle */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={props.InnerColor}
          strokeWidth="10"
          fill="none"
        />
        {/* Animated foreground circle */}
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          stroke={props.FillColor}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference} // Full circle stroke length
          animatedProps={animatedProps} // Apply animated props for strokeDashoffset
        />
      </Svg>
      {/* Text showing the progress in relation to the goal */}
      <Text style={style.text}>
        {Math.min(totalCalories, parseInt(props.goal, 10))} / {props.goal}{' '}
        {props.title}
      </Text>
    </View>
  );
};

// Default prop values for the ProgressionPie component
/**
 * defaultProps - Provides default values for the props to ensure the component behaves correctly if no values are provided.
 */
ProgressionPie.defaultProps = {
  size: 100, // Default size of the circle is 100
  InnerColor: 'grey', // Default color of the background circle is grey
  FillColor: 'white', // Default color of the progress fill is white
};

// Define prop types to enforce the correct props for the ProgressionPie component
ProgressionPie.propTypes = {
  data: PropTypes.array.isRequired, // Data must be an array to calculate the total value
  goal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Goal can be either a string or number
  title: PropTypes.string.isRequired, // Title for the label is required
  size: PropTypes.number, // Size of the SVG circle
  InnerColor: PropTypes.string, // Color of the static background circle
  FillColor: PropTypes.string, // Color of the animated progress circle
};

// Export the ProgressionPie component for use in other parts of the application
export default ProgressionPie;
