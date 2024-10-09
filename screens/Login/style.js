import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import getFontFamily from '../../assets/fonts/fontHelper';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    marginVertical: verticalScale(20),
    flex: 1,
    justifyContent: 'center',
  },
  registrationButton: {
    alignItems: 'center',
  },
  error: {
    fontFamily: getFontFamily('500'),
    fontSize: scaleFontSize(16),
    color: '#FF0000',
    marginBottom: verticalScale(24),
  },
});

export default style;
