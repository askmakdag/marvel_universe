import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../../../common/constants';

export const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  itemContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
    marginRight: 25,
    marginTop: 7.5,
    marginBottom: 5,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#10589f',
  },
  titleContainerStyle: {
    borderColor: 'orange',
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  creatorTextStyle: {
    // fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    color: '#123456',
  },
});
