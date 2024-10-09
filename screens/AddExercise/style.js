import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

export default StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(30),
  },
  ExerciseNameContainer: {
    marginHorizontal: horizontalScale(20),
    marginTop: horizontalScale(20),
    borderColor: 'white',
    borderWidth: 1,
    padding: 15,
  },
  WeightsRepsSetsContainer: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
    borderColor: 'white',
    borderWidth: 1,
    padding: 15,
  },
  Input: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginBottom: verticalScale(10),
  },
  ScreenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ButtonContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(30),
    marginVertical: verticalScale(50),
  },
});
