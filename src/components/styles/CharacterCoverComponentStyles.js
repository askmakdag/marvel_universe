import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../common/constants';

export const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.45,
    marginHorizontal: (DEVICE_WIDTH * 0.1) / 6,
    marginVertical: 5,
    backgroundColor: 'black',
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.45 * 3) / 2,
    width: DEVICE_WIDTH * 0.45,
  },
  characterNameStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    height: 46,
    lineHeight: 20,
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  coverInfoStyle: {
    backgroundColor: 'orange',
    fontSize: 13,
    fontWeight: 'bold',
    padding: 5,
  },
});
