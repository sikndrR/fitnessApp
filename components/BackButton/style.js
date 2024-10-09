import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: horizontalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
