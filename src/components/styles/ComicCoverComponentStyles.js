import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../common/constants';

export const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: DEVICE_WIDTH * 0.45,
    marginHorizontal: (DEVICE_WIDTH * 0.1) / 6,
    marginVertical: 5,
    backgroundColor: 'black',
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.45 * 3) / 2,
    width: DEVICE_WIDTH * 0.45,
  },
  comicTitleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    height: 46,
    lineHeight: 20,
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  textStyle: {
    backgroundColor: 'orange',
    fontSize: 13,
    padding: 5,
  },
  creatorTextStyle: {
    backgroundColor: 'orange',
    fontSize: 13,
    padding: 5,
    fontWeight: 'bold',
  },
});
