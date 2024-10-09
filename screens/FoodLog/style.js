import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  foodContainer: {
    marginHorizontal: horizontalScale(15),
    marginVertical: verticalScale(10),
  },

  CalorieContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'light-grey',
    height: Dimensions.get('window').height / 3.5, // Set height explicitly
    width: Dimensions.get('window').width,
    borderRadius: 40,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(20),
  },
  SignOutContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallProgressionContainer: {
    alignSelf: 'flex-start',
    marginVertical: verticalScale(3),
    marginHorizontal: horizontalScale(15),
  },
  AllProgressionContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default style;
