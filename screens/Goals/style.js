import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import getFontFamily from '../../assets/fonts/fontHelper';

const styles = StyleSheet.create({
  GoalContainers: {
    marginHorizontal: horizontalScale(30),
    marginBottom: verticalScale(17),
    borderWidth: 0.3,
    borderRadius: horizontalScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  textHeader: {
    fontFamily: getFontFamily('400'),
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  HeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  ButtonContainer: {
    marginVertical: verticalScale(13),
    marginHorizontal: horizontalScale(30),
  },
});

export default styles;
