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
  backButton: {
    marginLeft: horizontalScale(14),
    marginTop: verticalScale(7),
  },
  error: {
    fontFamily: getFontFamily('500'),
    fontSize: scaleFontSize(16),
    color: '#FF0000',
    marginBottom: verticalScale(24),
  },
  success: {
    fontFamily: getFontFamily('500'),
    fontSize: scaleFontSize(16),
    color: '#28a745',
    marginBottom: verticalScale(24),
  },
});

export default style;
