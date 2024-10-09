import {StyleSheet} from 'react-native';
import styles from '../Goals/style';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
});

export default style;
