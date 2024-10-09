import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Get the device's screen dimensions
const {width, height} = Dimensions.get('window');

// Check if the device is small (e.g., iPhone 5, SE, etc.)
const isSmall = width <= 375 && !DeviceInfo.hasNotch();

// Define the guideline base width based on whether the device is small or not
/**
 * NAME
 *
 * guidelineBaseWidth - Provides a guideline base width for scaling calculations.
 * If the device is small, it returns 330, otherwise, it returns 350.
 *
 * SYNOPSIS
 *  function guidelineBaseWidth ()
 *
 * RETURNS
 *
 *  The guideline base width as an integer.
 */
const guidelineBaseWidth = () => {
  if (isSmall) {
    // If device is small, return 330 (fits older iPhones such as iPhone 5/5S/SE)
    return 330;
  }
  return 350; // If the device is not small, return 350
};

// Define the guideline base height based on the device's width
/**
 * NAME
 *
 * guidelineBaseHeight - Provides a guideline base height for scaling calculations.
 * Depending on the device's width, it returns different base heights.
 *
 * SYNOPSIS
 *  function guidelineBaseHeight()
 *
 * RETURNS
 *
 *  The guideline base height as an integer.
 */
const guidelineBaseHeight = () => {
  if (isSmall) {
    // If the device is small, return 550 (suitable for older iPhones with smaller screens)
    return 550;
  } else if (width > 410) {
    // If device width is greater than 410 (close to iPhone 6/7/8 Plus width), return 620
    return 620; // Suitable for devices with larger width, avoiding cramped UI
  }
  return 680; // If width is less than or equal to 410, return 680 (suitable for wider screens, such as Android phones)
};

// Define the guideline base font size based on the device's width
/**
 * NAME
 *
 * guidelineBaseFonts - Provides a guideline base font size for scaling calculations.
 * Returns different font sizes based on the width of the device.
 *
 * SYNOPSIS
 *  function guidelineBaseFonts()
 *
 * RETURNS
 *
 *  The guideline base font size as an integer.
 */
const guidelineBaseFonts = () => {
  if (width > 410) {
    // If device width is greater than 410, return 430 (suitable for larger screen devices)
    return 430;
  }
  return 400; // If width is less than or equal to 410, return 400 (suitable for smaller devices)
};

// Function to scale a size horizontally based on the device's width
/**
 * NAME
 *
 * horizontalScale - Scales a given size horizontally based on the device's width.
 *
 * SYNOPSIS
 *  function horizontalScale(a_size)
 *  size           --> The size value to be scaled.
 *
 * RETURNS
 *
 *  A scaled size as a floating-point number based on the device's width and guideline base width.
 */
const horizontalScale = a_size => (width / guidelineBaseWidth()) * a_size;

// Function to scale a size vertically based on the device's height
/**
 * verticalScale - Scales a given size vertically based on the device's height.
 *
 * SYNOPSIS
 *  function verticalScale(a_size)
 *  size           --> The size value to be scaled.
 *
 * RETURNS
 *
 *  A scaled size as a floating-point number based on the device's height and guideline base height.
 */
const verticalScale = a_size => (height / guidelineBaseHeight()) * a_size;

// Function to scale a font size based on the device's width
/**
 * scaleFontSize - Scales a given font size based on the device's width.
 *
 * SYNOPSIS
 *  function scaleFontSize(a_size)
 *  size           --> The size value to be scaled.
 *
 * RETURNS
 *
 *  A rounded scaled font size as an integer based on the device's width and guideline base font size.
 */
const scaleFontSize = a_size =>
  Math.round((a_size * width) / guidelineBaseFonts());

// Export the scaling functions for use in other modules
export {horizontalScale, verticalScale, scaleFontSize};
