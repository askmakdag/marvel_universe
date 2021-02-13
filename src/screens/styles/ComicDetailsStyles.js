import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../common/constants';

export const styles = StyleSheet.create({
  containerStyle: {
    margin: '2%',
  },
  topRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleColumnStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  comicInfoTopRightStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: DEVICE_WIDTH * 0.6,
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
  },
  comicTitleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  comicInfoStyle: {
    fontSize: 15,
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  linkTextStyle: {
    fontSize: 15,
    marginHorizontal: 7.5,
    paddingTop: 5,
    color: 'blue',
  },
  comicDescriptionStyle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
});
