import {StyleSheet} from 'react-native';
import {verticalScale} from './scaling';

const globalStyle = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#273746',
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: verticalScale(20),
  },
});

export default globalStyle;
