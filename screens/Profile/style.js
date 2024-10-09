import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  GoalInput: {marginBottom: verticalScale(5)},
  headerContainer: {
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(10),
  },
  goalsContainer: {
    alignSelf: 'center',
  },
  goalsHeader: {marginBottom: verticalScale(5)},
  goalsButton: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(30),
  },
});

export default style;
