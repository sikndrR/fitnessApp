// Function to get the appropriate font family based on the specified weight
/**
 * NAME
 *
 * getFontFamily - Returns the font family name corresponding to the given weight.
 *
 * SYNOPSIS
 *
 * function getFontFamily(weight)
 *  a_weight          --> The font weight, which can be a numeric string or text such as 'bold' or 'normal'.
 *
 * DESCRIPTION
 *
 * This function takes in a font weight value and returns the corresponding font family name.
 * The function uses a base font name (`typeofFont`) and appends a suffix based on the weight provided.
 * It handles multiple weight values, including numeric and descriptive (e.g., 'bold', 'normal').
 *
 *
 * RETURNS
 *
 *  A string representing the full name of the font family corresponding to the provided weight.
 *  If the weight is not recognized, it defaults to `Inter_18pt-Regular`.
 */
const getFontFamily = a_weight => {
  // Base font name to which weight-specific suffixes will be appended
  const typeofFont = 'Inter_18pt';

  // Determine the appropriate font family based on the weight provided
  switch (a_weight) {
    case '100':
      return `${typeofFont}-Thin`;
    case '200':
      return `${typeofFont}-ExtraLight`;
    case '300':
      return `${typeofFont}-Light`;
    case '400':
    case 'normal':
      return `${typeofFont}-Regular`;
    case '500':
      return `${typeofFont}-Medium`;
    case '600':
      return `${typeofFont}-SemiBold`;
    case '700':
    case 'bold':
      return `${typeofFont}-Bold`;
    case '800':
      return `${typeofFont}-ExtraBold`;
    case '900':
      return `${typeofFont}-Black`;
    default:
      // Default case if the provided weight is not recognized
      return `${typeofFont}-Regular`;
  }
};

export default getFontFamily;
