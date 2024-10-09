import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  header: {
    //backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  foodTrackerContiner: {
    //backgroundColor: '#808b96',
    borderColor: '#566573',
    borderWidth: 3,
    borderRadius: horizontalScale(5),
  },
  EmptyContainer: {
    alignItems: 'center',
    //backgroundColor: 'blue',
    paddingVertical: verticalScale(20),
  },
  text: {
    color: 'white',
  },
});

export default style;
