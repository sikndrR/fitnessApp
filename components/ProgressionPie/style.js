import {StyleSheet} from 'react-native';
import getFontFamily from '../../assets/fonts/fontHelper';
import {scaleFontSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  progressContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: scaleFontSize(18),
    fontFamily: getFontFamily('regular'),
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default style;
