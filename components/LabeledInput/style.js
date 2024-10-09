import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  input: {
    fontSize: 14,
    color: 'white',
    borderColor: '#566573',
    borderWidth: 3,
    borderRadius: 3,
    marginLeft: horizontalScale(3),
  },
  container: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center ',
    alignItems: 'center',
  },
  InputContainer: {alignItems: 'center', justifyContent: 'center', height: 36},
});

export default style;
