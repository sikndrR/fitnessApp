import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  foodContainer: {
    marginHorizontal: horizontalScale(15),
    marginBottom: horizontalScale(10),
  },
  buttonContainer: {
    paddingTop: verticalScale(10),
    paddingLeft: horizontalScale(10),
  },
  SearchedText: {
    color: 'white',
  },
  SearchContainer: {
    borderColor: '#566573',
    borderWidth: 2,
    color: 'white',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  manualButton: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  BackButtonContainer: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  SearchStyle: {
    borderColor: '#566573',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    color: 'white',
  },
  FoodExtensionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default style;
