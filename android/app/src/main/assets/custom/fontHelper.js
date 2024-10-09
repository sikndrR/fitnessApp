const getFontFamily = weight => {
  const typeofFont = 'Inter_18pt';

  switch (weight) {
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
      return `${typeofFont}-Regular`;
  }
};

export default getFontFamily;
