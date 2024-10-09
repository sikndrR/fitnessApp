import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

export default StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(15),
  },
  buttonContainer: {
    marginVertical: verticalScale(20),
    marginHorizontal: verticalScale(20),
  },
  logContainer: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(5),
  },
});
